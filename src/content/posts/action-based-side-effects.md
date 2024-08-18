---
title: action-based side effects in react
date: 2024-08-18
---

in react, handling state changes and side effects can get pretty hairy. react's got some great tools like `useEffect` and `useReducer`, but sometimes they just don't cut it for action-based side effects.

in this post, i'll show you why redux and its listener middleware are game-changers for this stuff, and why react alone isn't always enough.

## the issue with action-based side effects

so, what's the deal with **action-based side effects**? basically, these are things that need to happen right after an action is dispatched and the state updates. this keeps everything in sync and under control.

some examples:

- making an api call right after a state change.
- logging events or updating analytics as soon as an action occurs.

## why react alone doesn't cut it

react hooks like `useEffect` and `useReducer` are cool, but they struggle with precise control over side effects tied to specific actions.

1. **async state updates**:
   react's state updates aren't instant, which means you can't rely on having the updated state right away. this can mess things up.

   ```javascript
   // react approach
   const handleAddTodo = (text) => {
     dispatch({ type: "ADD_TODO", payload: { text } });
     const newTodo = state.todos[state.todos.length - 1]; // not the latest
     sendMessage({ type: "ADD_TODO", payload: newTodo });
   };
   ```

   here, `newTodo` might not be up-to-date, which is a bummer.

2. **listening for state changes**:
   using `useEffect` to watch for state changes can be sketchy because your state might change for all sorts of reasons, causing unexpected triggers.

   ```javascript
   useEffect(() => {
     if (state.todos.length > 0) {
       const latestTodo = state.todos[state.todos.length - 1];
       sendMessage({ type: "ADD_TODO", payload: latestTodo });
     }
   }, [state.todos]);
   ```

   this doesn't really guarantee the side effect is tied to the specific action.

## redux listener middleware to the rescue

redux listener middleware is like magic. it lets you hook into specific actions and run side effects right after the state updates. unlike `useEffect`, it's action-based, making things way more predictable and controlled.

## real-world example: todo app with websockets

imagine you're building a todo app that needs to sync changes in real-time using websockets. any time you add or toggle a todo, you want to broadcast that via websocket.

1. **state updates and actions**:

   - adding or toggling a todo should send a websocket message immediately.

2. **listener middleware**:
   - ensures the websocket message is sent right after the state update.

here's how you can set this up.

## the setup

let’s break this down to see how redux listener middleware can handle action-based side effects.

### redux slice

first, let's create a redux slice for todos and connection state.

```typescript
// app-reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  lastEditedBy: string;
}

interface AppState {
  todos: Todo[];
  isConnected: boolean;
  currentUser: string;
}

const initialState: AppState = {
  todos: [],
  isConnected: false,
  currentUser: "anonymous",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        lastEditedBy: state.currentUser,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.lastEditedBy = state.currentUser;
      }
    },
    updateTodoFromServer: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      } else {
        state.todos.push(action.payload);
      }
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = action.payload;
    },
    connected: (state) => {
      state.isConnected = true;
    },
    disconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  updateTodoFromServer,
  setCurrentUser,
  connected,
  disconnected,
} = appSlice.actions;
export default appSlice.reducer;
```

### listener middleware

next, we set up listener middleware for those websocket messages.

```typescript
// listener-middleware.ts
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addTodo, toggleTodo } from "./app-reducer";
import { sendSocketMessage } from "./socket";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addTodo,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as { app: AppState };
    const newTodo = state.app.todos[state.app.todos.length - 1];
    sendSocketMessage({
      type: "ADD_TODO",
      payload: newTodo,
    });
  },
});

listenerMiddleware.startListening({
  actionCreator: toggleTodo,
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as { app: AppState };
    const updatedTodo = state.app.todos.find((t) => t.id === action.payload.id);
    if (updatedTodo) {
      sendSocketMessage({
        type: "UPDATE_TODO",
        payload: updatedTodo,
      });
    }
  },
});
```

### managing websockets

now, let's handle the websocket connections.

```typescript
// socket.ts
import ReconnectingWebSocket from "reconnecting-websocket";
import { store } from "./store";
import { connected, disconnected, updateTodoFromServer } from "./app-reducer";

const ws = new ReconnectingWebSocket("wss://your-todo-websocket-url");

ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  switch (message.type) {
    case "ADD_TODO":
    case "UPDATE_TODO":
      store.dispatch(updateTodoFromServer(message.payload));
      break;
    // handle other message types as needed
  }
});

ws.addEventListener("open", () => {
  store.dispatch(connected());
  console.log("connected to todo list server");
});

ws.addEventListener("close", () => {
  store.dispatch(disconnected());
  console.log("disconnected from todo list server");
});

export const sendSocketMessage = (payload: any) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  } else {
    console.error("websocket is not open. cannot send message.");
  }
};
```

### store setup

finally, let's get our redux store up and running with the reducer and middleware.

```typescript
// store.ts
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app-reducer";
import { listenerMiddleware } from "./listener-middleware";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### using redux in a react component

here's how to use redux in a react component for managing todos and user interactions.

```typescript
// TodoList.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, setCurrentUser } from "./app-reducer";
import { RootState } from "./store";

const TodoList: React.FC = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state: RootState) => state.app.todos);
	const currentUser = useSelector((state: RootState) => state.app.currentUser);

	React.useEffect(() => {
		dispatch(setCurrentUser("User" + Math.floor(Math.random() * 1000)));
	}, [dispatch]);

	const handleAddTodo = (text: string) => {
		dispatch(addTodo({ text }));
	};

	const handleToggleTodo = (id: string) => {
		dispatch(
			toggleTodo({
				id,
			})
		);
	};

	return (
		<div>
			<h1>todo list for {currentUser}</h1>
			{/* render todo list and add todo form */}
		</div>
	);
};

export default TodoList;
```

## wrap up

so, while react has some great tools, they don't always handle action-based side effects well. redux with listener middleware is a lifesaver, making sure your side effects are precisely tied to the actions they depend on. it's all about picking the right tools for the job, and for this, redux is the way to go.

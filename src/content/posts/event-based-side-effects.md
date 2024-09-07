---
title: lack of event-based side effects in react
date: 2024-08-24
category: tech
---

let's say we're building a real-time todo app. users can create todos, delete todos, and do a lot of other stuff. these events need to be sent to the server and then broadcast to all connected clients. all connected clients will then update their todos.

## requirements

1. a state to store todos
2. any action should update the state and send the event to the server e.g `add_todo`, `edit_todo`, etc
3. send some data from the latest state to the server when an event is sent
4. events received from the server should update the state

note: these examples are extremely simplified.

## initial approach

```typescript
const [state, dispatch] = useReducer(reducer, { todos: [] });

// send dispatch to socket to dispatch actions coming from the server
const { sendEvent } = useSocket(dispatch);

const dispatchWithSocket = (action: Action) => {
  // dispatch action to reducer
  dispatch(action);
  // here you can debounce similar actions
  sendEvent(action.type, action.payload);
};

return <TodoList todos={state.todos} dispatch={dispatchWithSocket} />;
```

this works, but you can't access the latest state while sending the event; it will contain stale data.
what if we have to send the total todo count or the ids of all todos?

i can think of two approaches to solve this, both of which have drawbacks.

## iteration 1: use reducer to get updated state

```typescript
const dispatchWithSocket = (action: Action) => {
  dispatch(action);
  // get updated state using reducer
  const updatedState = reducer(state, action);
  // send event to server with updated state
  sendEvent(action.type, {
    ...action.payload,
    totalTodos: updatedState.todos.length,
  });
};
```

drawbacks:

1. blocks the main thread. dispatch is async but our reducer is sync.
2. inefficient. we're calling the reducer twice for every action.
3. the state we're passing to the reducer might be stale if multiple actions are dispatched in the same tick.

## iteration 2: use useEffect to get updated state

```typescript
// maintain a queue of actions to be sent to the server
const actionQueue = useRef<Action[]>([]);

useEffect(() => {
  // once state is updated, send all actions in queue
  while (actionQueue.current.length > 0) {
    const action = actionQueue.current.shift();
    sendEvent(action.type, {
      ...action.payload,
      totalTodos: state.todos.length, // latest state
    });
  }
}, [state]);

const dispatchWithSocket = (action: Action) => {
  dispatch(action);
  // can't access latest state here, so push action to queue
  actionQueue.current.push(action);
};
```

drawbacks :

1. if multiple actions are dispatched in the same tick, all of them will contain the latest state. for example, if you dispatch `add_todo` and `delete_todo` in the same tick, only the state after `delete_todo` will be sent to the server in both events.

## solution

to address the above problems, there is a redux middleware called [listener middleware](https://redux-toolkit.js.org/api/createListenerMiddleware) that allows you to listen to actions and run a callback with the latest state. you can even dispatch new actions from this callback.

i like to call it **event-based side effects**.

```typescript
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(todoAdded, todoToggled, todoDeleted),
  effect: async (action, listenerApi) => {
    // you get the latest state with the action that caused this effect
    const state = listenerApi.getState();
    sendEvent(action.type, {
      ...action.payload,
      totalTodos: state.todos.length,
    });
  },
});
```

## final thoughts

there are other similar middlewares like saga and observable that i haven't tried; they might do the same thing.

i find this much cleaner. there's your state-action layer in a react app, and then there's the action-event layer outside react that takes care of external items like sending events, logging, etc.

i like this decoupling.

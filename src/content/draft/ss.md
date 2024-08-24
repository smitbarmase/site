# Systems Programming Learning Path

## 1. Implement basic command-line utilities in C (e.g., 'ls', 'cp', 'cat')

**Description & Prerequisites:**

- Basic C programming knowledge required
- Create C programs that mimic the functionality of common UNIX utilities
- Implement file I/O, directory traversal, and basic string manipulation
- Handle command-line arguments and error conditions

**Resources:**

- Book: "The C Programming Language" by K&R
- Tutorial: https://brennan.io/2015/01/16/write-a-shell-in-c/
- Video: https://www.youtube.com/watch?v=F3wtmvxTfBc

## 2. Build a simple HTTP server in C

**Description & Prerequisites:**

- Socket programming in C knowledge required
- Implement a basic TCP server that can handle HTTP GET requests
- Parse HTTP headers and generate appropriate responses
- Serve static files from a specified directory

**Resources:**

- Tutorial: https://medium.com/from-the-scratch/http-server-what-do-you-need-to-know-to-build-a-simple-http-server-from-scratch-d1ef8945e4fa
- Video: https://www.youtube.com/watch?v=esXw4bdaZkc

## 3. Extend the HTTP server to handle asynchronous requests

**Description & Prerequisites:**

- Understanding of event-driven programming required
- Use non-blocking I/O and an event loop (e.g., epoll or kqueue)
- Implement a callback mechanism for handling multiple concurrent connections
- Add support for long-polling or server-sent events

**Resources:**

- Book: "UNIX Network Programming" by W. Richard Stevens
- Tutorial: https://www.ibm.com/docs/en/i/7.4?topic=designs-example-nonblocking-io-select

## 4. Create a chat application using TCP/UDP sockets in C

**Description & Prerequisites:**

- Basic network programming knowledge required
- Implement both client and server components
- Handle multiple concurrent connections using select() or poll()
- Implement a simple protocol for message passing and user management

**Resources:**

- Tutorial: https://www.geeksforgeeks.org/tcp-server-client-implementation-in-c/
- Video: https://www.youtube.com/watch?v=fNerEo6Lstw

## 5. Develop a basic shell in C with command parsing and execution

**Description & Prerequisites:**

- Process management in C knowledge required
- Implement a REPL (Read-Eval-Print Loop) for command input
- Parse commands and handle arguments, including quoting and escaping
- Execute commands using fork() and exec() system calls
- Implement basic built-in commands (cd, echo, exit)

**Resources:**

- Tutorial: https://brennan.io/2015/01/16/write-a-shell-in-c/
- Video: https://www.youtube.com/watch?v=z4LEuxMGGs8

## 6. Write a file system traversal and globbing library in C

**Description & Prerequisites:**

- File I/O in C knowledge required
- Implement recursive directory traversal
- Create functions for pattern matching (\*, ?, [])
- Handle edge cases like hidden files and symlinks

**Resources:**

- Book: "Advanced Programming in the UNIX Environment" by W. Richard Stevens
- Tutorial: https://www.geeksforgeeks.org/c-program-list-files-sub-directories-directory/

## 7. Implement a custom memory allocator in C

**Description & Prerequisites:**

- Understanding of memory management required
- Create functions for malloc(), free(), and realloc()
- Implement a free-list or buddy allocation algorithm
- Optimize for fragmentation and performance

**Resources:**

- Book: "The C Programming Language" by K&R (Chapter 8)
- Tutorial: https://arjunsreedharan.org/post/148675821737/write-a-simple-memory-allocator

## 8. Build a thread pool and use it in a multi-threaded application

**Description & Prerequisites:**

- Basic threading concepts knowledge required
- Implement a fixed-size thread pool with a task queue
- Use mutexes and condition variables for synchronization
- Create a sample application that processes tasks concurrently

**Resources:**

- Tutorial: https://nachtimwald.com/2019/04/12/thread-pool-in-c/
- Video: https://www.youtube.com/watch?v=_n2hE2gyPxU

## 9. Create a parser for a simple JSON-like language in C

**Description & Prerequisites:**

- Basic parsing concepts knowledge required
- Implement lexical analysis (tokenization)
- Build a recursive descent parser
- Construct an in-memory representation of the parsed data

**Resources:**

- Book: "Crafting Interpreters" by Robert Nystrom (free online)
- Tutorial: https://www.json.org/json-en.html

## 10. Complete the Zig language tutorial and exercises

**Description & Prerequisites:**

- No prior Zig knowledge required
- Work through the official Zig documentation and examples
- Implement small projects to practice Zig-specific features
- Focus on understanding comptime, error handling, and memory management

**Resources:**

- Official Zig documentation: https://ziglang.org/documentation/master/
- Tutorial: https://ziglearn.org/
- Video: https://www.youtube.com/watch?v=Gv2I7qTux7g

## 11. Port your C projects to Zig, focusing on memory safety features

**Description & Prerequisites:**

- Basic Zig knowledge required
- Convert at least three of your previous C projects to Zig
- Use Zig's safety features like optional types and error unions
- Compare performance and safety between C and Zig implementations

**Resources:**

- Zig vs C comparison: https://ziglang.org/learn/why_zig_rust_d_cpp/

## 12. Implement five UNIX system calls from scratch

**Description & Prerequisites:**

- Assembly language basics required
- Choose system calls like open(), read(), write(), fork(), exec()
- Implement them in assembly or a low-level language
- Test against the actual system calls for correctness

**Resources:**

- Book: "Linux System Programming" by Robert Love
- Tutorial: https://brennan.io/2016/11/14/kernel-dev-ep3/

## 13. Build a JavaScript parser for a subset of ES6 in C or Zig

**Description & Prerequisites:**

- Parsing theory knowledge required
- Implement lexical analysis for JavaScript tokens
- Create an Abstract Syntax Tree (AST) representation
- Handle basic ES6 features like let/const, arrow functions, and template literals

**Resources:**

- Book: "Compilers: Principles, Techniques, and Tools" by Aho et al.
- Tutorial: https://github.com/acornjs/acorn (study the source)

## 14. Develop a bash-like interpreter with support for pipes and redirections

**Description & Prerequisites:**

- Understanding of UNIX processes required
- Extend your earlier shell project with more advanced features
- Implement input/output redirection (<, >, >>)
- Add support for pipes (|) to connect multiple commands

**Resources:**

- Book: "Advanced Programming in the UNIX Environment" by W. Richard Stevens
- Tutorial: https://brennan.io/2015/01/16/write-a-shell-in-c/

## 15. Implement a basic JavaScript runtime with support for primitives and functions

**Description & Prerequisites:**

- Understanding of programming language design required
- Create a simple object model for JavaScript types
- Implement basic arithmetic and logical operations
- Add support for function declarations and invocations

**Resources:**

- Book: "Programming Language Pragmatics" by Michael L. Scott
- Tutorial: https://mrale.ph/blog/2012/06/03/explaining-js-vms-in-js-inline-caches.html

## 16. Write a mark-and-sweep garbage collector

**Description & Prerequisites:**

- Memory management concepts knowledge required
- Implement object allocation and tracking
- Create marking phase to identify live objects
- Implement sweeping phase to reclaim unused memory
- Add basic optimizations like generational collection

**Resources:**

- Book: "The Garbage Collection Handbook" by Jones et al.
- Tutorial: https://maplant.com/gc.html

## 17. Implement three compiler optimizations

**Description & Prerequisites:**

- Basic compiler theory knowledge required
- Constant folding: Evaluate constant expressions at compile-time
- Dead code elimination: Remove unreachable or unused code
- Loop unrolling: Expand loop bodies to reduce loop overhead

**Resources:**

- Book: "Engineering a Compiler" by Cooper and Torczon
- Tutorial: https://llvm.org/docs/Passes.html

## 18. Build a simple JIT compiler for a subset of JavaScript

**Description & Prerequisites:**

- Understanding of machine code generation required
- Implement a basic intermediate representation (IR)
- Create a code generator for a specific architecture (e.g., x86)
- Add runtime support for dynamic type checking and object allocation

**Resources:**

- Book: "Virtual Machines" by Smith and Nair
- Tutorial: https://eli.thegreenplace.net/2013/11/05/how-to-jit-an-introduction

## 19. Create a stack-based virtual machine with bytecode interpretation

**Description & Prerequisites:**

- Understanding of stack machines required
- Define a set of bytecode instructions
- Implement a stack-based execution model
- Add support for function calls and basic control flow

**Resources:**

- Book: "Virtual Machines" by Smith and Nair
- Tutorial: https://www.jmeiners.com/lc3-vm/

## 20. Implement a JavaScript engine component (lexer, parser, or interpreter)

**Description & Prerequisites:**

- Compiler theory knowledge required
- Lexer: Create a full-featured tokenizer for ECMAScript
- Parser: Build a complete parser generating an AST for JavaScript
- Interpreter: Implement an AST walker that can execute JavaScript code

**Resources:**

- Book: "Crafting Interpreters" by Robert Nystrom
- Tutorial: https://github.com/v8/v8/wiki/Contributing

## 21. Build a TCP/IP stack supporting basic HTTP requests

**Description & Prerequisites:**

- Networking protocols knowledge required
- Implement the IP, TCP, and HTTP protocols
- Handle packet fragmentation and reassembly
- Support basic HTTP methods (GET, POST) and status codes

**Resources:**

- Book: "TCP/IP Illustrated, Volume 1" by W. Richard Stevens
- Tutorial: https://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/

## 22. Develop a minimal operating system kernel

**Description & Prerequisites:**

- OS concepts and assembly language knowledge required
- Implement process scheduling and context switching
- Add basic memory management with paging
- Create a simple file system and device drivers

**Resources:**

- Book: "Operating Systems: Three Easy Pieces" by Arpaci-Dusseau
- Tutorial: https://os.phil-opp.com/

## 23. Extend your JavaScript engine to support full ES6 syntax

**Description & Prerequisites:**

- ECMAScript specification knowledge required
- Add support for classes, modules, and promises
- Implement destructuring, rest/spread operators, and default parameters
- Add support for new ES6 built-in objects and methods

**Resources:**

- ECMAScript 6 specification
- Tutorial: https://github.com/v8/v8/wiki/Contributing

## 24. Apply your implemented compiler optimizations to your JavaScript engine

**Description & Prerequisites:**

- Compiler optimization techniques knowledge required
- Integrate the optimizations from step 17 into your JavaScript engine
- Measure and compare performance before and after optimizations
- Implement additional optimizations specific to JavaScript (e.g., hidden class optimization)

**Resources:**

- Book: "Advanced Compiler Design and Implementation" by Muchnick
- Tutorial: https://v8.dev/blog/optimizing-proxies

## 25. Build a distributed key-value store with eventual consistency

**Description & Prerequisites:**

- Distributed systems concepts knowledge required
- Implement a basic key-value store with a RESTful API
- Add support for multiple nodes and data replication
- Implement conflict resolution and eventual consistency mechanisms

**Resources:**

- Book: "Designing Data-Intensive Applications" by Martin Kleppmann
- Tutorial: https://pdos.csail.mit.edu/6.824/

## 26. Create a container runtime with process isolation and resource limits

**Description & Prerequisites:**

- Linux containerization concepts knowledge required
- Use namespaces and cgroups for process isolation
- Implement resource limiting (CPU, memory, disk I/O)
- Add basic networking and volume management features

**Resources:**

- Book: "Container Security" by Liz Rice
- Tutorial: https://blog.lizzie.io/linux-containers-in-500-loc.html

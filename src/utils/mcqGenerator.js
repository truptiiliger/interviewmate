const SKILL_QUESTION_DATABASE = {
  'react': [
    {
      skill: 'React',
      difficulty: 'Easy',
      question: 'What is the primary role of the `key` prop when rendering dynamic lists in React?',
      options: [
        'To uniquely identify DOM elements so React can efficiently reconcile and re-render only modified items',
        'To bind CSS styling classes dynamically to the list items',
        'To provide encryption for list data transferred to the server',
        'To trigger browser native caching for DOM nodes'
      ],
      correctAnswer: 0,
      explanation: 'React uses the `key` prop during reconciliation to identify which elements have changed, been added, or been removed, avoiding unnecessary re-renders of the entire list.'
    },
    {
      skill: 'React',
      difficulty: 'Medium',
      question: 'When should you use the `useCallback` hook in React?',
      options: [
        'To execute asynchronous HTTP requests inside functional components',
        'To memoize a callback function instance between renders to prevent unnecessary re-renders of child components that rely on reference equality',
        'To replace Redux for global application state management',
        'To manage browser local storage updates automatically'
      ],
      correctAnswer: 1,
      explanation: '`useCallback` caches a function definition between renders unless its dependencies change, preventing child components wrapped in `React.memo` from re-rendering due to new function references.'
    },
    {
      skill: 'React',
      difficulty: 'Hard',
      question: 'In React 18 Concurrent Mode, what happens when a state update is wrapped inside `startTransition`?',
      options: [
        'The state update is executed synchronously before any other rendering',
        'The state update is marked as non-urgent and can be interrupted by higher-priority urgent updates (such as user keystrokes)',
        'It spawns a background Web Worker to calculate state in a separate OS thread',
        'It disables Virtual DOM diffing for that specific component tree'
      ],
      correctAnswer: 1,
      explanation: '`startTransition` marks updates as transitions (non-urgent). React allows urgent user interactions like typing or clicking to interrupt transition renders, keeping the interface fluid.'
    }
  ],
  'javascript': [
    {
      skill: 'JavaScript',
      difficulty: 'Easy',
      question: 'What will `typeof NaN` evaluate to in JavaScript?',
      options: ['"number"', '"nan"', '"undefined"', '"object"'],
      correctAnswer: 0,
      explanation: 'In the IEEE 754 floating point specification implemented by JavaScript, NaN (Not-a-Number) is a special numeric value, so `typeof NaN` returns "number".'
    },
    {
      skill: 'JavaScript',
      difficulty: 'Medium',
      question: 'What is the difference between the Event Loop microtask queue and macrotask queue in JavaScript?',
      options: [
        'Microtasks (e.g. Promises, queueMicrotask) are drained completely after the current task finishes and before the next macrotask (e.g. setTimeout) runs',
        'Macrotasks always execute with higher priority than microtasks',
        'Microtasks run on a separate CPU core while macrotasks run on the main thread',
        'Both queues are processed strictly in alternating order 1-by-1'
      ],
      correctAnswer: 0,
      explanation: 'After every JavaScript macrotask finishes, the engine drains all jobs in the microtask queue (Promises, MutationObserver) until the microtask queue is empty before picking the next macrotask.'
    },
    {
      skill: 'JavaScript',
      difficulty: 'Hard',
      question: 'How does a JavaScript Closure preserve access to variables in its outer lexical scope even after the outer function has returned?',
      options: [
        'The browser creates a physical copy of all variables in localStorage',
        'The inner function retains an internal hidden `[[Environment]]` reference to the Lexical Environment record of the outer execution context, preventing garbage collection',
        'The variables are converted into global variables automatically',
        'Closures freeze the memory address using pointer pinning'
      ],
      correctAnswer: 1,
      explanation: 'Functions in JavaScript hold an internal `[[Environment]]` slot pointing to their lexical environment. Because the inner function still references it, the garbage collector preserves the environment chain.'
    }
  ],
  'typescript': [
    {
      skill: 'TypeScript',
      difficulty: 'Medium',
      question: 'What is the key functional difference between `interface` and `type` alias in TypeScript?',
      options: [
        'Interfaces support declaration merging (multiple declarations with the same name merge their properties), while type aliases cannot be merged',
        'Type aliases can only be used with primitive types, not objects',
        'Interfaces are compiled into JavaScript objects at runtime',
        'Type aliases do not support union types'
      ],
      correctAnswer: 0,
      explanation: 'TypeScript interfaces are open and merge declarations automatically, which is vital for typing libraries. Type aliases cannot be reopened to add new properties once defined.'
    },
    {
      skill: 'TypeScript',
      difficulty: 'Hard',
      question: 'What does the `infer` keyword allow you to do in TypeScript conditional types?',
      options: [
        'It tells the compiler to automatically guess any missing function parameters',
        'It introduces a type variable within the `extends` clause to deduce and extract a type from another complex type',
        'It bypasses type checking for legacy JavaScript libraries',
        'It forces a type to be treated as `any` at runtime'
      ],
      correctAnswer: 1,
      explanation: 'In conditional types (`T extends (...args: any[]) => infer R ? R : any`), `infer` declares a placeholder type `R` that TypeScript extracts based on the actual type passed.'
    }
  ],
  'node.js': [
    {
      skill: 'Node.js',
      difficulty: 'Medium',
      question: 'How does Node.js handle CPU-bound intensive operations without freezing the event loop?',
      options: [
        'By automatically creating new event loops for every function',
        'By delegating heavy computation to Worker Threads or offloading via libuv thread pool / cluster module',
        'By increasing CPU clock speed via native V8 commands',
        'Node.js automatically halts I/O until the CPU task completes'
      ],
      correctAnswer: 1,
      explanation: 'Node.js event loop is single-threaded for JavaScript. Heavy computational tasks must be delegated to the `worker_threads` module, cluster child processes, or native C++ addons to avoid blocking the main event loop.'
    },
    {
      skill: 'Node.js',
      difficulty: 'Hard',
      question: 'What is the difference between `process.nextTick()` and `setImmediate()` in Node.js?',
      options: [
        '`process.nextTick()` executes immediately after the current operation finishes before the event loop advances; `setImmediate()` runs on the next Check phase of the event loop',
        '`setImmediate()` runs before `process.nextTick()` in all scenarios',
        '`process.nextTick()` is asynchronous while `setImmediate()` is strictly synchronous',
        '`process.nextTick()` only works in browser environments'
      ],
      correctAnswer: 0,
      explanation: '`process.nextTick()` is not technically part of the libuv event loop; its callbacks execute right after the current operation ends before libuv proceeds to the next phase.'
    }
  ],
  'python': [
    {
      skill: 'Python',
      difficulty: 'Easy',
      question: 'What is the difference between a Python List and a Python Tuple?',
      options: [
        'Lists are mutable (can be altered); tuples are immutable (cannot be modified after creation)',
        'Tuples can hold elements of multiple data types, while lists cannot',
        'Lists use parenthesis `()` while tuples use square brackets `[]`',
        'Tuples cannot be indexed'
      ],
      correctAnswer: 0,
      explanation: 'Lists are mutable sequences created with `[]`, whereas tuples are immutable sequences created with `()` whose values cannot be changed or reordered in-place.'
    },
    {
      skill: 'Python',
      difficulty: 'Medium',
      question: 'What is Python’s Global Interpreter Lock (GIL) and what limitation does it impose?',
      options: [
        'A lock that prevents multiple Python threads from executing Python bytecodes concurrently on multiple CPU cores',
        'A security sandbox that prevents Python from reading the host filesystem',
        'A memory garbage collector that freezes the program during deallocation',
        'A cryptographic certificate verifying downloaded packages'
      ],
      correctAnswer: 0,
      explanation: 'CPython uses the GIL to manage memory thread-safety. As a consequence, multi-threaded pure Python code runs on only one CPU core at a time, making `multiprocessing` preferred for CPU-heavy tasks.'
    },
    {
      skill: 'Python',
      difficulty: 'Hard',
      question: 'How do Python Generators differ from normal functions and what keyword is used to pause their execution?',
      options: [
        'They use `yield` to produce values lazily on-demand without storing the entire sequence in memory',
        'They execute in a separate operating system process using `spawn`',
        'They use `return` and destroy their local state after every iteration',
        'They are compiled to machine bytecode at launch time'
      ],
      correctAnswer: 0,
      explanation: 'Generators retain their state across successive calls using `yield`. Instead of computing an entire array in RAM, they compute one element at a time, delivering extreme memory efficiency.'
    }
  ],
  'fastapi': [
    {
      skill: 'FastAPI',
      difficulty: 'Medium',
      question: 'Why does FastAPI achieve performance on par with NodeJS and Go?',
      options: [
        'It is built on top of Starlette and Pydantic with asynchronous ASGI support (Uvicorn)',
        'It compiles Python code directly into C binaries using Cython during startup',
        'It disables all HTTP request validation',
        'It runs exclusively on GPUs'
      ],
      correctAnswer: 0,
      explanation: 'FastAPI utilizes Starlette for high-speed async web routing and Pydantic for data parsing and validation, executing on top of ASGI servers like Uvicorn.'
    }
  ],
  'django': [
    {
      skill: 'Django',
      difficulty: 'Medium',
      question: 'In Django ORM, how does `select_related()` prevent the N+1 database queries problem compared to standard querying?',
      options: [
        'It performs an SQL JOIN in the initial query for single-valued relationships (ForeignKey / OneToOne)',
        'It caches all database tables in local memory',
        'It converts relational data into a NoSQL document',
        'It creates a temporary table in the database'
      ],
      correctAnswer: 0,
      explanation: '`select_related` follows foreign-key relationships and executes an SQL JOIN to fetch related objects in a single query, eliminating redundant round trips to the database.'
    }
  ],
  'java': [
    {
      skill: 'Java',
      difficulty: 'Easy',
      question: 'What is the purpose of the `final` keyword when applied to a class, method, and variable in Java?',
      options: [
        'A final class cannot be inherited, a final method cannot be overridden, and a final variable cannot be reassigned',
        'It marks the code for automatic garbage collection when out of scope',
        'It allows the entity to be accessed across different threads without synchronization',
        'It automatically exports the class as a public API'
      ],
      correctAnswer: 0,
      explanation: 'In Java, `final` on a class prevents subclassing; on a method it prevents overriding in subclasses; and on a variable it makes the reference constant.'
    },
    {
      skill: 'Java',
      difficulty: 'Medium',
      question: 'What is the difference between `==` and `.equals()` when comparing two String objects in Java?',
      options: [
        '`==` compares memory references (memory address); `.equals()` compares the actual textual content of the strings',
        '`==` compares string content while `.equals()` checks memory addresses',
        'There is no difference; both perform deep equality comparisons',
        '`==` checks string length while `.equals()` checks string case sensitivity'
      ],
      correctAnswer: 0,
      explanation: 'In Java, `==` tests whether both variables point to the exact same memory location in the Heap or String Pool, whereas `String.equals()` compares character by character content.'
    },
    {
      skill: 'Java',
      difficulty: 'Hard',
      question: 'How does Java 8+ handle hash collisions in `HashMap` when many keys hash to the same bucket?',
      options: [
        'It converts the bucket linked list into a Balanced Red-Black Tree once bucket elements exceed 8 (TREEIFY_THRESHOLD)',
        'It rehashes the entire table into a cryptographic array',
        'It drops the older elements to keep capacity under limit',
        'It throws an unchecked `HashCollisionException`'
      ],
      correctAnswer: 0,
      explanation: 'To avoid O(N) degradation in worst-case collisions, Java 8 converts the bucket linked list to a Red-Black tree when size exceeds 8, guaranteeing O(log N) lookup time.'
    }
  ],
  'spring boot': [
    {
      skill: 'Spring Boot',
      difficulty: 'Medium',
      question: 'What is the role of the `@Autowired` annotation in Spring Boot?',
      options: [
        'It enables Spring’s Dependency Injection to resolve and inject collaborating beans into the target class automatically',
        'It automatically creates a database table for the class',
        'It schedules the method to run automatically every hour',
        'It enables HTTPS encryption on the REST endpoint'
      ],
      correctAnswer: 0,
      explanation: '`@Autowired` marks a constructor, field, or setter for automatic dependency injection by Spring’s Inversion of Control (IoC) container.'
    }
  ],
  'c++': [
    {
      skill: 'C++',
      difficulty: 'Medium',
      question: 'In C++11 and later, what is the key advantage of `std::unique_ptr` over raw pointers?',
      options: [
        'It implements exclusive ownership RAII, automatically deallocating the managed object when the pointer goes out of scope',
        'It allows multiple threads to write to the same memory address without mutex locks',
        'It doubles the execution speed of pointer dereferencing',
        'It stores objects on the stack instead of the heap'
      ],
      correctAnswer: 0,
      explanation: '`std::unique_ptr` enforces strict single ownership and automatically invokes `delete` upon destruction, eliminating memory leaks and double-free errors.'
    },
    {
      skill: 'C++',
      difficulty: 'Hard',
      question: 'What is the purpose of Move Semantics and `std::move` in C++?',
      options: [
        'To transfer ownership of heavy heap resources from rvalues to new objects without expensive deep copying',
        'To relocate variables from RAM to CPU cache',
        'To move thread execution to a different CPU core',
        'To change the scope of a variable dynamically'
      ],
      correctAnswer: 0,
      explanation: 'Move semantics cast lvalues to rvalue references, allowing move constructors to steal pointers from temporary objects instead of making full copies of data.'
    }
  ],
  'sql': [
    {
      skill: 'SQL',
      difficulty: 'Easy',
      question: 'What is the functional difference between `WHERE` and `HAVING` clauses in SQL?',
      options: [
        '`WHERE` filters individual rows before grouping; `HAVING` filters aggregated groups after the `GROUP BY` clause',
        '`HAVING` filters rows before any calculation; `WHERE` filters after aggregation',
        '`HAVING` can only be used on primary key columns',
        'There is no functional difference; they are interchangeable'
      ],
      correctAnswer: 0,
      explanation: '`WHERE` filters records before aggregation functions (COUNT, SUM, AVG) run. `HAVING` filters the results after `GROUP BY` aggregates the dataset.'
    },
    {
      skill: 'SQL',
      difficulty: 'Medium',
      question: 'What are the four ACID properties in Relational Database Management Systems (RDBMS)?',
      options: [
        'Atomicity, Consistency, Isolation, Durability',
        'Authentication, Confidentiality, Integrity, Delegation',
        'Availability, Concurrency, Indexing, Decoupling',
        'Allocation, Clustering, Ingestion, Distribution'
      ],
      correctAnswer: 0,
      explanation: 'ACID guarantees database transaction reliability: Atomicity (all-or-nothing), Consistency (valid state rules), Isolation (concurrent safety), and Durability (persisted survival).'
    },
    {
      skill: 'SQL',
      difficulty: 'Hard',
      question: 'How does a B-Tree index accelerate SQL queries and when can it degrade performance?',
      options: [
        'It provides O(log N) search, range lookups, and sorting, but degrades `INSERT`/`UPDATE` operations due to index page splits and rebalancing overhead',
        'It converts SQL queries into binary compiled machine code',
        'It compresses database rows to 50% smaller sizes on disk',
        'It only works for exact integer equality checks'
      ],
      correctAnswer: 0,
      explanation: 'B-Trees maintain sorted keys allowing logarithmic lookups and range scans. However, frequent write operations require updating the B-Tree and rebalancing nodes, adding write overhead.'
    }
  ],
  'postgresql': [
    {
      skill: 'PostgreSQL',
      difficulty: 'Medium',
      question: 'What is Multi-Version Concurrency Control (MVCC) in PostgreSQL?',
      options: [
        'A mechanism where readers do not block writers and writers do not block readers by maintaining multiple snapshot versions of tuples',
        'A tool that automatically runs database migrations across versions',
        'A sharding system for splitting tables across clusters',
        'A feature that converts PostgreSQL into a key-value store'
      ],
      correctAnswer: 0,
      explanation: 'PostgreSQL implements MVCC by tagging rows with transaction IDs (xmin/xmax). Each query sees a consistent snapshot of data without needing table-level read locks.'
    }
  ],
  'docker': [
    {
      skill: 'Docker',
      difficulty: 'Easy',
      question: 'What is the difference between a Docker Image and a Docker Container?',
      options: [
        'An Image is a read-only immutable blueprint; a Container is a runnable, isolated instance with a thin writable layer on top',
        'A Container is the blueprint code; an Image is the running process',
        'Images are used only in production; Containers are used only in development',
        'Images run on Linux only, while Containers run on Windows only'
      ],
      correctAnswer: 0,
      explanation: 'A Docker image is a packaged static template containing application code, runtime, and libraries. A container is an active running instance created from that image.'
    },
    {
      skill: 'Docker',
      difficulty: 'Medium',
      question: 'What is the purpose of Multi-Stage Builds in Dockerfile?',
      options: [
        'To separate the build environment from the final runtime image, keeping the production image size drastically smaller and more secure',
        'To run containers across multiple physical computers simultaneously',
        'To allow a container to run multiple operating systems at once',
        'To execute Docker builds in parallel across multiple clouds'
      ],
      correctAnswer: 0,
      explanation: 'Multi-stage builds enable compiling assets (e.g. Go binary or React production build) in an initial heavy build stage and copying only the artifacts into a minimal production image.'
    }
  ],
  'git': [
    {
      skill: 'Git',
      difficulty: 'Easy',
      question: 'What is the difference between `git merge` and `git rebase`?',
      options: [
        '`git merge` creates a new merge commit combining two branch histories; `git rebase` rewrites commit history by moving base commits on top of another branch for a linear log',
        '`git rebase` deletes previous commits permanently from Git history without trace',
        '`git merge` can only be performed by repository administrators',
        '`git rebase` creates a duplicate remote branch on GitHub'
      ],
      correctAnswer: 0,
      explanation: '`git merge` preserves true chronological history with a merge commit. `git rebase` replays your commits one by one on top of the target branch to achieve a clean, linear commit history.'
    }
  ],
  'data structures': [
    {
      skill: 'Data Structures',
      difficulty: 'Medium',
      question: 'Which data structure is ideal for implementing a First-In-First-Out (FIFO) cache eviction policy or Breadth-First Search (BFS)?',
      options: ['Queue', 'Stack', 'Max-Heap', 'Binary Search Tree'],
      correctAnswer: 0,
      explanation: 'A Queue adheres to FIFO principles where the first element inserted is the first element removed, which is the foundational mechanic for BFS exploration.'
    },
    {
      skill: 'Data Structures',
      difficulty: 'Hard',
      question: 'What is the average and worst-case time complexity of searching an element in a Hash Map with chaining collision resolution?',
      options: [
        'Average O(1), Worst-case O(N) when all elements collide into the same bucket',
        'Average O(log N), Worst-case O(N^2)',
        'Average O(1), Worst-case O(1) guaranteed always',
        'Average O(N), Worst-case O(N log N)'
      ],
      correctAnswer: 0,
      explanation: 'With a uniform hash function, items distribute evenly resulting in O(1) average lookup. If all keys hash to the same bucket index, the chain degrades to a linked list requiring O(N) scan.'
    }
  ],
  'algorithms': [
    {
      skill: 'Algorithms',
      difficulty: 'Medium',
      question: 'Which sorting algorithm has a guaranteed O(N log N) worst-case time complexity and is stable?',
      options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'],
      correctAnswer: 0,
      explanation: 'Merge Sort divides the array into halves and merges sorted sub-arrays, guaranteeing O(N log N) time in best, average, and worst cases while preserving relative order of equal elements (stability).'
    }
  ],
  'rest apis': [
    {
      skill: 'REST APIs',
      difficulty: 'Medium',
      question: 'What makes an HTTP method "Idempotent" in REST architecture, and which of the following is idempotent?',
      options: [
        'Making the same request multiple times produces the exact same server state as making it once (e.g. `PUT`, `DELETE`, `GET`)',
        'The method can only be called once in 24 hours',
        'The request payload must be encrypted with SSL',
        '`POST` is the only idempotent method'
      ],
      correctAnswer: 0,
      explanation: 'Idempotency means repeated identical requests leave the system in the same state. `PUT`, `DELETE`, and `GET` are idempotent, while `POST` creates new resources each time and is not idempotent.'
    }
  ]
};

// Fallback general tech questions if extracted skills are sparse
const GENERAL_FALLBACK_QUESTIONS = [
  {
    skill: 'Software Engineering',
    difficulty: 'Easy',
    question: 'In modern Software Development Life Cycle (SDLC), what is the key goal of Continuous Integration (CI)?',
    options: [
      'Automatically merge code changes into a central repository and run automated tests to detect bugs early',
      'Deploy code to production without any automated testing',
      'Manually review code once every six months',
      'Generate invoices for cloud resource usage'
    ],
    correctAnswer: 0,
    explanation: 'Continuous Integration focuses on merging developer work into the main branch frequently with automated builds and unit test suites to detect regression bugs rapidly.'
  },
  {
    skill: 'Operating Systems',
    difficulty: 'Medium',
    question: 'What is a Deadlock in operating systems and what are the four necessary Coffman conditions?',
    options: [
      'A condition where processes are blocked waiting for resources held by each other (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait)',
      'When the computer CPU runs out of electrical power',
      'When two threads access the same variable at the same microsecond without cache coherence',
      'When hard disk read speeds drop below network transmission speeds'
    ],
    correctAnswer: 0,
    explanation: 'Deadlock occurs when processes cannot proceed because each holds a resource needed by another in a cycle. Coffman conditions are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.'
  }
];

export function generateMCQsForCandidate(skillsList = []) {
  const normalizedCandidateSkills = (skillsList || []).map(s => s.toLowerCase().trim());
  const matchedQuestions = [];

  // Find questions matching extracted candidate skills
  for (const [key, questions] of Object.entries(SKILL_QUESTION_DATABASE)) {
    const isMatched = normalizedCandidateSkills.some(candSkill => 
      candSkill.includes(key) || key.includes(candSkill)
    );

    if (isMatched) {
      matchedQuestions.push(...questions);
    }
  }

  // Shuffle matched questions
  const shuffled = [...matchedQuestions].sort(() => 0.5 - Math.random());

  // If candidate has fewer matched questions than 10, fill with high-relevance fallback
  let selected = shuffled.slice(0, 10);
  if (selected.length < 10) {
    const remaining = 10 - selected.length;
    const fillers = [...GENERAL_FALLBACK_QUESTIONS].sort(() => 0.5 - Math.random());
    selected.push(...fillers.slice(0, remaining));
  }

  // If still less than 10, pick from standard pool
  if (selected.length < 10) {
    const allPool = Object.values(SKILL_QUESTION_DATABASE).flat();
    for (const q of allPool) {
      if (!selected.some(item => item.question === q.question)) {
        selected.push(q);
        if (selected.length === 10) break;
      }
    }
  }

  return selected.map((q, idx) => ({
    id: `mcq-${idx + 1}`,
    index: idx + 1,
    ...q
  }));
}

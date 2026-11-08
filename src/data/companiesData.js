export const COMPANIES_DATA = [
  {
    id: 'google',
    name: 'Google',
    badgeColor: 'border-blue-500/30 text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
    logoText: 'G',
    tier: 'Tier 1 Product',
    headquarters: 'Mountain View, CA & Bengaluru / Hyderabad, India',
    rating: 4.5,
    overview: 'Google is a global technology leader focusing on search, cloud computing, software, and hardware. Known for high technical standards, rigorous algorithmic problem-solving, and assessing "Googliness" and leadership.',
    roles: [
      {
        title: 'Software Engineer (L3 - Early Career / Fresher)',
        experience: '0 - 2 years',
        salaryRange: '$130k - $190k / ₹25L - ₹45L CTC',
        requiredSkills: ['Data Structures & Algorithms', 'C++', 'Java', 'Python', 'System Design Basics', 'Dynamic Programming', 'Graph Theory', 'Time Complexity Analysis']
      },
      {
        title: 'Software Engineer (L4 - Mid Level)',
        experience: '2 - 5 years',
        salaryRange: '$180k - $270k / ₹45L - ₹75L CTC',
        requiredSkills: ['Distributed Systems', 'Low-Level Design', 'Data Structures', 'Concurrency', 'Microservices', 'Go', 'Python']
      },
      {
        title: 'Frontend Engineer (Web Technologies)',
        experience: '1 - 4 years',
        salaryRange: '$140k - $220k / ₹30L - ₹55L CTC',
        requiredSkills: ['JavaScript / TypeScript', 'React', 'Browser Internals', 'Web Performance', 'DOM Manipulation', 'CSS Architecture']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Online Assessment (Google OA)', duration: '90 mins', description: '2 complex algorithmic problems on graph theory, dynamic programming, or sliding window.' },
      { step: 'Round 2', name: 'Technical Phone Screen', duration: '45 mins', description: 'Live coding on Google Docs / Shared editor with a Google engineer. Focus on clean code & optimal time/space complexity.' },
      { step: 'Round 3-5', name: 'Onsite / Virtual Loop (3x Technical Rounds)', duration: '45 mins each', description: 'In-depth DSA, data modeling, recursion, trees/graphs, edge-case analysis and problem decomposition.' },
      { step: 'Round 6', name: 'Googliness & Leadership', duration: '45 mins', description: 'Behavioral scenarios, handling ambiguity, ethical dilemmas, team collaboration, and diversity.' }
    ],
    reportedTopics: [
      'Graph algorithms (Dijkstra, BFS/DFS, Topological Sort)',
      'Dynamic Programming with Memoization & Tabulation',
      'Trie data structure & string search',
      'Interval scheduling and sweep-line algorithms',
      'Union-Find (Disjoint Set Union) for connectivity',
      'Concurrency and thread-safe data structures'
    ],
    pastQuestions: [
      {
        id: 'g-q1',
        title: 'Word Ladder II / Shortest Transformation Sequence',
        difficulty: 'Hard',
        category: 'Graph / BFS',
        question: 'Given two words (beginWord and endWord), and a dictionary word list, find all shortest transformation sequences from beginWord to endWord such that only one letter is changed at a time.',
        hint: 'Use bidirectional BFS to find the shortest path length, then perform backtracking (DFS) to reconstruct the paths.',
        source: 'LeetCode #126 / Google Candidate Experience 2024'
      },
      {
        id: 'g-q2',
        title: 'Snapshot Array with Version History',
        difficulty: 'Medium',
        category: 'Binary Search / Design',
        question: 'Implement a SnapshotArray that supports set(index, val), snap(), and get(index, snap_id) with minimal memory footprint.',
        hint: 'Store changes as a list of (snap_id, val) pairs per index and use binary search (bisect_right) to query.',
        source: 'Google Interview Experience Report 2024'
      },
      {
        id: 'g-q3',
        title: 'Course Schedule III (Greedy with Max-Heap)',
        difficulty: 'Hard',
        category: 'Greedy / Heap',
        question: 'There are n different online courses numbered from 1 to n. Each course has duration and lastDay. Find max number of courses that can be taken.',
        hint: 'Sort by deadline ascending. Maintain max-heap of taken course durations. If total time exceeds deadline, drop longest course.',
        source: 'Google Bangalore / Glassdoor Candidate 2024'
      }
    ],
    hrQuestions: [
      'Tell me about a time you worked on a project with ambiguous requirements. How did you navigate the uncertainty?',
      'Describe a scenario where you disagreed with a team member’s technical decision. How did you reach consensus?',
      'What does "Googliness" mean to you, and how do you ensure your code contributes positively to end-users?'
    ],
    preparationTips: [
      'Always clarify problem constraints, edge cases (empty inputs, nulls, duplicates) before writing any code.',
      'State brute force solution first with its Big-O time and space complexity, then explain your optimization strategy.',
      'Google interviewers care deeply about modular, readable code with clean variable naming, not just competitive programming hacks.',
      'Practice writing code without auto-complete or syntax linting.'
    ],
    sources: [
      { label: 'Google Careers - Student & Early Career Guide', url: 'https://careers.google.com/students/' },
      { label: 'LeetCode Google Interview Tagged Questions', url: 'https://leetcode.com/company/google/' },
      { label: 'Glassdoor Google Software Engineer Interviews', url: 'https://www.glassdoor.com/Interview/Google-Software-Engineer-Interview-Questions-E9079_KO16,33.htm' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badgeColor: 'border-cyan-500/30 text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-400',
    logoText: 'MS',
    tier: 'Tier 1 Product',
    headquarters: 'Redmond, WA & Hyderabad / Bengaluru / Noida, India',
    rating: 4.4,
    overview: 'Microsoft empowers every person and organization on the planet to achieve more. Interviews balance solid data structures & algorithms with strong object-oriented design, real-world debugging, and system scalability.',
    roles: [
      {
        title: 'Software Development Engineer 1 (SDE I)',
        experience: '0 - 2 years',
        salaryRange: '$120k - $175k / ₹18L - ₹32L CTC',
        requiredSkills: ['C# / .NET or Java / C++', 'Object-Oriented Design', 'Binary Trees & BSTs', 'Linked Lists', 'SQL / Database Design', 'Git']
      },
      {
        title: 'Software Engineer (Azure / Cloud Infrastructure)',
        experience: '2 - 4 years',
        salaryRange: '$150k - $220k / ₹30L - ₹50L CTC',
        requiredSkills: ['Distributed Systems', 'Cloud Computing', 'REST APIs', 'Kubernetes / Docker', 'Python', 'Go', 'Linux Internals']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Codility Online Assessment', duration: '75-90 mins', description: '3 coding problems focused on string manipulation, array sliding windows, and bit manipulation.' },
      { step: 'Round 2', name: 'Technical Screening', duration: '45 mins', description: 'Live coding on tree traversal, recursion, or dynamic programming with code walkthrough.' },
      { step: 'Round 3', name: 'Data Structures & Algorithms Deep Dive', duration: '60 mins', description: 'Complex algorithmic challenges, boundary condition handling, and memory optimization.' },
      { step: 'Round 4', name: 'System / Low-Level Design & OOP', duration: '60 mins', description: 'Class diagrams, SOLID principles, design patterns (Factory, Observer, Singleton), and API design.' },
      { step: 'Round 5', name: 'AA (As-Appropriate) / Hiring Manager Round', duration: '45 mins', description: 'Culture fit, growth mindset questions, architectural discussions, and behavioral scenarios.' }
    ],
    reportedTopics: [
      'Binary Trees & Binary Search Trees (LCA, Serialization, Diameter)',
      'Linked List manipulations (Cycle detection, reverse in K-groups)',
      'Design problems (LRU Cache, File System, Parking Lot, Rate Limiter)',
      'Dynamic Programming (Longest Increasing Subsequence, Coin Change)',
      'Object Oriented Design & SOLID principles'
    ],
    pastQuestions: [
      {
        id: 'ms-q1',
        title: 'Lowest Common Ancestor in Binary Search Tree',
        difficulty: 'Medium',
        category: 'Trees',
        question: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.',
        hint: 'Leverage BST property: if both values are smaller than root, go left; if larger, go right; else root is the split point LCA.',
        source: 'Microsoft University Recruiting 2024'
      },
      {
        id: 'ms-q2',
        title: 'Design In-Memory File System',
        difficulty: 'Hard',
        category: 'Design / Trie',
        question: 'Design a data structure that simulates an in-memory file system with ls, mkdir, addContentToFile, and readContentFromFile.',
        hint: 'Use a Trie-like directory tree structure where each node can be a directory or file.',
        source: 'Microsoft SDE-1 Interview Bangalore'
      },
      {
        id: 'ms-q3',
        title: 'Merge K Sorted Linked Lists',
        difficulty: 'Hard',
        category: 'Heaps / Linked Lists',
        question: 'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.',
        hint: 'Push heads of all lists into a min-heap of size K, pop smallest, and advance that list node.',
        source: 'Microsoft Redmond Campus Loop'
      }
    ],
    hrQuestions: [
      'Tell me about a time you demonstrated Microsoft’s core value of having a "Growth Mindset".',
      'How do you handle constructive criticism on your pull requests or code reviews?',
      'Why Microsoft and which product group (Azure, Office 365, GitHub, Xbox) excites you most?'
    ],
    preparationTips: [
      'Microsoft loves Tree and Linked List problems. Practice pointer manipulation and edge cases like cycle detection thoroughly.',
      'Show that you understand Object-Oriented Design. Write clean classes, encapsulation, and error handling.',
      'Emphasize Microsoft’s growth mindset: when you do not know something, express eagerness to learn and explain how you would find out.'
    ],
    sources: [
      { label: 'Microsoft Life & Careers', url: 'https://careers.microsoft.com/' },
      { label: 'GeeksforGeeks Microsoft Archives', url: 'https://www.geeksforgeeks.org/tag/microsoft/' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badgeColor: 'border-amber-500/30 text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
    logoText: 'AMZN',
    tier: 'Tier 1 Product',
    headquarters: 'Seattle, WA & Hyderabad / Bengaluru / Chennai, India',
    rating: 4.3,
    overview: 'Amazon is guided by 16 Leadership Principles (LPs). In Amazon interviews, every single round evaluates BOTH technical competence (DSA, OOD, System Design) and candidate alignment with 2-3 specific Leadership Principles using the STAR method.',
    roles: [
      {
        title: 'Software Development Engineer I (SDE 1)',
        experience: '0 - 2 years',
        salaryRange: '$125k - $185k / ₹22L - ₹38L CTC',
        requiredSkills: ['Java / C++', 'Object-Oriented Programming', 'Trees & Graphs', 'Dynamic Programming', 'STAR Method Stories', 'Scalable Code']
      },
      {
        title: 'Software Development Engineer II (SDE 2)',
        experience: '2 - 6 years',
        salaryRange: '$170k - $260k / ₹40L - ₹70L CTC',
        requiredSkills: ['High-Level System Design', 'AWS Services', 'Distributed Caching', 'Microservices Architecture', 'Database Sharding']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Online Assessment (OA 1 & OA 2)', duration: '105 mins', description: '2 coding problems + Amazon Work Style Simulation (assessing LP judgment in work dilemmas).' },
      { step: 'Round 2-5', name: 'Virtual Onsite Loop (4 rounds)', duration: '60 mins each', description: 'Each round is split: 20-25 mins LP Behavioral questions + 35 mins Coding/DSA or Object-Oriented Design.' },
      { step: 'Bar Raiser Round', name: 'Amazon Bar Raiser', duration: '60 mins', description: 'Conducted by an independent evaluator to ensure candidate raises the hiring bar across culture and technical skill.' }
    ],
    reportedTopics: [
      'Leadership Principles: Customer Obsession, Ownership, Bias for Action, Dive Deep',
      'Breadth-First Search & Dijkstra (Grid shortest paths, rotting oranges)',
      'Binary Trees & Heaps (Top K Frequent, Median of Stream)',
      'LRU Cache & HashMap + Doubly Linked List',
      'Monotonic Stack (Next Greater Element, Daily Temperatures)'
    ],
    pastQuestions: [
      {
        id: 'amzn-q1',
        title: 'Rotting Oranges / Zombie Matrix Infection',
        difficulty: 'Medium',
        category: 'Matrix BFS',
        question: 'Given an m x n grid where each cell is empty (0), fresh orange (1), or rotten orange (2). Every minute, 4-directionally adjacent fresh oranges rot. Return minimum minutes until no fresh oranges remain.',
        hint: 'Use Multi-source BFS starting with all initial rotten oranges in the queue, tracking levels as minutes.',
        source: 'Amazon OA 2024 & Virtual Onsite'
      },
      {
        id: 'amzn-q2',
        title: 'Analyze User Website Visit Pattern',
        difficulty: 'Medium',
        category: 'HashMap / Combinations',
        question: 'Given username, timestamp, and website lists, find the 3-sequence of websites visited by the greatest number of distinct users.',
        hint: 'Sort visits by timestamp, group by user, generate all unique 3-tuples visited per user, and tally frequencies in a global map.',
        source: 'Amazon Seattle Onsite Loop'
      },
      {
        id: 'amzn-q3',
        title: 'Design Amazon Locker System',
        difficulty: 'Medium',
        category: 'Object Oriented Design',
        question: 'Design an automated package delivery locker system with small, medium, large compartments, access codes, and expiration policies.',
        hint: 'Define Package, Locker, Compartment, Size enum, and LockerService with allocation algorithm.',
        source: 'Amazon SDE-1 OOD Round'
      }
    ],
    hrQuestions: [
      'Tell me about a time you had to deliver a project on an impossibly tight deadline (Bias for Action).',
      'Give an example of when you had to dive deep into a complex bug and found the root cause (Dive Deep).',
      'Tell me about a time you had to push back on a decision because it harmed the customer experience (Customer Obsession).'
    ],
    preparationTips: [
      'Prepare 6 to 8 stories from your college projects or previous jobs using the STAR method (Situation, Task, Action, Result).',
      'Quantify your results: e.g. "improved query latency by 34%", "reduced memory footprint by 200MB".',
      'Practice speaking for 3-4 minutes on behavioral questions before jumping into code.'
    ],
    sources: [
      { label: 'Amazon 16 Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
      { label: 'LeetCode Amazon Interview Questions', url: 'https://leetcode.com/company/amazon/' }
    ]
  },
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    badgeColor: 'border-emerald-500/30 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400',
    logoText: 'TCS',
    tier: 'Tier 1 IT Services',
    headquarters: 'Mumbai, Maharashtra, India',
    rating: 4.0,
    overview: 'TCS is India’s largest IT services and consulting company. Hiring spans TCS Ninja (₹3.36L), TCS Digital (₹7.5L), and TCS Prime (₹9L - ₹11.5L) cadres through National Qualifier Test (NQT) and campus drives.',
    roles: [
      {
        title: 'TCS Digital / Prime Developer',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹7.5L - ₹11.5L CTC',
        requiredSkills: ['Python / Java', 'DSA Basics', 'SQL / Relational Databases', 'Machine Learning Basics', 'Cloud Fundamentals', 'Clean Code']
      },
      {
        title: 'TCS Ninja (Systems Engineer)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹3.36L - ₹4.0L CTC',
        requiredSkills: ['C Programming', 'Fundamental OOPs', 'Quantitative Aptitude', 'Verbal Reasoning', 'SQL Queries', 'SDLC']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'TCS NQT (Aptitude & Coding)', duration: '120 mins', description: 'Numerical ability, reasoning ability, verbal English, and 2 hands-on coding questions.' },
      { step: 'Round 2', name: 'Technical Interview (TR)', duration: '30-45 mins', description: 'Core CS concepts: OOPs, DBMS, Operating Systems, Computer Networks, and your final year project walkthrough.' },
      { step: 'Round 3', name: 'Managerial Round (MR)', duration: '20-30 mins', description: 'Project management scenarios, team conflict, situational decision making, and willingness to relocate.' },
      { step: 'Round 4', name: 'HR Interview', duration: '15-20 mins', description: 'Background verification, shift flexibility, communication skills, and employment bond/terms.' }
    ],
    reportedTopics: [
      'OOPs four pillars (Encapsulation, Polymorphism, Inheritance, Abstraction) with real code examples',
      'DBMS: ACID properties, Normalization (1NF, 2NF, 3NF), Primary vs Foreign keys, JOIN queries',
      'Operating Systems: Paging, Deadlock conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait)',
      'Basic arrays and strings (Palindrome, Anagram, Subarray sum, Matrix rotation)'
    ],
    pastQuestions: [
      {
        id: 'tcs-q1',
        title: 'Subarray with Given Sum',
        difficulty: 'Easy-Medium',
        category: 'Arrays / Sliding Window',
        question: 'Given an unsorted array A of size N of non-negative integers, find a continuous sub-array which adds to a given number S.',
        hint: 'Use two pointers sliding window approach since elements are non-negative.',
        source: 'TCS Digital NQT 2024'
      },
      {
        id: 'tcs-q2',
        title: 'Second Highest Salary SQL Query',
        difficulty: 'Easy',
        category: 'DBMS / SQL',
        question: 'Write an SQL query to report the second highest salary from the Employee table. If not present, return null.',
        hint: 'SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);',
        source: 'TCS Technical Round TR'
      },
      {
        id: 'tcs-q3',
        title: 'Explain Polymorphism with Code Implementation',
        difficulty: 'Easy',
        category: 'OOPs',
        question: 'What is the difference between Method Overloading (Compile time) and Method Overriding (Run time)? Write a quick code sample.',
        hint: 'Method overloading happens within the same class with different parameters; overriding happens in subclass with same signature.',
        source: 'TCS Technical Panel 2024'
      }
    ],
    hrQuestions: [
      'Tell me about your final year project. What was your individual role and contribution?',
      'Are you open to working in different technology stacks and relocating across India?',
      'How do you stay updated with emerging technologies like Generative AI and Cloud?'
    ],
    preparationTips: [
      'Be thoroughly prepared to explain every single line of code and library mentioned in your resume projects.',
      'Practice writing clean SQL queries on paper or a simple plain notepad.',
      'Demonstrate clear English communication and professional etiquette.'
    ],
    sources: [
      { label: 'TCS iON NQT Official Portal', url: 'https://learning.tcsionhub.in/hub/national-qualifier-test/' },
      { label: 'GeeksforGeeks TCS Recruitment Archives', url: 'https://www.geeksforgeeks.org/tag/tcs/' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    badgeColor: 'border-blue-600/30 text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
    logoText: 'INFY',
    tier: 'Tier 1 IT Services',
    headquarters: 'Bengaluru, Karnataka, India',
    rating: 3.9,
    overview: 'Infosys is a global leader in next-generation digital services and consulting. Recruitment features the prestigious Specialist Programmer (SP - ₹9.5L) and Digital Specialist Engineer (DSE - ₹6.25L) tracks through the InfyTQ and HackWithInfy competitions.',
    roles: [
      {
        title: 'Specialist Programmer (SP)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹9.5L - ₹10.5L CTC',
        requiredSkills: ['Advanced Data Structures', 'Dynamic Programming', 'Graph Algorithms', 'Python / Java', 'System Architecture Basics']
      },
      {
        title: 'Digital Specialist Engineer (DSE)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹6.25L - ₹7.0L CTC',
        requiredSkills: ['Data Structures', 'Java / Python', 'Web Development (React/Node)', 'SQL', 'RESTful APIs']
      },
      {
        title: 'Systems Engineer (SE)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹3.6L - ₹4.5L CTC',
        requiredSkills: ['C / Python / Java Basics', 'Aptitude & Logical Reasoning', 'DBMS', 'OOP Concepts']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Infosys Online Test / HackWithInfy', duration: '90-180 mins', description: 'SP/DSE requires solving 3 hard algorithmic problems; SE tests reasoning, verbal, pseudocode, and numerical ability.' },
      { step: 'Round 2', name: 'Technical Interview', duration: '40 mins', description: 'Coding question walkthrough, core CS fundamentals (OOP, DBMS, OS), project review, and live coding.' },
      { step: 'Round 3', name: 'HR Interview', duration: '15-20 mins', description: 'Communication skills, willingness to relocate to Mysuru campus for training, shift readiness.' }
    ],
    reportedTopics: [
      'Graph Traversals (BFS, DFS, Dijkstra, Cycle detection)',
      'Dynamic Programming (Subset Sum, Knapsack, Matrix Chain Multiplication)',
      'Database Normalization and Indexing types (B-Tree, Hash)',
      'Object Oriented Programming in Java/Python (Static keyword, Interfaces, Abstract classes)'
    ],
    pastQuestions: [
      {
        id: 'infy-q1',
        title: 'Longest Palindromic Substring',
        difficulty: 'Medium',
        category: 'Strings / Dynamic Programming',
        question: 'Given a string s, return the longest palindromic substring in s.',
        hint: 'Expand around center for each character and pair of characters in O(n^2) time and O(1) extra space.',
        source: 'Infosys SP Technical Round 2024'
      },
      {
        id: 'infy-q2',
        title: 'Detect Cycle in a Directed Graph',
        difficulty: 'Medium',
        category: 'Graphs / DFS',
        question: 'Given a directed graph, determine if there is a cycle present using DFS recursion or Kahn’s algorithm.',
        hint: 'Use a recursion stack array or in-degree calculation (topological sort).',
        source: 'HackWithInfy Round 2'
      }
    ],
    hrQuestions: [
      'Why do you want to join Infosys and what are your expectations from the Mysuru training program?',
      'Tell me about an instance when you had to learn a completely new framework within days to complete an assignment.'
    ],
    preparationTips: [
      'For Specialist Programmer (SP), practice LeetCode medium-to-hard dynamic programming and graph problems.',
      'Understand the principles taught in Mysuru training: Clean code, software engineering ethics, and automated testing.'
    ],
    sources: [
      { label: 'Infosys Springboard & Careers', url: 'https://www.infosys.com/careers/' },
      { label: 'GeeksforGeeks Infosys Archives', url: 'https://www.geeksforgeeks.org/tag/infosys/' }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    badgeColor: 'border-purple-500/30 text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400',
    logoText: 'ACN',
    tier: 'Tier 1 Global Consulting',
    headquarters: 'Dublin, Ireland & Pan-India Offices',
    rating: 4.1,
    overview: 'Accenture is a Fortune Global 500 company providing strategy, consulting, digital, and technology services. Campus hiring offers Associate Software Engineer (ASE - ₹4.5L) and Advanced ASE (AASE - ₹6.5L).',
    roles: [
      {
        title: 'Advanced Associate Software Engineer (AASE)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹6.5L - ₹7.5L CTC',
        requiredSkills: ['Java / C#', 'Spring Boot / .NET Core', 'SQL & Cloud Basics', 'DSA Fundamentals', 'DevOps Awareness']
      },
      {
        title: 'Associate Software Engineer (ASE)',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹4.5L - ₹5.0L CTC',
        requiredSkills: ['Problem Solving', 'C++ / Python / Java', 'OOP Concepts', 'Relational Databases', 'Critical Thinking']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Cognitive & Technical Assessment', duration: '90 mins', description: 'Analytical reasoning, verbal ability, pseudo code, networking, security, and cloud basics.' },
      { step: 'Round 2', name: 'Coding Assessment', duration: '45 mins', description: '2 hands-on coding problems evaluated on all test cases.' },
      { step: 'Round 3', name: 'Communication Assessment', duration: '20 mins', description: 'Automated AI voice tool assessing pronunciation, listening, fluency, and vocabulary.' },
      { step: 'Round 4', name: 'Virtual Interview', duration: '30 mins', description: 'Combined Technical and HR interview focusing on projects, strengths, and adaptability.' }
    ],
    reportedTopics: [
      'Pseudocode tracing (Loop counters, recursive traces, bitwise operations)',
      'Cloud computing basics (IaaS vs PaaS vs SaaS, Virtualization)',
      'Computer Networks (OSI 7 layers, TCP vs UDP, HTTP vs HTTPS)',
      'String manipulations and array filtering'
    ],
    pastQuestions: [
      {
        id: 'acn-q1',
        title: 'String Compression and Character Counts',
        difficulty: 'Easy-Medium',
        category: 'Strings',
        question: 'Given an array of characters, compress it using frequency counts: "aabcccccaaa" becomes "a2b1c5a3". Return original if compressed is not shorter.',
        hint: 'Iterate through the string maintaining current character and running counter.',
        source: 'Accenture Coding Assessment 2024'
      },
      {
        id: 'acn-q2',
        title: 'Explain OSI 7 Layer Model with Practical Examples',
        difficulty: 'Easy',
        category: 'Networking',
        question: 'Name the 7 layers of OSI model from Physical to Application and explain at which layer routers and switches operate.',
        hint: 'Switches operate at Data Link (Layer 2); Routers operate at Network (Layer 3).',
        source: 'Accenture Tech Panel'
      }
    ],
    hrQuestions: [
      'Describe a project where you took leadership even though you were not formally designated as the team leader.',
      'How comfortable are you collaborating with offshore and geographically distributed teams across different time zones?'
    ],
    preparationTips: [
      'Do not overlook the Pseudocode round! Many candidates get eliminated here. Practice tracing code by hand on paper.',
      'Ensure a quiet environment and good headset for the Automated AI Communication assessment round.'
    ],
    sources: [
      { label: 'Accenture India Careers', url: 'https://www.accenture.com/in-en/careers' }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    badgeColor: 'border-violet-500/30 text-violet-600 bg-violet-50 dark:bg-violet-950/40 dark:text-violet-400',
    logoText: 'WIPRO',
    tier: 'Tier 1 IT Services',
    headquarters: 'Bengaluru, Karnataka, India',
    rating: 3.8,
    overview: 'Wipro is a prominent Indian multinational IT consulting company. Hiring programs include Elite National Talent Hunt (₹3.5L) and Turbo Developer (₹6.5L).',
    roles: [
      {
        title: 'Project Engineer (Elite & Turbo)',
        experience: 'Fresher / 0 - 2 years',
        salaryRange: '₹3.5L - ₹6.5L CTC',
        requiredSkills: ['C / C++ / Java', 'OOPs', 'DBMS', 'Operating Systems', 'Logical Aptitude', 'Written English']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Wipro Elite NTH Assessment', duration: '128 mins', description: 'Aptitude, Essay Writing, and 2 Coding Challenges.' },
      { step: 'Round 2', name: 'Technical Interview', duration: '30 mins', description: 'Discussion on college projects, core subjects, and basic coding problems.' },
      { step: 'Round 3', name: 'HR Interview', duration: '15 mins', description: 'Communication, willingness to work in shifts, relocation policy, service agreement.' }
    ],
    reportedTopics: [
      'Essay writing on current technological topics (Generative AI, Green Energy, Remote Work)',
      'Array manipulation (rotate array, find duplicates, second largest)',
      'DBMS commands: DDL vs DML vs DCL, Triggers and Stored Procedures'
    ],
    pastQuestions: [
      {
        id: 'wip-q1',
        title: 'Find Majority Element in an Array',
        difficulty: 'Easy-Medium',
        category: 'Arrays',
        question: 'Given an array nums of size n, return the majority element that appears more than ⌊n / 2⌋ times.',
        hint: 'Boyer-Moore Voting Algorithm achieves O(n) time and O(1) space complexity.',
        source: 'Wipro Turbo Coding Assessment'
      }
    ],
    hrQuestions: [
      'Where do you see yourself in 3 years in terms of technical growth and certifications?',
      'Why do you want to start your professional career with Wipro?'
    ],
    preparationTips: [
      'Grammar and structure in the Essay Writing test are checked automatically by an AI tool. Avoid grammatical errors and typos.',
      'Practice basic algorithms: Bubble Sort, Binary Search, Palindrome, Fibonacci, Prime number generation.'
    ],
    sources: [
      { label: 'Wipro Careers Portal', url: 'https://careers.wipro.com/' }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    badgeColor: 'border-sky-500/30 text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400',
    logoText: 'CTS',
    tier: 'Tier 1 IT Services',
    headquarters: 'Teaneck, NJ & Chennai, India',
    rating: 3.9,
    overview: 'Cognizant recruits through GenC (₹4L), GenC Elevate (₹4.25L - ₹4.5L), GenC Next (₹6.75L), and GenC Pro (₹9L+), heavily testing full stack development, cloud, and programming logic.',
    roles: [
      {
        title: 'GenC Next / Elevate Developer',
        experience: 'Fresher / 0 - 1 year',
        salaryRange: '₹4.5L - ₹7.0L CTC',
        requiredSkills: ['Full Stack Development', 'React / Angular', 'Node / Java', 'DSA Basics', 'Git', 'SQL']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Aptitude & Technical MCQ', duration: '80 mins', description: 'Quantitative, logical reasoning, and domain-specific technical MCQs.' },
      { step: 'Round 2', name: 'Hands-on Coding Assessment', duration: '60 mins', description: '2 programming problems focusing on arrays, strings, and recursion.' },
      { step: 'Round 3', name: 'Technical & HR Discussion', duration: '35 mins', description: 'Project architecture review, web basics, database queries, and behavioral questions.' }
    ],
    reportedTopics: [
      'REST API methods (GET, POST, PUT, DELETE, PATCH, Status codes: 200, 201, 400, 401, 404, 500)',
      'React lifecycle / hooks (useState, useEffect, useMemo, useCallback)',
      'SQL Aggregate functions (GROUP BY, HAVING, COUNT, AVG)'
    ],
    pastQuestions: [
      {
        id: 'cts-q1',
        title: 'Check for Balanced Parentheses',
        difficulty: 'Easy',
        category: 'Stacks',
        question: 'Given a string containing just the characters "(", ")", "{", "}", "[", and "]", determine if the input string is valid.',
        hint: 'Use a stack to push opening brackets and pop matching closing brackets.',
        source: 'Cognizant GenC Elevate 2024'
      }
    ],
    hrQuestions: [
      'Describe how you handled a high-pressure situation during college submissions or exams.'
    ],
    preparationTips: [
      'Understand how the frontend interacts with backend via HTTP and JSON.',
      'Be clear about your college project architecture from database to UI.'
    ],
    sources: [
      { label: 'Cognizant GenC Official Campus Hiring', url: 'https://www.cognizant.com/careers' }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    badgeColor: 'border-indigo-500/30 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400',
    logoText: 'CAP',
    tier: 'Tier 1 Global Consulting',
    headquarters: 'Paris, France & Mumbai / Pune, India',
    rating: 3.9,
    overview: 'Capgemini is a multinational IT services and business consulting firm. Campus hiring includes Analyst (₹4.25L) and Senior Analyst (₹5.75L - ₹7.5L). Tests include unique game-based aptitude challenges.',
    roles: [
      {
        title: 'Senior Analyst / Software Engineer',
        experience: 'Fresher / 0 - 2 years',
        salaryRange: '₹4.25L - ₹7.5L CTC',
        requiredSkills: ['C++ / Java / Python', 'Data Structures', 'Database Management', 'Game-based Reasoning', 'Agile Mindset']
      }
    ],
    interviewProcess: [
      { step: 'Round 1', name: 'Technical Assessment & Pseudocode', duration: '40 mins', description: '30 pseudocode and CS fundamental questions.' },
      { step: 'Round 2', name: 'English Communication Test', duration: '30 mins', description: 'Grammar, reading comprehension, and sentence correction.' },
      { step: 'Round 3', name: 'Game-Based Aptitude Test', duration: '24 mins', description: '4 interactive gamified mini-games testing spatial awareness, memory, and cognitive agility.' },
      { step: 'Round 4', name: 'Coding Assessment', duration: '45 mins', description: '2 programming problems.' },
      { step: 'Round 5', name: 'Technical & HR Interview', duration: '30 mins', description: 'Project questions, resume deep dive, and situational questions.' }
    ],
    reportedTopics: [
      'Pseudocode output prediction',
      'Memory and pattern game tests',
      'Core OOPs: Abstract Class vs Interface',
      'Database indexing and primary/foreign keys'
    ],
    pastQuestions: [
      {
        id: 'cap-q1',
        title: 'Reverse Words in a String',
        difficulty: 'Easy-Medium',
        category: 'Strings',
        question: 'Given an input string s, reverse the order of the words.',
        hint: 'Trim whitespace, split by spaces, filter empty tokens, reverse array of words and join.',
        source: 'Capgemini Coding Round'
      }
    ],
    hrQuestions: [
      'How do you stay motivated when assigned a repetitive or challenging assignment?'
    ],
    preparationTips: [
      'Practice game-based aptitude tests online (grid challenges, motion challenges, switch challenge).',
      'Revise basic programming syntax in C/Java/Python.'
    ],
    sources: [
      { label: 'Capgemini India Careers', url: 'https://www.capgemini.com/in-en/careers/' }
    ]
  }
];

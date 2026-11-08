export const SAMPLE_RESUMES = [
  {
    id: 'fullstack-dev',
    title: 'Full Stack React & Node.js Developer',
    subtitle: '2.5 Years Experience • Web Apps & APIs',
    targetRole: 'Full Stack Software Engineer',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Git', 'REST APIs', 'Docker'],
    programmingLanguages: ['JavaScript', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'Express.js', 'Tailwind CSS', 'Node.js'],
    tools: ['Git', 'Docker', 'Postman', 'VS Code', 'GitHub Actions', 'Vercel'],
    projects: [
      {
        title: 'Collaborative Workspace Platform',
        tech: 'React, Node.js, WebSockets, PostgreSQL',
        description: 'Engineered a real-time collaborative document editing tool serving 15,000+ monthly active users with sub-50ms synchronization latency.'
      },
      {
        title: 'E-Commerce Analytics Microservice',
        tech: 'Express.js, TypeScript, Docker, Redis',
        description: 'Developed an order ingestion microservice capable of processing 2,500 requests/sec with caching layer that reduced database loads by 42%.'
      }
    ],
    experience: [
      {
        role: 'Software Engineer',
        company: 'CloudNova Technologies',
        period: '2023 - Present',
        highlights: 'Architected reusable UI design system in React. Migrated legacy REST endpoints to TypeScript Express services with 99.9% uptime.'
      }
    ],
    education: {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'National Institute of Technology',
      year: '2023',
      cgpa: '8.8 / 10'
    },
    rawText: `Alex Morgan
Email: alex.morgan@example.com | Phone: +91 98765 43210
GitHub: github.com/alexmorgan-dev | LinkedIn: linkedin.com/in/alexmorgan

SUMMARY
Energetic Full Stack Developer with 2.5 years of experience building modern web applications using React, Node.js, TypeScript, and relational databases.

TECHNICAL SKILLS
- Programming Languages: JavaScript, TypeScript, SQL, HTML5, CSS3
- Frameworks & Libraries: React, Node.js, Express.js, Next.js, Tailwind CSS
- Databases & Cloud: PostgreSQL, MongoDB, Redis, Docker, Vercel
- Tools & Methodologies: Git, Postman, Jest, Agile Scrum, REST APIs

EXPERIENCE
Software Engineer | CloudNova Technologies (2023 - Present)
- Developed responsive client portals in React and TypeScript with modular components.
- Reduced API response times by 35% through query optimization and Redis caching.

PROJECTS
Collaborative Workspace Platform
- Real-time document collaboration using WebSockets, React, and PostgreSQL.
- Implemented JWT-based authentication and role-based access control (RBAC).

EDUCATION
B.Tech in Computer Science & Engineering | National Institute of Technology (2019 - 2023) - CGPA: 8.8/10`
  },
  {
    id: 'python-backend',
    title: 'Python Backend & Machine Learning Engineer',
    subtitle: 'Fresher / Early Career • Data & Distributed Systems',
    targetRole: 'Backend Engineer / SDE 1',
    skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Data Structures', 'Machine Learning', 'NumPy', 'Pandas'],
    programmingLanguages: ['Python', 'SQL', 'C++'],
    frameworks: ['FastAPI', 'Django', 'Flask', 'PyTorch', 'Scikit-Learn'],
    tools: ['Git', 'Docker', 'Linux', 'AWS S3', 'Jupyter', 'Postman'],
    projects: [
      {
        title: 'High-Throughput Fraud Detection Engine',
        tech: 'Python, FastAPI, Scikit-Learn, Redis',
        description: 'Trained random forest classifier on 500k financial transactions; wrapped in FastAPI endpoint achieving 15ms inference latency.'
      },
      {
        title: 'Distributed Asynchronous Task Worker',
        tech: 'Python, Celery, Redis, PostgreSQL',
        description: 'Implemented priority queue job scheduler handling asynchronous email pipelines and report generation without blocking web thread.'
      }
    ],
    experience: [
      {
        role: 'Backend Intern',
        company: 'FinTech Labs',
        period: 'Jan 2024 - June 2024',
        highlights: 'Implemented asynchronous database connection pooling in SQLAlchemy; wrote 80+ unit tests using pytest.'
      }
    ],
    education: {
      degree: 'B.E. in Information Technology',
      institution: 'Vellore Institute of Technology',
      year: '2024',
      cgpa: '9.1 / 10'
    },
    rawText: `Priya Sharma
Email: priya.sharma@example.com | Bengaluru, India
GitHub: github.com/priyasharma-code | Portfolio: priya.dev

OBJECTIVE
Passionate backend developer specializing in Python, FastAPI, distributed task queues, and data structures looking for an SDE 1 role.

TECHNICAL SKILLS
- Languages: Python, C++, SQL
- Frameworks: FastAPI, Django, Flask, PyTorch, Scikit-Learn, Celery
- Databases: PostgreSQL, SQLite, Redis
- Tools: Git, Docker, Linux, Postman, AWS EC2, PyTest

PROJECTS
High-Throughput Fraud Detection Engine
- Developed asynchronous REST API using Python and FastAPI.
- Integrated machine learning pipeline to classify fraudulent transactions with 94% precision.

Distributed Asynchronous Task Worker
- Built background worker with Celery and Redis to decouple heavy PDF batch rendering.

EDUCATION
B.E. in Information Technology | Vellore Institute of Technology (2020 - 2024) - CGPA: 9.1/10`
  },
  {
    id: 'java-sde',
    title: 'Java & Spring Boot Enterprise Developer',
    subtitle: '3 Years Experience • Microservices & Cloud',
    targetRole: 'Java SDE / Enterprise Backend Engineer',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Hibernate', 'MySQL', 'Kafka', 'Docker', 'Kubernetes', 'OOP', 'JUnit'],
    programmingLanguages: ['Java', 'SQL', 'Python'],
    frameworks: ['Spring Boot', 'Spring Cloud', 'Hibernate / JPA', 'JUnit 5'],
    tools: ['Kafka', 'Docker', 'Kubernetes', 'Maven', 'Git', 'Jenkins', 'Swagger'],
    projects: [
      {
        title: 'Omnichannel Payment Gateway Service',
        tech: 'Java 17, Spring Boot, Apache Kafka, MySQL',
        description: 'Architected event-driven microservice processing multi-currency checkouts with idempotency keys and zero payment duplication.'
      },
      {
        title: 'Distributed Inventory Reservation System',
        tech: 'Spring Cloud, Eureka, Redis, MySQL',
        description: 'Implemented two-phase commit reservation logic preventing race conditions during flash sale inventory spikes.'
      }
    ],
    experience: [
      {
        role: 'Associate Software Engineer',
        company: 'Virtusa Global',
        period: '2022 - Present',
        highlights: 'Developed secure REST endpoints adhering to OWASP standards. Configured CI/CD pipelines in Jenkins with SonarQube quality gates.'
      }
    ],
    education: {
      degree: 'B.Tech in Computer Science',
      institution: 'SRM Institute of Science and Technology',
      year: '2022',
      cgpa: '8.6 / 10'
    },
    rawText: `Rohan Gupta
Email: rohan.gupta@example.com | Hyderabad, India

SKILLS
- Languages: Java (8/11/17), SQL, C
- Technologies: Spring Boot, Spring Data JPA, Microservices, Hibernate
- Messaging & Database: Apache Kafka, MySQL, Redis
- Tools & Cloud: Docker, Kubernetes, Maven, Jenkins, Git

EXPERIENCE
Associate Software Engineer | Virtusa Global (2022 - Present)
- Built enterprise banking microservices with Spring Boot and Spring Cloud.
- Optimized JPA queries reducing database connection pool exhaustion by 50%.

EDUCATION
B.Tech in Computer Science | SRM Institute (2018 - 2022)`
  },
  {
    id: 'fresher-general',
    title: 'CS Graduate / Fresher (C++, DSA & Web Basics)',
    subtitle: '2025 Graduate • Strong DSA & Core CS Foundations',
    targetRole: 'Junior Software Engineer / Graduate Trainee',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Java', 'SQL', 'DBMS', 'Operating Systems', 'Computer Networks', 'HTML/CSS', 'Git'],
    programmingLanguages: ['C++', 'Java', 'C', 'SQL', 'JavaScript'],
    frameworks: ['Bootstrap', 'Express Basics'],
    tools: ['Git', 'VS Code', 'Linux Shell', 'MySQL Workbench'],
    projects: [
      {
        title: 'Student Performance & Attendance Portal',
        tech: 'C++, MySQL, Node.js',
        description: 'Full stack relational database application for tracking semester attendance, GPA rankings, and student analytics.'
      },
      {
        title: 'Shortest Path Route Finder Simulator',
        tech: 'C++, Graph Algorithms, SFML',
        description: 'Visual simulation of Dijkstra and A* pathfinding algorithms across custom obstacle grids.'
      }
    ],
    experience: [],
    education: {
      degree: 'B.E. in Computer Science',
      institution: 'Manipal Institute of Technology',
      year: '2025',
      cgpa: '8.4 / 10'
    },
    rawText: `Neha Kulkarni
Email: neha.kulkarni@example.com | Pune, India
LeetCode: 350+ Problems Solved | HackerRank 5-Star in C++

EDUCATION
B.E. Computer Engineering, Manipal Institute of Technology (2021 - 2025) - CGPA: 8.4

CORE SKILLS
- Programming: C++, Java, C, SQL
- CS Fundamentals: Data Structures & Algorithms, Object Oriented Programming, DBMS, Operating Systems, Computer Networks
- Web Basics: HTML5, CSS3, JavaScript, Git

PROJECTS
1. Shortest Path Route Finder Simulator (C++, Dijkstra, Graph Algorithms)
2. Student Database Management System (MySQL, Normalization, Stored Procedures)`
  }
];

export interface Skill {
  name: string;
  category: SkillCategory;
  description: string;
  relatedProjects: string[];
  relatedConcepts: string[];
}

export type SkillCategory =
  | 'Languages'
  | 'Java & Backend Engineering'
  | 'Frontend Development'
  | 'Databases'
  | 'APIs & Real-Time Systems'
  | 'Tools & Development Practices';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  responsibilities: string[];
  techStack: string[];
  features: { name: string; implemented: boolean }[];
  architectureComponents: { id: string; label: string; type: string; x: number; y: number }[];
  architectureConnections: { from: string; to: string; label: string }[];
  challenges: { title: string; description: string }[];
  repoUrl?: string;
  demoUrl?: string;
  hasInteractiveDemo?: boolean;
  accentColor: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  current: boolean;
  details: string;
}

export interface Certification {
  title: string;
  date: string;
  issuer: string;
}

export const personalInfo = {
  name: 'Ansh Manendra Tiwari',
  title: 'Software Engineer | Java & Spring Boot Developer',
  headline: 'Building Reliable Software, One System at a Time.',
  location: 'Nagpur, Maharashtra, India',
  email: 'tiwariansh2508@gmail.com',
  phone: '+91-8329417196',
  linkedin: 'https://www.linkedin.com/in/ansh-tiwari-718b27334',
  intro:
    'Software engineer focused on Java, Spring Boot, REST APIs, and full-stack development. I build systems that are structured, secure, and maintainable — from backend architecture to database design and real-time features.',
};

export const navItems = [
  { label: 'Home', path: '/', id: 'home' },
  { label: 'About', path: '/about', id: 'about' },
  { label: 'Skills', path: '/skills', id: 'skills' },
  { label: 'Experience', path: '/experience', id: 'experience' },
  { label: 'Projects', path: '/projects', id: 'projects' },
  { label: 'Education', path: '/education', id: 'education' },
  { label: 'Contact', path: '/contact', id: 'contact' },
];

export const skills: Skill[] = [
  {
    name: 'Java',
    category: 'Languages',
    description: 'Core language for backend development — OOP, Collections, exception handling, multithreading, file handling, and JDBC.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['OOP', 'Collections', 'Multithreading', 'Exception Handling', 'JDBC'],
  },
  {
    name: 'C++',
    category: 'Languages',
    description: 'Used for DSA practice and problem-solving, focusing on data structures and algorithms.',
    relatedProjects: [],
    relatedConcepts: ['DSA', 'Problem Solving'],
  },
  {
    name: 'SQL',
    category: 'Languages',
    description: 'Query language for relational databases — joins, subqueries, indexing, and database normalization.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['Normalization', 'Joins', 'Indexing'],
  },
  {
    name: 'Spring Boot',
    category: 'Java & Backend Engineering',
    description: 'Primary backend framework for building REST APIs, configuring security, and structuring production-grade Java applications.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['REST APIs', 'Spring Security', 'Dependency Injection', 'JWT'],
  },
  {
    name: 'Spring Security',
    category: 'Java & Backend Engineering',
    description: 'Authentication and authorization framework — JWT-based stateless auth, role-based access control, and endpoint security.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['JWT', 'Role-Based Authorization', 'Endpoint Security'],
  },
  {
    name: 'JWT Authentication',
    category: 'Java & Backend Engineering',
    description: 'Stateless token-based authentication for securing REST APIs with role-based claims.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['Spring Security', 'Stateless Auth', 'Token Verification'],
  },
  {
    name: 'REST APIs',
    category: 'Java & Backend Engineering',
    description: 'Designing and implementing RESTful endpoints with proper HTTP semantics, validation, and error handling.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['HTTP Methods', 'Spring Boot', 'Postman'],
  },
  {
    name: 'React',
    category: 'Frontend Development',
    description: 'Component-based frontend library for building interactive user interfaces with hooks and state management.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['Components', 'Hooks', 'State Management'],
  },
  {
    name: 'JavaScript',
    category: 'Frontend Development',
    description: 'Frontend interactivity, DOM manipulation, and application logic for web interfaces.',
    relatedProjects: ['chess-game', 'helping-hand'],
    relatedConcepts: ['DOM', 'ES6+', 'Async/Await'],
  },
  {
    name: 'HTML5',
    category: 'Frontend Development',
    description: 'Semantic markup for accessible, structured web content.',
    relatedProjects: ['chess-game'],
    relatedConcepts: ['Semantic HTML', 'Accessibility'],
  },
  {
    name: 'CSS3',
    category: 'Frontend Development',
    description: 'Styling, responsive layouts, flexbox, grid, and CSS animations.',
    relatedProjects: ['chess-game'],
    relatedConcepts: ['Flexbox', 'Grid', 'Animations', 'Responsive Design'],
  },
  {
    name: 'PostgreSQL',
    category: 'Databases',
    description: 'Primary relational database — schema design, normalization, queries, and spatial data with PostGIS.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['Normalization', 'PostGIS', 'Spatial Queries'],
  },
  {
    name: 'PostGIS',
    category: 'Databases',
    description: 'Spatial database extension for PostgreSQL enabling geographic queries, nearby-search, and location-based features.',
    relatedProjects: ['helping-hand'],
    relatedConcepts: ['Geospatial', 'Nearby Search', 'ST_Distance'],
  },
  {
    name: 'MySQL',
    category: 'Databases',
    description: 'Relational database management system used alongside PostgreSQL in various projects.',
    relatedProjects: [],
    relatedConcepts: ['Relational Database', 'SQL'],
  },
  {
    name: 'WebSocket / STOMP',
    category: 'APIs & Real-Time Systems',
    description: 'Real-time bidirectional communication for live notifications and location tracking using STOMP over WebSocket.',
    relatedProjects: ['helping-hand'],
    relatedConcepts: ['STOMP', 'Real-Time Updates', 'Live Tracking'],
  },
  {
    name: 'STOMP Protocol',
    category: 'APIs & Real-Time Systems',
    description: 'Messaging protocol over WebSocket for pub/sub-style real-time communication between client and server.',
    relatedProjects: ['helping-hand'],
    relatedConcepts: ['WebSocket', 'Pub/Sub', 'Messaging'],
  },
  {
    name: 'Git & GitHub',
    category: 'Tools & Development Practices',
    description: 'Version control, branching, pull requests, and collaborative development workflows.',
    relatedProjects: ['helping-hand', 'online-examination', 'chess-game'],
    relatedConcepts: ['Version Control', 'Branching', 'Pull Requests'],
  },
  {
    name: 'Maven',
    category: 'Tools & Development Practices',
    description: 'Build automation and dependency management for Java/Spring Boot projects.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['Build Tool', 'Dependency Management', 'pom.xml'],
  },
  {
    name: 'Postman',
    category: 'Tools & Development Practices',
    description: 'API testing and development tool for validating REST endpoints, authentication, and request/response cycles.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['API Testing', 'Collections', 'Environment Variables'],
  },
  {
    name: 'IntelliJ IDEA',
    category: 'Tools & Development Practices',
    description: 'Primary IDE for Java and Spring Boot development with refactoring and debugging tools.',
    relatedProjects: ['helping-hand', 'online-examination'],
    relatedConcepts: ['IDE', 'Debugging', 'Refactoring'],
  },
  {
    name: 'VS Code',
    category: 'Tools & Development Practices',
    description: 'Code editor for frontend development with React, JavaScript, and CSS.',
    relatedProjects: ['helping-hand', 'chess-game'],
    relatedConcepts: ['Editor', 'Extensions', 'Integrated Terminal'],
  },
];

export const skillCategories: { name: SkillCategory; icon: string }[] = [
  { name: 'Languages', icon: 'Code2' },
  { name: 'Java & Backend Engineering', icon: 'Server' },
  { name: 'Frontend Development', icon: 'Layout' },
  { name: 'Databases', icon: 'Database' },
  { name: 'APIs & Real-Time Systems', icon: 'Radio' },
  { name: 'Tools & Development Practices', icon: 'Wrench' },
];

export const projects: Project[] = [
  {
    slug: 'helping-hand',
    name: 'Helping Hand',
    tagline: 'Community assistance & emergency-help platform with real-time location features',
    description:
      'A full-stack community assistance platform that connects people needing help with nearby volunteers. Features map-based requests, privacy-preserving location access, secure authentication, real-time notifications, and live location tracking.',
    problem:
      'People in need of urgent assistance — medical, logistical, or community help — often cannot find nearby volunteers quickly. Helping Hand bridges this gap by enabling location-aware help requests and real-time coordination.',
    responsibilities: [
      'Designed and implemented the Spring Boot backend with REST APIs',
      'Built JWT-based authentication and role-based authorization',
      'Integrated PostGIS for nearby-request discovery and geospatial queries',
      'Implemented WebSocket/STOMP for real-time notifications and live tracking',
      'Developed the React frontend with map-based request visualization',
      'Designed privacy-preserving location handling to protect user data',
    ],
    techStack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'React', 'JavaScript', 'PostgreSQL', 'PostGIS', 'WebSocket', 'STOMP', 'Maven'],
    features: [
      { name: 'User registration & authentication', implemented: true },
      { name: 'Role-based authorization', implemented: true },
      { name: 'Map-based help request creation', implemented: true },
      { name: 'Nearby help discovery (PostGIS)', implemented: true },
      { name: 'Privacy-preserving location access', implemented: true },
      { name: 'Real-time notifications (WebSocket/STOMP)', implemented: true },
      { name: 'Live location tracking', implemented: true },
      { name: 'REST API for all CRUD operations', implemented: true },
      { name: 'Request status management', implemented: true },
    ],
    architectureComponents: [
      { id: 'client', label: 'React Frontend', type: 'frontend', x: 50, y: 50 },
      { id: 'api', label: 'Spring Boot REST API', type: 'backend', x: 300, y: 50 },
      { id: 'auth', label: 'JWT Auth Filter', type: 'security', x: 300, y: 180 },
      { id: 'ws', label: 'WebSocket Gateway', type: 'realtime', x: 300, y: 310 },
      { id: 'db', label: 'PostgreSQL + PostGIS', type: 'database', x: 550, y: 120 },
      { id: 'geo', label: 'Geospatial Query Engine', type: 'service', x: 550, y: 250 },
    ],
    architectureConnections: [
      { from: 'client', to: 'api', label: 'HTTP / REST' },
      { from: 'client', to: 'ws', label: 'WebSocket / STOMP' },
      { from: 'api', to: 'auth', label: 'intercept' },
      { from: 'api', to: 'db', label: 'JDBC' },
      { from: 'api', to: 'geo', label: 'spatial query' },
      { from: 'ws', to: 'client', label: 'push updates' },
    ],
    challenges: [
      {
        title: 'Privacy-Preserving Location',
        description:
          'Users needed to share location for nearby discovery without exposing exact coordinates. Implemented approximate location handling that provides enough precision for matching while protecting user privacy.',
      },
      {
        title: 'Real-Time Coordination',
        description:
          'Built WebSocket/STOMP infrastructure for live notifications and location tracking, ensuring volunteers receive request updates instantly without polling.',
      },
      {
        title: 'Geospatial Query Performance',
        description:
          'Leveraged PostGIS spatial indexing for efficient nearby-search queries, enabling fast discovery of help requests within a specified radius.',
      },
    ],
    accentColor: '#3563ff',
  },
  {
    slug: 'online-examination',
    name: 'Online Examination Platform',
    tagline: 'Secure exam system with admin/student roles and automatic result generation',
    description:
      'A full-stack examination platform built with Java 21 and Spring Boot. Supports admin and student roles, exam creation, question management, answer submission, and automatic result generation with JWT-secured REST APIs.',
    problem:
      'Educational institutions need a reliable, secure platform for conducting online exams with role-based access, automated grading, and question management — without manual intervention for result calculation.',
    responsibilities: [
      'Built the Spring Boot REST API with Java 21',
      'Implemented admin and student role separation with Spring Security',
      'Designed exam creation and question management endpoints',
      'Built answer submission and automatic result calculation logic',
      'Integrated PostgreSQL for data persistence',
      'Developed the React frontend for both admin and student interfaces',
    ],
    techStack: ['Java 21', 'Spring Boot', 'Spring Security', 'JWT', 'React', 'PostgreSQL', 'REST APIs', 'Maven'],
    features: [
      { name: 'Admin & student role separation', implemented: true },
      { name: 'Exam creation (admin)', implemented: true },
      { name: 'Question management (admin)', implemented: true },
      { name: 'Exam listing & taking (student)', implemented: true },
      { name: 'Answer submission', implemented: true },
      { name: 'Automatic result generation', implemented: true },
      { name: 'JWT-secured endpoints', implemented: true },
      { name: 'Result viewing for students', implemented: true },
    ],
    architectureComponents: [
      { id: 'admin', label: 'Admin UI (React)', type: 'frontend', x: 50, y: 50 },
      { id: 'student', label: 'Student UI (React)', type: 'frontend', x: 50, y: 180 },
      { id: 'api', label: 'Spring Boot API', type: 'backend', x: 300, y: 115 },
      { id: 'security', label: 'JWT + Role Filter', type: 'security', x: 300, y: 250 },
      { id: 'db', label: 'PostgreSQL', type: 'database', x: 550, y: 115 },
      { id: 'grading', label: 'Auto-Grading Engine', type: 'service', x: 550, y: 250 },
    ],
    architectureConnections: [
      { from: 'admin', to: 'api', label: 'manage exams' },
      { from: 'student', to: 'api', label: 'take exam' },
      { from: 'api', to: 'security', label: 'auth check' },
      { from: 'api', to: 'db', label: 'persist' },
      { from: 'api', to: 'grading', label: 'calculate' },
      { from: 'grading', to: 'db', label: 'store results' },
    ],
    challenges: [
      {
        title: 'Role-Based Access Control',
        description:
          'Admin and student roles required distinct permissions — admins manage exams while students only take them. Implemented with Spring Security role-based authorization on every endpoint.',
      },
      {
        title: 'Automatic Result Generation',
        description:
          'Built server-side grading logic that evaluates submitted answers against correct ones, calculates scores, and stores results — eliminating manual grading.',
      },
      {
        title: 'Exam Integrity',
        description:
          'JWT-secured endpoints ensure only authenticated students can access exams, and only their own submissions and results are visible to them.',
      },
    ],
    accentColor: '#16a34a',
  },
  {
    slug: 'chess-game',
    name: 'Chess Game',
    tagline: 'Full chess engine with legal move validation and complete rule set',
    description:
      'A browser-based chess game built with HTML, CSS, and JavaScript. Implements complete chess rules including legal move validation, castling, en passant, pawn promotion, and check/checkmate detection with move highlighting and responsive gameplay.',
    problem:
      'Building a complete chess game requires implementing every rule — from basic piece movement to special moves like castling, en passant, and pawn promotion, plus full check and checkmate detection.',
    responsibilities: [
      'Implemented all piece movement rules (pawn, knight, bishop, rook, queen, king)',
      'Built legal move validation filtering out moves that leave the king in check',
      'Implemented special moves: castling, en passant, pawn promotion',
      'Built check and checkmate detection logic',
      'Designed move highlighting and interactive board UI',
      'Made the game responsive across screen sizes',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
      { name: 'All piece movement rules', implemented: true },
      { name: 'Legal move highlighting', implemented: true },
      { name: 'Castling (kingside & queenside)', implemented: true },
      { name: 'En passant', implemented: true },
      { name: 'Pawn promotion', implemented: true },
      { name: 'Check detection', implemented: true },
      { name: 'Checkmate detection', implemented: true },
      { name: 'Responsive gameplay', implemented: true },
      { name: 'Move history', implemented: true },
    ],
    architectureComponents: [
      { id: 'ui', label: 'Board UI (HTML/CSS)', type: 'frontend', x: 50, y: 80 },
      { id: 'engine', label: 'Chess Engine (JS)', type: 'backend', x: 300, y: 80 },
      { id: 'moves', label: 'Move Validator', type: 'service', x: 550, y: 30 },
      { id: 'rules', label: 'Special Rules', type: 'service', x: 550, y: 140 },
      { id: 'state', label: 'Game State', type: 'database', x: 550, y: 250 },
    ],
    architectureConnections: [
      { from: 'ui', to: 'engine', label: 'user input' },
      { from: 'engine', to: 'moves', label: 'validate' },
      { from: 'engine', to: 'rules', label: 'check special' },
      { from: 'engine', to: 'state', label: 'update' },
      { from: 'state', to: 'ui', label: 'render' },
    ],
    challenges: [
      {
        title: 'Complete Rule Implementation',
        description:
          'Chess has many edge cases — castling conditions, en passant timing, pawn promotion choice. Each required careful implementation and testing against known game scenarios.',
      },
      {
        title: 'Check Detection Across All Moves',
        description:
          'A move is only legal if it does not leave your own king in check. This required simulating each candidate move and checking the resulting board state for king safety.',
      },
      {
        title: 'Checkmate vs Stalemate',
        description:
          'Distinguishing checkmate (king in check, no legal moves) from stalemate (no legal moves, king not in check) required precise game-state evaluation.',
      },
    ],
    accentColor: '#d97706',
    hasInteractiveDemo: true,
  },
];

export const experiences: Experience[] = [
  {
    role: 'Web Developer Intern',
    company: 'Pranjal Technologies Pvt. Ltd.',
    period: 'June 2026 – Present',
    current: true,
    description:
      'Full-stack development work on Helping Hand, a community assistance and emergency-help platform.',
    highlights: [
      'Developing full-stack features on the Helping Hand platform',
      'Working with Java, Spring Boot, React, and PostgreSQL',
      'Implementing REST APIs, JWT authentication, and real-time WebSocket features',
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'WebSocket', 'JWT'],
  },
];

export const educationList: Education[] = [
  {
    degree: 'MCA — Master of Computer Applications',
    institution: 'S. B. Jain Institute of Technology, Management & Research',
    period: '2025 – 2027',
    current: true,
    details: 'Pursuing postgraduate degree in computer applications.',
  },
  {
    degree: 'BCA — Bachelor of Computer Applications',
    institution: 'St. Francis De Sales College',
    period: '2022 – 2025',
    current: false,
    details: 'Completed undergraduate degree with CGPA 7.23/10.',
  },
];

export const certifications: Certification[] = [
  {
    title: 'Introduction to Full-Stack Web Development',
    date: 'April 2026',
    issuer: 'Simplilearn SkillUp',
  },
  {
    title: 'Introduction to SQL',
    date: 'March 2026',
    issuer: 'Simplilearn SkillUp',
  },
  {
    title: 'Introduction to Front-End Development',
    date: 'November 2025',
    issuer: 'Simplilearn SkillUp',
  },
];

export const achievements = [
  'College-level Kabaddi participation',
  'College-level Cricket participation',
  'Hackathon participation',
];

export const techStrip = ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs', 'JWT', 'WebSocket', 'PostGIS'];

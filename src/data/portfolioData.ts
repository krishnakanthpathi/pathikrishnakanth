export type ProjectCategory = 'rust-ai' | 'mcp' | 'fullstack';

export interface ProjectItem {
  id: string;
  repoName: string;
  name: string;
  kicker: string;
  category: ProjectCategory;
  featured: boolean;
  language: string;
  summary: string;
  architecture: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  packageBadge?: string;
  packageUrl?: string;
  starsFallback: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'work' | 'internship' | 'education';
  highlights: string[];
  stack: string[];
}

export interface CredentialItem {
  id: string;
  label: string;
  metric: string;
  detail: string;
  issuer: string;
  url?: string;
}

export interface StackDomain {
  title: string;
  code: string;
  items: string[];
}

export const PROFILE = {
  name: 'Krishna Kanth Pathi',
  handle: 'krishnakanthpathi',
  role: 'Full-Stack & AI Systems Engineer',
  headline: 'I build fast local AI tools, MCP servers, and full-stack web apps.',
  email: 'krishnakanthpathi@gmail.com',
  github: 'https://github.com/krishnakanthpathi',
  linkedin: 'https://www.linkedin.com/in/krishna-kanth-166b31252/',
  leetcode: 'https://leetcode.com/u/krishnakanthpathi/',
  codeforces: 'https://codeforces.com/profile/krishnakanthpathi',
  pypiLmem: 'https://pypi.org/project/lmem/',
  installCmd: 'pip install lmem',
  stats: [
    { label: 'Public Repos', value: '47+' },
    { label: 'LeetCode Knight', value: '1,300+ (Top 5%)' },
    { label: 'B.Tech CSE CGPA', value: '8.80' },
    { label: 'NPTEL Java DSA', value: 'Top 1%' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'lightmem',
    repoName: 'lightmem',
    name: 'LightMem',
    kicker: 'Agent Memory',
    category: 'rust-ai',
    featured: true,
    language: 'Rust',
    summary:
      'Local AI agent memory engine and MCP server in Rust with SQLite FTS5 search, ONNX embeddings, and extractive QA.',
    architecture: [
      'Sub-5ms CLI lookup using single-file SQLite WAL, FTS5 BM25, and vector ranking',
      'Runs local ONNX embeddings and QA models offline or connects to Ollama',
      'Supports file attachments, wikilink graphs, and installs via pip install lmem',
    ],
    stack: ['Rust', 'SQLite', 'ONNX', 'MCP', 'PyPI'],
    githubUrl: 'https://github.com/krishnakanthpathi/lightmem',
    liveUrl: 'https://lightmem.vercel.app',
    packageBadge: 'pip install lmem',
    packageUrl: 'https://pypi.org/project/lmem/',
    starsFallback: 1,
  },
  {
    id: 'lightstt',
    repoName: 'lightstt',
    name: 'LightSTT',
    kicker: 'Speech-to-Text',
    category: 'rust-ai',
    featured: true,
    language: 'Rust',
    summary:
      'Fast Rust speech-to-text CLI and daemon supporting live mic capture, Groq/OpenAI/Phonon-2 ASR, and local cleanup.',
    architecture: [
      'Captures and downmixes 16kHz microphone audio cleanly with Rust CPAL',
      'Works with Groq Whisper, OpenAI, or local Phonon-2 models under 300ms',
      'Runs as a CLI pipe, REST daemon, or JSON tool for agents',
    ],
    stack: ['Rust', 'Audio', 'Groq', 'Ollama', 'REST'],
    githubUrl: 'https://github.com/krishnakanthpathi/lightstt',
    starsFallback: 0,
  },
  {
    id: 'maxi',
    repoName: 'maxi',
    name: 'Maxi',
    kicker: 'Voice Assistant',
    category: 'rust-ai',
    featured: true,
    language: 'Python',
    summary:
      'Voice-controlled desktop assistant with a native macOS floating HUD, LLM backend, and MCP tool support.',
    architecture: [
      'Hold Right Option to speak, release to send—no always-on wake word needed',
      'Ships as a universal macOS DMG with a SwiftUI HUD and isolated Python daemon',
      'Connects to any MCP server to run real actions across your desktop',
    ],
    stack: ['Python', 'SwiftUI', 'macOS', 'MCP', 'Whisper'],
    githubUrl: 'https://github.com/krishnakanthpathi/maxi',
    liveUrl: 'https://maxi-sigma.vercel.app',
    starsFallback: 1,
  },
  {
    id: 'native-assistant-mcp',
    repoName: 'native-assistant-mcp',
    name: 'Native Assistant MCP',
    kicker: 'OS Automation',
    category: 'mcp',
    featured: true,
    language: 'Python',
    summary:
      'MCP server giving AI agents 49+ native OS controls for windows, Spaces, Finder, clipboard, and input.',
    architecture: [
      'Switches and inspects macOS Desktop Spaces via native system bindings',
      'Moves, resizes, and focuses windows using CoreGraphics and Accessibility APIs',
      'Reads and writes text, images, and file paths directly to the system clipboard',
    ],
    stack: ['Python', 'FastMCP', 'macOS APIs', 'Windows'],
    githubUrl: 'https://github.com/krishnakanthpathi/native-assistant-mcp',
    starsFallback: 1,
  },
  {
    id: 'localshare',
    repoName: 'localshare',
    name: 'LocalShare 2.1',
    kicker: 'P2P File Transfer',
    category: 'fullstack',
    featured: true,
    language: 'Python',
    summary:
      'Encrypted peer-to-peer file and folder transfer over LAN and Tailscale using parallel TCP sockets.',
    architecture: [
      'Streams compressed data chunks encrypted end-to-end with AES-256-GCM',
      'Splits transfers across 4 parallel TCP sockets for maximum local throughput',
      'Auto-discovers devices on LAN via UDP broadcast or across Tailscale',
    ],
    stack: ['Python', 'TCP/UDP', 'AES-256-GCM', 'Tailscale', 'React'],
    githubUrl: 'https://github.com/krishnakanthpathi/localshare',
    starsFallback: 0,
  },
  {
    id: 'queryport',
    repoName: 'QueryPort',
    name: 'QueryPort',
    kicker: 'Headless CMS',
    category: 'fullstack',
    featured: true,
    language: 'TypeScript',
    summary:
      'Headless developer portfolio CMS that manages projects, skills, and coding leaderboards through a REST API.',
    architecture: [
      'TypeScript + Express + MongoDB backend with Email and Google OAuth login',
      'Weekly background sync for LeetCode, Codeforces, HackerRank, and CGPA stats',
      'Public developer URLs and filtered CSV exports up to 1,000 rows',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/krishnakanthpathi/QueryPort',
    liveUrl: 'https://query-port-brown.vercel.app/',
    starsFallback: 1,
  },
  {
    id: 'memorize',
    repoName: 'memorize',
    name: 'Memorize',
    kicker: 'Knowledge Base',
    category: 'rust-ai',
    featured: true,
    language: 'TypeScript',
    summary:
      'Markdown notes workspace combining a React 19 UI, FastAPI backend, and MCP server with semantic search.',
    architecture: [
      'Combines a FastMCP server, FastAPI REST service, and React 19 Vite frontend',
      'Indexes notes and media using hybrid BM25 keyword and vector search',
    ],
    stack: ['TypeScript', 'React 19', 'FastAPI', 'FastMCP'],
    githubUrl: 'https://github.com/krishnakanthpathi/memorize',
    starsFallback: 1,
  },
  {
    id: 'chromepilot',
    repoName: 'ChromePilot',
    name: 'ChromePilot',
    kicker: 'Chrome Extension',
    category: 'fullstack',
    featured: true,
    language: 'TypeScript',
    summary:
      'Chrome extension adding a Cmd+K command palette and inline AI ghost-text autocomplete to LeetCode.',
    architecture: [
      'Predicts next lines directly inside the Monaco editor on comment or 5s idle',
      'Press Tab to accept ghost suggestions or Cmd+K to insert code templates',
    ],
    stack: ['TypeScript', 'Chrome Extension', 'Monaco'],
    githubUrl: 'https://github.com/krishnakanthpathi/ChromePilot',
    starsFallback: 0,
  },
  {
    id: 'whatsapp-mcp',
    repoName: 'whatsapp-mcp',
    name: 'WhatsApp MCP',
    kicker: 'Messaging Bridge',
    category: 'mcp',
    featured: true,
    language: 'Python',
    summary:
      'MCP server letting AI agents verify numbers, resolve contact aliases, and send WhatsApp messages or files.',
    architecture: [
      'Pairs once via QR code or phone code and persists the session in SQLite',
      'Maps safe contact aliases to prevent sending messages to wrong numbers',
    ],
    stack: ['Python', 'FastMCP', 'whatsmeow', 'SQLite'],
    githubUrl: 'https://github.com/krishnakanthpathi/whatsapp-mcp',
    starsFallback: 0,
  },
  {
    id: 'discord-bot-mcp',
    repoName: 'discord-bot-mcp',
    name: 'Discord Bot MCP',
    kicker: 'Discord Automation',
    category: 'mcp',
    featured: false,
    language: 'Python',
    summary:
      'MCP server for managing Discord servers, channels, messages, reactions, and FFmpeg voice audio.',
    architecture: [
      'Creates channels/categories, sends rich embeds, and streams audio in voice channels',
    ],
    stack: ['Python', 'FastMCP', 'discord.py', 'FFmpeg'],
    githubUrl: 'https://github.com/krishnakanthpathi/discord-bot-mcp',
    starsFallback: 0,
  },
  {
    id: 'autofill',
    repoName: 'autofill',
    name: 'Voice Autofill',
    kicker: 'Desktop Utility',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'Floating hotkey launcher that uses offline voice search and LightMem to paste saved facts into any app.',
    architecture: [
      'Captures active window focus, transcribes speech offline, and pastes exact answers',
    ],
    stack: ['Python', 'LightMem', 'Offline STT'],
    githubUrl: 'https://github.com/krishnakanthpathi/autofill',
    starsFallback: 0,
  },
  {
    id: 'codebuddy',
    repoName: 'CodeBuddy',
    name: 'CodeBuddy',
    kicker: 'Code Snippets',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Web app to save reusable code templates, explain solution intuition, and share approaches clearly.',
    architecture: ['TypeScript backend and React frontend deployed on Vercel'],
    stack: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/krishnakanthpathi/CodeBuddy',
    liveUrl: 'https://code-buddy-mu.vercel.app/',
    starsFallback: 0,
  },
  {
    id: 'parsepoint',
    repoName: 'ParsePoint',
    name: 'ParsePoint',
    kicker: 'Finance Parser',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Full-stack tool that parses bank statements into clear spending categories and charts.',
    architecture: ['Decoupled TypeScript parser service and Vercel dashboard'],
    stack: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/krishnakanthpathi/ParsePoint',
    liveUrl: 'https://parse-point.vercel.app',
    starsFallback: 0,
  },
  {
    id: 'resume-fit-tracker',
    repoName: 'resume-fit-tracker',
    name: 'Resume Fit Tracker',
    kicker: 'NLP Matcher',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'FastAPI tool scoring how well a resume matches a job description using embeddings and SpaCy.',
    architecture: ['Uses MiniLM sentence embeddings and SpaCy to highlight missing skills'],
    stack: ['Python', 'FastAPI', 'SpaCy', 'MiniLM'],
    githubUrl: 'https://github.com/krishnakanthpathi/resume-fit-tracker',
    starsFallback: 0,
  },
  {
    id: 'passphotomaker',
    repoName: 'passphotomaker',
    name: 'PassPhotoMaker',
    kicker: 'Photo Tool',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Browser-based passport photo cropper and print-sheet builder with zero server uploads.',
    architecture: ['Runs 100% client-side using HTML5 Canvas and React'],
    stack: ['TypeScript', 'React', 'Canvas'],
    githubUrl: 'https://github.com/krishnakanthpathi/passphotomaker',
    liveUrl: 'https://passphotomaker.vercel.app',
    starsFallback: 0,
  },
  {
    id: 'cp-programs',
    repoName: 'cp-programs',
    name: 'CP Programs',
    kicker: 'DSA Archive',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'Collection of competitive programming solutions across graphs, DP, trees, and greedy problems.',
    architecture: ['Patterns and solutions backing 1,300+ LeetCode and Codeforces problems'],
    stack: ['Python', 'C++', 'Java', 'DSA'],
    githubUrl: 'https://github.com/krishnakanthpathi/cp-programs',
    starsFallback: 1,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'cartrade',
    role: 'Junior Engineer — Full Stack Developer',
    company: 'CarTrade Tech Limited',
    location: 'On-site',
    period: 'Dec 2025 — May 2026',
    type: 'work',
    highlights: [
      'Built Vue.js user interfaces backed by modular PHP microservices.',
      'Optimized MongoDB and MySQLi queries, cutting retrieval times by 35% and earning a promotion from Band B4 to B5.',
    ],
    stack: ['Vue.js', 'PHP', 'MongoDB', 'MySQLi'],
  },
  {
    id: 'turtil',
    role: 'AI Intern (Backend)',
    company: 'turtil (Teachbricks Pvt Ltd)',
    location: 'Summer Internship',
    period: 'May 2025 — Jul 2025',
    type: 'internship',
    highlights: [
      'Built backend AI services and API endpoints during a paid 6-week summer internship.',
    ],
    stack: ['Python', 'FastAPI', 'LLMs'],
  },
  {
    id: 'pragati',
    role: 'B.Tech in Computer Science & Engineering',
    company: 'Pragati Engineering College',
    location: 'Surampalem',
    period: '2022 — 2026',
    type: 'education',
    highlights: [
      'CGPA 8.80 / 10.0 across OS, Databases, Networks, and Algorithms.',
      'GDG Algorithms & Data Structures Lead—organized workshops and coding contests.',
    ],
    stack: ['CGPA 8.80', 'GDG DSA Lead'],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'leetcode',
    label: 'Competitive Coding',
    metric: 'LeetCode Knight',
    detail: '1,300+ problems solved · Top 5% in weekly contests',
    issuer: 'LeetCode',
    url: 'https://leetcode.com/u/krishnakanthpathi/',
  },
  {
    id: 'nptel',
    label: 'National Merit',
    metric: 'Top 1% National',
    detail: '87% Elite Topper in Java Data Structures & Algorithms',
    issuer: 'IIT Kharagpur · NPTEL',
  },
  {
    id: 'servicenow-cad',
    label: 'Certification',
    metric: 'ServiceNow CAD',
    detail: 'Certified Application Developer (ID 27309512)',
    issuer: 'ServiceNow',
  },
  {
    id: 'servicenow-csa',
    label: 'Certification',
    metric: 'ServiceNow CSA',
    detail: 'Certified System Administrator (ID 27319676)',
    issuer: 'ServiceNow',
  },
  {
    id: 'codeforces',
    label: 'Contests',
    metric: 'Codeforces & 1st Prize',
    detail: 'Active Codeforces contestant · 1st Prize in Crack the Jumble Code',
    issuer: 'Codeforces',
    url: 'https://codeforces.com/profile/krishnakanthpathi',
  },
  {
    id: 'pypi-crates',
    label: 'Open Source',
    metric: 'PyPI · lmem',
    detail: 'Published cross-platform binaries on PyPI and Crates.io',
    issuer: 'PyPI & GitHub',
    url: 'https://pypi.org/project/lmem/',
  },
];

export const STACK_DOMAINS: StackDomain[] = [
  {
    title: 'Core Systems',
    code: '01',
    items: ['Rust', 'Python', 'C++', 'Java', 'SQL', 'Swift'],
  },
  {
    title: 'AI & Runtime',
    code: '02',
    items: ['FastMCP', 'ONNX', 'FTS5 BM25', 'Vector Search', 'Ollama'],
  },
  {
    title: 'Full-Stack Web',
    code: '03',
    items: ['TypeScript', 'React', 'Vue.js', 'Node.js', 'FastAPI', 'PHP', 'Tailwind'],
  },
  {
    title: 'Storage & Infra',
    code: '04',
    items: ['SQLite', 'MongoDB', 'MySQL', 'Docker', 'Sockets', 'Linux / macOS'],
  },
];

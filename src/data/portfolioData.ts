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
  headline: 'Building deterministic local AI engines, MCP OS servers, and high-throughput web platforms.',
  location: 'Hyderabad / Bengaluru / Pune, India',
  availability: 'Available for Full-Time SWE & AI Systems Roles',
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
    kicker: '01 // AGENT MEMORY ENGINE',
    category: 'rust-ai',
    featured: true,
    language: 'Rust',
    summary:
      'Pure-Rust local persistent memory engine and MCP server combining SQLite WAL, FTS5 BM25, ONNX vector search, extractive QA, and immutable multimodal BLOBs.',
    architecture: [
      'Sub-5ms cold-start CLI execution with single-file SQLite WAL + FTS5 BM25 + RRF vector fusion',
      'Local ONNX fastembed embeddings & SQuAD-2.0 extractive QA reranking alongside Ollama backends',
      'SHA-256 immutable multimodal attachments, Obsidian [[wikilinks]] graph, and published PyPI/Crates packages',
    ],
    stack: ['Rust', 'SQLite WAL', 'FTS5 BM25', 'ONNX Runtime', 'MCP', 'PyPI'],
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
    kicker: '02 // SPEECH-TO-TEXT ENGINE',
    category: 'rust-ai',
    featured: true,
    language: 'Rust',
    summary:
      'Zero-bloat pure-Rust Speech-to-Text engine and monochrome CLI/daemon supporting CPAL mic capture, Groq/OpenAI/Phonon-2 ASR, and Ollama transcript normalization.',
    architecture: [
      'Real-time 16kHz audio ingestion and downmixing via Rust CPAL audio stream pipeline',
      'Pluggable ASR providers (Groq Whisper Turbo, OpenAI, local Phonon-2 HTTP) with <300ms normalization',
      'Multi-surface output: CLI stdout, background REST daemon (lstt serve), and agent JSON mode',
    ],
    stack: ['Rust', 'CPAL', 'Groq LPU', 'Phonon-2', 'Ollama', 'REST'],
    githubUrl: 'https://github.com/krishnakanthpathi/lightstt',
    starsFallback: 0,
  },
  {
    id: 'maxi',
    repoName: 'maxi',
    name: 'Maxi',
    kicker: '03 // VOICE DESKTOP ASSISTANT',
    category: 'rust-ai',
    featured: true,
    language: 'Python',
    summary:
      'Voice-controlled ambient desktop assistant (v0.3.0-beta.1) pairing a native macOS floating Liquid Glass HUD with OpenAI-compatible LLMs and MCP tool execution.',
    architecture: [
      'Hold Right Option (⌥) push-to-talk trigger with double-tap hands-free lock and zero wake-word overhead',
      'Universal macOS DMG installer bundling SwiftUI floating HUD and isolated uv Python daemon',
      'Executes real OS and workspace tools across connected Model Context Protocol (MCP) servers',
    ],
    stack: ['Python', 'SwiftUI', 'macOS HUD', 'MCP', 'Whisper', 'OpenAI API'],
    githubUrl: 'https://github.com/krishnakanthpathi/maxi',
    liveUrl: 'https://maxi-sigma.vercel.app',
    starsFallback: 1,
  },
  {
    id: 'native-assistant-mcp',
    repoName: 'native-assistant-mcp',
    name: 'Native Assistant MCP',
    kicker: '04 // OS AUTOMATION SERVER',
    category: 'mcp',
    featured: true,
    language: 'Python',
    summary:
      'Cross-platform FastMCP workstation server exposing 49+ native macOS and Windows OS controls—windows, Spaces, Finder, clipboard, and input—to LLM agents.',
    architecture: [
      'Mission Control desktop Space navigation via macOS SkyLight private C-framework bindings',
      'Accessibility Tree (AXUIElement) and CoreGraphics window geometry, focus, and resize primitives',
      'Multimodal clipboard supporting UTF-8 text, Base64 PNG images, RTF, and Finder file URLs',
    ],
    stack: ['Python', 'FastMCP', 'CoreGraphics', 'AXUIElement', 'SkyLight', 'AppleScript'],
    githubUrl: 'https://github.com/krishnakanthpathi/native-assistant-mcp',
    starsFallback: 1,
  },
  {
    id: 'localshare',
    repoName: 'localshare',
    name: 'LocalShare 2.1',
    kicker: '05 // ENCRYPTED MESH TRANSFER',
    category: 'fullstack',
    featured: true,
    language: 'Python',
    summary:
      'High-speed encrypted peer-to-peer file and folder transfer protocol over raw TCP with AES-256-GCM framing, 4x parallel sockets, and Tailscale peer resolution.',
    architecture: [
      'Custom length-prefixed binary TCP framing paired with chunked AES-256-GCM encryption & streaming gzip',
      '4x parallel socket multiplexing with asynchronous out-of-band ACK synchronization',
      'Zero-config UDP LAN beacon discovery, real-time Tailscale mesh resolution, and FastMCP agent tools',
    ],
    stack: ['Python', 'TCP/UDP Sockets', 'AES-256-GCM', 'Tailscale', 'FastMCP', 'React'],
    githubUrl: 'https://github.com/krishnakanthpathi/localshare',
    starsFallback: 0,
  },
  {
    id: 'queryport',
    repoName: 'QueryPort',
    name: 'QueryPort',
    kicker: '06 // HEADLESS PORTFOLIO CMS',
    category: 'fullstack',
    featured: true,
    language: 'TypeScript',
    summary:
      'Decoupled MERN + TypeScript headless portfolio platform treating projects, skills, certifications, and competitive coding leaderboards as a versioned REST API.',
    architecture: [
      'Type-safe MVC Express + MongoDB backend with JWT and Google OAuth authentication',
      'Automated Sunday 03:00 AM daemon syncing LeetCode, Codeforces, HackerRank, and CGPA metrics',
      'Filterable multi-entity CSV report exporter (up to 1,000 rows) and public /u/:username endpoints',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'OAuth'],
    githubUrl: 'https://github.com/krishnakanthpathi/QueryPort',
    liveUrl: 'https://query-port-brown.vercel.app/',
    starsFallback: 1,
  },
  {
    id: 'memorize',
    repoName: 'memorize',
    name: 'Memorize',
    kicker: '07 // MULTIMODAL RAG WORKSPACE',
    category: 'rust-ai',
    featured: true,
    language: 'TypeScript',
    summary:
      'Personal knowledge base MCP server, FastAPI REST backend, and React 19 Markdown workspace featuring multimodal semantic RAG and hybrid BM25 search.',
    architecture: [
      'Tri-layer architecture: FastMCP server + FastAPI REST engine (port 7777) + React 19 Vite client',
      'Hybrid semantic vector + BM25 lexical relevance pipeline for notes and attachments',
      'Modular toolset for atomic store, update, hybrid fetch, and category discovery',
    ],
    stack: ['TypeScript', 'React 19', 'FastAPI', 'FastMCP', 'RAG', 'BM25'],
    githubUrl: 'https://github.com/krishnakanthpathi/memorize',
    starsFallback: 1,
  },
  {
    id: 'chromepilot',
    repoName: 'ChromePilot',
    name: 'ChromePilot',
    kicker: '08 // MONACO AI EXTENSION',
    category: 'fullstack',
    featured: true,
    language: 'TypeScript',
    summary:
      'Chrome extension bringing a Cmd+K Command Palette, boilerplate injector, and inline ghost-text AI autocomplete directly into LeetCode’s Monaco editor.',
    architecture: [
      'Comment-triggered and 5s idle-detection context analyzer emitting indentation-matched ghost text',
      'Keyboard-first Tab acceptance and Cmd+K / Ctrl+K snippet & AI prompt palette inside Monaco',
      'Zero-friction template library for rapid algorithmic contest prototyping',
    ],
    stack: ['TypeScript', 'Chrome Extension', 'Monaco Editor', 'AI Ghost Text'],
    githubUrl: 'https://github.com/krishnakanthpathi/ChromePilot',
    starsFallback: 0,
  },
  {
    id: 'whatsapp-mcp',
    repoName: 'whatsapp-mcp',
    name: 'WhatsApp MCP',
    kicker: '09 // MESSAGING PROTOCOL BRIDGE',
    category: 'mcp',
    featured: true,
    language: 'Python',
    summary:
      'FastMCP server powered by neonize (Go whatsmeow multi-device engine) enabling AI agents to verify numbers, resolve contact aliases, and dispatch text or files.',
    architecture: [
      'QR and 8-digit phone pairing backed by persistent SQLite multi-device session store',
      'Safe contact alias resolution (aliases.json) preventing unverified misrouting',
      'Full media & document dispatch for PDFs, images, audio, and code artifacts',
    ],
    stack: ['Python', 'FastMCP', 'whatsmeow', 'SQLite', 'MCP'],
    githubUrl: 'https://github.com/krishnakanthpathi/whatsapp-mcp',
    starsFallback: 0,
  },
  {
    id: 'discord-bot-mcp',
    repoName: 'discord-bot-mcp',
    name: 'Discord Bot MCP',
    kicker: '10 // DISCORD AGENT AUTOMATION',
    category: 'mcp',
    featured: false,
    language: 'Python',
    summary:
      'FastMCP + discord.py server for autonomous guild discovery, channel provisioning, rich embed messaging, and FFmpeg voice-channel audio streaming.',
    architecture: [
      'Full guild topology discovery and dynamic text/voice/category provisioning',
      'FFmpeg audio pipeline supporting local MP3/WAV files and web streams in voice channels',
    ],
    stack: ['Python', 'FastMCP', 'discord.py', 'FFmpeg'],
    githubUrl: 'https://github.com/krishnakanthpathi/discord-bot-mcp',
    starsFallback: 0,
  },
  {
    id: 'autofill',
    repoName: 'autofill',
    name: 'Voice Autofill',
    kicker: '11 // OFFLINE MEMORY PALETTE',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'Floating hotkey-driven desktop palette combining ~17MB offline Cactus Needle STT with LightMem hybrid retrieval and OS keystroke paste restoration.',
    architecture: [
      'Global hotkey captures active HWND, runs offline Whistle STT, and queries LightMem QA/recall',
      'Restores window focus and injects selected memory via clipboard synthesis',
    ],
    stack: ['Python', 'LightMem', 'Offline STT', 'Win32 API'],
    githubUrl: 'https://github.com/krishnakanthpathi/autofill',
    starsFallback: 0,
  },
  {
    id: 'codebuddy',
    repoName: 'CodeBuddy',
    name: 'CodeBuddy',
    kicker: '12 // SNIPPET & INTUITION HUB',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Developer code companion to organize algorithmic templates, document step-by-step intuition, and share annotated solutions.',
    architecture: [
      'Split Backend/Frontend TypeScript architecture deployed continuously on Vercel',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Vercel'],
    githubUrl: 'https://github.com/krishnakanthpathi/CodeBuddy',
    liveUrl: 'https://code-buddy-mu.vercel.app/',
    starsFallback: 0,
  },
  {
    id: 'parsepoint',
    repoName: 'ParsePoint',
    name: 'ParsePoint',
    kicker: '13 // STATEMENT ANALYTICS',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Full-stack financial statement parser transforming raw bank PDFs/CSVs into categorized spending insights and interactive analytics.',
    architecture: [
      'Decoupled TypeScript parser backend and interactive Vercel analytics dashboard',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'Data Parsing'],
    githubUrl: 'https://github.com/krishnakanthpathi/ParsePoint',
    liveUrl: 'https://parse-point.vercel.app',
    starsFallback: 0,
  },
  {
    id: 'resume-fit-tracker',
    repoName: 'resume-fit-tracker',
    name: 'Resume Fit Tracker',
    kicker: '14 // NLP EVALUATION ENGINE',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'FastAPI semantic evaluation API using SentenceTransformers (all-MiniLM-L6-v2) and SpaCy to score resume-to-JD alignment and highlight skill gaps.',
    architecture: [
      'MiniLM dense embeddings + SpaCy custom NER skill matching + batch evaluation endpoints',
    ],
    stack: ['Python', 'FastAPI', 'SentenceTransformers', 'SpaCy', 'scikit-learn'],
    githubUrl: 'https://github.com/krishnakanthpathi/resume-fit-tracker',
    starsFallback: 0,
  },
  {
    id: 'passphotomaker',
    repoName: 'passphotomaker',
    name: 'PassPhotoMaker',
    kicker: '15 // BROWSER MEDIA TOOL',
    category: 'fullstack',
    featured: false,
    language: 'TypeScript',
    summary:
      'Client-side React + TypeScript passport photo formatter and A4 print-sheet generator running 100% in the browser.',
    architecture: [
      'Zero-upload HTML5 Canvas cropping, sizing, and print-ready layout generation',
    ],
    stack: ['TypeScript', 'React', 'Vite', 'Canvas API'],
    githubUrl: 'https://github.com/krishnakanthpathi/passphotomaker',
    liveUrl: 'https://passphotomaker.vercel.app',
    starsFallback: 0,
  },
  {
    id: 'cp-programs',
    repoName: 'cp-programs',
    name: 'CP Programs',
    kicker: '16 // ALGORITHMIC ARCHIVE',
    category: 'rust-ai',
    featured: false,
    language: 'Python',
    summary:
      'Curated repository of 1,300+ competitive programming solutions across dynamic programming, graphs, trees, and greedy optimization.',
    architecture: [
      'Structured problem patterns supporting LeetCode Knight & Codeforces contests',
    ],
    stack: ['Python', 'C++', 'Java', 'Algorithms', 'DSA'],
    githubUrl: 'https://github.com/krishnakanthpathi/cp-programs',
    starsFallback: 1,
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'cartrade',
    role: 'Junior Engineer — Full Stack Developer',
    company: 'CarTrade Tech Limited',
    location: 'On-site · India',
    period: 'Dec 2025 — May 2026',
    type: 'work',
    highlights: [
      'Engineered responsive Vue.js client interfaces backed by modular PHP microservices across core platform workflows.',
      'Optimized complex queries and schema indexes across MongoDB and MySQLi, accelerating retrieval speeds by 35%.',
      'Promoted from Band B4 to Band B5 within four months based on delivery ownership and query performance gains.',
    ],
    stack: ['Vue.js', 'PHP', 'MongoDB', 'MySQLi', 'REST APIs'],
  },
  {
    id: 'turtil',
    role: 'AI Intern (Backend)',
    company: 'turtil (Teachbricks Pvt Ltd)',
    location: 'Summer Internship',
    period: 'May 2025 — Jul 2025',
    type: 'internship',
    highlights: [
      'Developed backend AI services and structured inference APIs during a paid 6-week engineering internship.',
      'Built data processing endpoints and collaborated directly with core product engineering teams.',
    ],
    stack: ['Python', 'FastAPI', 'LLMs', 'Backend Engineering'],
  },
  {
    id: 'pragati',
    role: 'B.Tech in Computer Science & Engineering',
    company: 'Pragati Engineering College',
    location: 'Surampalem, India',
    period: '2022 — 2026',
    type: 'education',
    highlights: [
      'CGPA 8.80 / 10.0 across core systems, operating systems, databases, networks, and algorithms.',
      'Led the Google Developer Group (GDG) Algorithms & Data Structures track, organizing workshops and coding contests.',
    ],
    stack: ['CGPA 8.80', 'GDG DSA Lead', 'Operating Systems', 'Computer Networks'],
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'leetcode',
    label: 'Competitive Programming',
    metric: 'LeetCode Knight',
    detail: '1,300+ algorithmic problems solved · Top 5% globally in weekly rated contests',
    issuer: 'LeetCode',
    url: 'https://leetcode.com/u/krishnakanthpathi/',
  },
  {
    id: 'nptel',
    label: 'National Academic Merit',
    metric: 'Top 1% National',
    detail: '87% Elite + Top 1% Topper in Data Structures & Algorithms using Java (12-week course)',
    issuer: 'IIT Kharagpur · NPTEL',
  },
  {
    id: 'servicenow-cad',
    label: 'Enterprise Platform',
    metric: 'ServiceNow CAD',
    detail: 'Certified Application Developer — Credential ID 27309512 (July 2025)',
    issuer: 'ServiceNow',
  },
  {
    id: 'servicenow-csa',
    label: 'Systems Administration',
    metric: 'ServiceNow CSA',
    detail: 'Certified System Administrator — Credential ID 27319676 (July 2025)',
    issuer: 'ServiceNow',
  },
  {
    id: 'codeforces',
    label: 'Algorithmic Contests',
    metric: 'Codeforces & 1st Prize',
    detail: 'Active Codeforces contestant · 1st Prize winner in "Crack the Jumble Code"',
    issuer: 'Codeforces · Campus',
    url: 'https://codeforces.com/profile/krishnakanthpathi',
  },
  {
    id: 'pypi-crates',
    label: 'Open Source Distribution',
    metric: 'PyPI · lmem',
    detail: 'Published cross-platform Rust memory engine binaries across PyPI, Crates.io, macOS, Linux & Windows',
    issuer: 'PyPI & GitHub Releases',
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
    items: ['FastMCP', 'ONNX Runtime', 'FTS5 BM25', 'Vector Search', 'Ollama', 'Extractive QA'],
  },
  {
    title: 'Full-Stack Web',
    code: '03',
    items: ['TypeScript', 'React 19', 'Vue.js', 'Node.js', 'FastAPI', 'PHP', 'Tailwind CSS'],
  },
  {
    title: 'Storage & Infra',
    code: '04',
    items: ['SQLite WAL', 'MongoDB', 'MySQL', 'Docker', 'TCP/UDP Sockets', 'Linux / macOS'],
  },
];

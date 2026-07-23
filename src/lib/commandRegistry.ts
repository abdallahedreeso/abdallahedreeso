import { ComponentType, lazy } from 'react';

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  category: 'navigation' | 'information' | 'system' | 'fun';
  usage: string;
  componentName?: 'ProjectsGrid' | 'SkillsRadar' | 'ContactForm' | 'AboutBio';
  execute?: (args: string[]) => {
    type: 'text' | 'component' | 'system' | 'action';
    content: string;
    payload?: any;
  };
}

export interface CLIOutputItem {
  id: string;
  command: string;
  timestamp: string;
  type: 'text' | 'component' | 'system' | 'error' | 'success';
  content?: string;
  componentName?: 'ProjectsGrid' | 'SkillsRadar' | 'ContactForm' | 'AboutBio';
  payload?: any;
}

// Lazy-loaded heavy modules
export const LazyProjectsGrid = lazy(() => import('../components/cli/modules/ProjectsGrid'));
export const LazySkillsRadar = lazy(() => import('../components/cli/modules/SkillsRadar'));
export const LazyContactForm = lazy(() => import('../components/cli/modules/ContactForm'));
export const LazyAboutBio = lazy(() => import('../components/cli/modules/AboutBio'));

export const COMMAND_REGISTRY: Record<string, CommandDefinition> = {
  help: {
    name: 'help',
    aliases: ['?', 'h', 'commands'],
    description: 'List all available quantum terminal commands and usage instructions',
    category: 'system',
    usage: 'help [command]',
    execute: (args) => {
      if (args.length > 0) {
        const cmdName = args[0].toLowerCase();
        const found = Object.values(COMMAND_REGISTRY).find(
          (c) => c.name === cmdName || (c.aliases && c.aliases.includes(cmdName))
        );
        if (found) {
          return {
            type: 'text',
            content: `COMMAND: ${found.name.toUpperCase()}\nUsage: ${found.usage}\nDescription: ${found.description}\nCategory: ${found.category}`,
          };
        }
        return {
          type: 'error',
          content: `Command '${cmdName}' not found. Type 'help' for a full list of commands.`,
        };
      }
      return {
        type: 'text',
        content: `Quantum CLI v2.4.0 (x86_64-quantum-webgl)
Available Commands:

NAVIGATION & CONTENT:
  show projects    (ls, projects)  - Launch interactive Bento Grid portfolio of featured projects
  skills           (radar, tech)   - Render interactive multi-dimensional tech stack radar
  about            (bio, cat about)- Read background, experience timeline, & Lead Architect profile
  contact          (email, msg)    - Launch instant glassmorphic contact form window

SYSTEM & CONTROL:
  clear            (cls, c)        - Clear the terminal history buffer
  theme            (colors)        - Toggle background WebGL visualizer state (cyber/neon/matrix)
  matrix                           - Trigger green code rain shader effect on canvas
  neofetch                         - Display system specs, frontend architect credentials, and stack
  sudo hire                        - Special quick contact shortcut

Tip: Use TAB for auto-completion, UP/DOWN for command history, or click quick chips below.`,
      };
    },
  },
  'show projects': {
    name: 'show projects',
    aliases: ['projects', 'ls', 'work'],
    description: 'Render interactive Bento Grid portfolio with dynamic project cards',
    category: 'navigation',
    usage: 'show projects [--filter=react|fullstack]',
    componentName: 'ProjectsGrid',
    execute: () => ({
      type: 'component',
      content: 'Launching Bento Grid Projects Module...',
      payload: { title: 'Featured Projects (Bento Grid)' },
    }),
  },
  skills: {
    name: 'skills',
    aliases: ['radar', 'tech', 'stack'],
    description: 'Render multi-dimensional technology matrix and proficiency specs',
    category: 'navigation',
    usage: 'skills',
    componentName: 'SkillsRadar',
    execute: () => ({
      type: 'component',
      content: 'Rendering Interactive Skills Matrix...',
      payload: { title: 'Technical Stack & Skills' },
    }),
  },
  about: {
    name: 'about',
    aliases: ['bio', 'whoami', 'cat about'],
    description: 'View Lead Frontend Architect background, experience timeline, and philosophy',
    category: 'navigation',
    usage: 'about',
    componentName: 'AboutBio',
    execute: () => ({
      type: 'component',
      content: 'Loading Architect Profile & Bio...',
      payload: { title: 'Architect Profile' },
    }),
  },
  contact: {
    name: 'contact',
    aliases: ['email', 'msg', 'hire'],
    description: 'Launch interactive glassmorphic contact form floating window',
    category: 'navigation',
    usage: 'contact',
    componentName: 'ContactForm',
    execute: () => ({
      type: 'component',
      content: 'Opening Glassmorphic Contact Channel...',
      payload: { title: 'Direct Messaging Terminal' },
    }),
  },
  neofetch: {
    name: 'neofetch',
    aliases: ['system', 'specs'],
    description: 'Display architecture details, bundle budget status, and system specs',
    category: 'information',
    usage: 'neofetch',
    execute: () => ({
      type: 'text',
      content: `
   .----------------.    ABDALLAH EDREES @ QUANTUM-ARCH
  | .--------------. |   -------------------------------
  | |     __       | |   OS: WebGL 2.0 / React 18 SPA
  | |    /  |      | |   Role: Lead Frontend Architect
  | |    |  |      | |   Stack: React 18 + TS + Tailwind + WebGL
  | |    |  |      | |   Bundle Budget Target: <= 101.21 kB (gzip)
  | |   _|  |_     | |   Build Time Target: <= 3.27s (Vite SWC)
  | |  |______|    | |   CLI Version: Quantum v2.4.0
  | '--------------' |   Status: Online (Zero Scroll Portals)
   '----------------'    Terminal Shell: Floating Glassmorphism
`,
    }),
  },
  matrix: {
    name: 'matrix',
    aliases: ['rain'],
    description: 'Toggle matrix code rain shader on 3D canvas background',
    category: 'fun',
    usage: 'matrix',
    execute: () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quantum-matrix-toggle'));
      }
      return {
        type: 'success',
        content: '[SYSTEM] Matrix code rain shader toggled on WebGL Canvas background.',
      };
    },
  },
  theme: {
    name: 'theme',
    aliases: ['colors'],
    description: 'Cycle WebGL 3D backdrop visual theme',
    category: 'system',
    usage: 'theme',
    execute: () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('quantum-theme-cycle'));
      }
      return {
        type: 'success',
        content: '[SYSTEM] Dynamic WebGL color palette cycled.',
      };
    },
  },
  'sudo hire': {
    name: 'sudo hire',
    aliases: ['hire-now'],
    description: 'Elevate privileges and launch high-priority contact pipeline',
    category: 'fun',
    usage: 'sudo hire',
    componentName: 'ContactForm',
    execute: () => ({
      type: 'component',
      content: '[SUDO PRIVILEGES GRANTED] Opening priority communication channel...',
      payload: { title: 'Priority Hire Channel' },
    }),
  },
  clear: {
    name: 'clear',
    aliases: ['cls', 'c'],
    description: 'Clear terminal screen history',
    category: 'system',
    usage: 'clear',
    execute: () => ({
      type: 'action',
      content: 'CLEAR_BUFFER',
    }),
  },
};

/**
 * Tokenize input string into command string and arguments
 */
export function parseCommand(rawInput: string): { commandKey: string; args: string[]; fullInput: string } {
  const trimmed = rawInput.trim();
  if (!trimmed) return { commandKey: '', args: [], fullInput: '' };

  const tokens = trimmed.split(/\s+/);
  const lowercaseTokens = tokens.map((t) => t.toLowerCase());

  // Check multi-word commands first (e.g. "show projects", "sudo hire")
  if (lowercaseTokens.length >= 2) {
    const twoWord = `${lowercaseTokens[0]} ${lowercaseTokens[1]}`;
    if (COMMAND_REGISTRY[twoWord]) {
      return {
        commandKey: twoWord,
        args: tokens.slice(2),
        fullInput: trimmed,
      };
    }
  }

  // Check single word match or alias
  const firstToken = lowercaseTokens[0];
  for (const [key, cmd] of Object.entries(COMMAND_REGISTRY)) {
    if (key === firstToken || (cmd.aliases && cmd.aliases.includes(firstToken))) {
      return {
        commandKey: key,
        args: tokens.slice(1),
        fullInput: trimmed,
      };
    }
  }

  return {
    commandKey: firstToken,
    args: tokens.slice(1),
    fullInput: trimmed,
  };
}

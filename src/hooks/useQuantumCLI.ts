import { useState, useCallback, useEffect, useRef } from 'react';
import { COMMAND_REGISTRY, CLIOutputItem, parseCommand } from '@/lib/commandRegistry';

export interface FloatingWindow {
  id: string;
  title: string;
  componentName: 'ProjectsGrid' | 'SkillsRadar' | 'ContactForm' | 'AboutBio';
  payload?: any;
  isMinimized?: boolean;
  zIndex: number;
}

export function useQuantumCLI() {
  const [history, setHistory] = useState<CLIOutputItem[]>([
    {
      id: 'welcome-0',
      command: 'system init',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      content: `⚡ Quantum CLI Terminal Shell v2.4.0
Type 'help' or click any suggestion button below to navigate.
Type 'show projects' to launch the Bento Grid portfolio.`,
    },
  ]);

  const [inputBuffer, setInputBuffer] = useState('');
  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [activeWindows, setActiveWindows] = useState<FloatingWindow[]>([]);
  const [topZIndex, setTopZIndex] = useState<number>(100);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus a floating window
  const bringToFront = useCallback((id: string) => {
    setActiveWindows((prev) =>
      prev.map((win) => {
        if (win.id === id) {
          const nextZ = topZIndex + 1;
          setTopZIndex(nextZ);
          return { ...win, zIndex: nextZ, isMinimized: false };
        }
        return win;
      })
    );
  }, [topZIndex]);

  // Close window
  const closeWindow = useCallback((id: string) => {
    setActiveWindows((prev) => prev.filter((win) => win.id !== id));
  }, []);

  // Minimize/Restore window
  const toggleMinimizeWindow = useCallback((id: string) => {
    setActiveWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isMinimized: !win.isMinimized } : win))
    );
  }, []);

  // Auto-type animation for command execution from click handlers
  const autoTypeAndExecute = useCallback((cmdString: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setInputBuffer('');
    let idx = 0;
    typingTimerRef.current = setInterval(() => {
      if (idx < cmdString.length) {
        const char = cmdString.charAt(idx);
        setInputBuffer((prev) => prev + char);
        idx++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setTimeout(() => {
          executeCommand(cmdString);
          setInputBuffer('');
        }, 150);
      }
    }, 25);
  }, []);

  // Execute a command
  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Add to history stack
    setHistoryStack((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const { commandKey, args } = parseCommand(trimmed);
    const cmdDef = COMMAND_REGISTRY[commandKey];
    const timestamp = new Date().toLocaleTimeString();
    const itemId = `cmd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    if (!cmdDef) {
      setHistory((prev) => [
        ...prev,
        {
          id: itemId,
          command: trimmed,
          timestamp,
          type: 'error',
          content: `zsh: command not found: ${trimmed}. Type 'help' to see valid commands.`,
        },
      ]);
      return;
    }

    if (cmdDef.name === 'clear') {
      setHistory([]);
      return;
    }

    let result = { type: 'text', content: '', payload: undefined as any };
    if (cmdDef.execute) {
      const res = cmdDef.execute(args);
      result.type = res.type;
      result.content = res.content;
      result.payload = res.payload;
    }

    // Add to output history
    setHistory((prev) => [
      ...prev,
      {
        id: itemId,
        command: trimmed,
        timestamp,
        type: (cmdDef.componentName ? 'component' : result.type) as any,
        content: result.content || cmdDef.description,
        componentName: cmdDef.componentName,
        payload: result.payload,
      },
    ]);

    // Spawning dynamic floating window if component command
    if (cmdDef.componentName) {
      const windowId = `win-${cmdDef.componentName.toLowerCase()}`;
      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);

      setActiveWindows((prev) => {
        const existingIndex = prev.findIndex((w) => w.id === windowId);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            zIndex: nextZ,
            isMinimized: false,
          };
          return updated;
        }
        return [
          ...prev,
          {
            id: windowId,
            title: result.payload?.title || cmdDef.name.toUpperCase(),
            componentName: cmdDef.componentName!,
            payload: result.payload,
            zIndex: nextZ,
            isMinimized: false,
          },
        ];
      });
    }
  }, [topZIndex]);

  // Tab completion
  const handleTabCompletion = useCallback(() => {
    if (!inputBuffer.trim()) return;
    const lower = inputBuffer.toLowerCase();
    const matches = Object.keys(COMMAND_REGISTRY).filter((k) => k.startsWith(lower));
    if (matches.length === 1) {
      setInputBuffer(matches[0]);
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        {
          id: `tab-${Date.now()}`,
          command: inputBuffer,
          timestamp: new Date().toLocaleTimeString(),
          type: 'system',
          content: `Suggestions: ${matches.join('   ')}`,
        },
      ]);
    }
  }, [inputBuffer]);

  // Up / Down arrow key history recall
  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (historyStack.length === 0) return;

    if (direction === 'up') {
      const nextIdx = historyIndex === -1 ? historyStack.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputBuffer(historyStack[nextIdx] || '');
    } else {
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= historyStack.length) {
        setHistoryIndex(-1);
        setInputBuffer('');
      } else {
        setHistoryIndex(nextIdx);
        setInputBuffer(historyStack[nextIdx] || '');
      }
    }
  }, [historyIndex, historyStack]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  return {
    history,
    inputBuffer,
    setInputBuffer,
    executeCommand,
    autoTypeAndExecute,
    handleTabCompletion,
    navigateHistory,
    activeWindows,
    bringToFront,
    closeWindow,
    toggleMinimizeWindow,
  };
}

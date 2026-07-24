import React, { createContext, useContext } from "react";

interface WindowFocusContextType {
  isFocused: boolean;
}

const WindowFocusContext = createContext<WindowFocusContextType>({
  isFocused: true,
});

export function WindowFocusProvider({
  isFocused,
  children,
}: {
  isFocused: boolean;
  children: React.ReactNode;
}) {
  return (
    <WindowFocusContext.Provider value={{ isFocused }}>
      {children}
    </WindowFocusContext.Provider>
  );
}

export function useWindowFocus(): WindowFocusContextType {
  return useContext(WindowFocusContext);
}

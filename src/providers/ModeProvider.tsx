import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "上級者モード" | "初心者モード";
type Props = {
  children: ReactNode;
};

export const ModeContext = createContext({} as [Mode, (mode: Mode) => void]);

export const ModeProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<Mode>("上級者モード");
  return (
    <ModeContext.Provider value={[ mode, setMode ]}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);
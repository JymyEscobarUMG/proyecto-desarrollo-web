import { createContext, useState, ReactNode } from 'react';
import { GlobalContextType, GlobalType } from '../@types/GlobalContextType';

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface globalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: globalProviderProps) {
  const [global, setGlobal] = useState<GlobalType>({ rolid: 0, autorizado: undefined });

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
}

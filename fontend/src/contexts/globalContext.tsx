import { createContext, useState, ReactNode} from 'react';
import { GlobalContextType } from '../@types/GlobalContextType';

export const GlobalContext  = createContext<GlobalContextType | undefined>(undefined);

interface globalProviderProps {
  children: ReactNode;
} 

export function GlobalProvider({ children }: globalProviderProps) {
  const [global, setGlobal] = useState<any>(null);

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
}

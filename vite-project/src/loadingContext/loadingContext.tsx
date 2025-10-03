// context/LoadingContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react"; // ✅ type-only import

// Context value interface
interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// Provider props interface
interface LoadingProviderProps {
  children: ReactNode;
}

// Create context
const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

// Provider component
export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook to use the context
export const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ServicesDrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleDrawer: () => void;
};

const ServicesDrawerContext = createContext<ServicesDrawerContextValue | null>(
  null,
);

export function ServicesDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const value = useMemo(
    () => ({ open, setOpen, toggleDrawer }),
    [open, toggleDrawer],
  );

  return (
    <ServicesDrawerContext.Provider value={value}>
      {children}
    </ServicesDrawerContext.Provider>
  );
}

export function useServicesDrawer() {
  const context = useContext(ServicesDrawerContext);
  if (!context) {
    throw new Error(
      "useServicesDrawer must be used within ServicesDrawerProvider",
    );
  }
  return context;
}

"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

export function ContextProviders({ children }: { children: ReactNode }) {
  return <HeroUIProvider disableRipple>{children}</HeroUIProvider>;
}

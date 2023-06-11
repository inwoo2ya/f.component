import { createContext } from "react";

interface IFContext {
  breakpoints?: number[][]
}

export const F = createContext<IFContext>({});

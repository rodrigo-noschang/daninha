import { ReactNode } from "react";
import { PlayersContextProvider } from "./players-context";

interface IProps {
  children: ReactNode;
}

export function ContextProviders({ children }: IProps) {
  return <PlayersContextProvider>{children}</PlayersContextProvider>;
}

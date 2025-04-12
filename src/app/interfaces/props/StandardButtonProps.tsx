import { ReactNode, ComponentProps } from "react";

export interface IStandardButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
}

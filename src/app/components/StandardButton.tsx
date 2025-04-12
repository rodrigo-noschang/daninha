import { Button } from "@/components/ui/button";
import { IStandardButtonProps } from "../interfaces/props/StandardButtonProps";

export function StandardButton({ children, ...rest }: IStandardButtonProps) {
  const extendedClassName = rest.className;

  Object.assign(rest, { className: undefined });

  return (
    <Button
      {...rest}
      className={`bg-button-green rounded-lg hover:bg-button-green-hover active:bg-button-green-hover ${extendedClassName}`}
    >
      {children}
    </Button>
  );
}

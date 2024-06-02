import { HTMLAttributes } from "react";

export function Button(buttonProps: HTMLAttributes<HTMLButtonElement>) {
  return <button {...buttonProps}>{buttonProps.children}</button>;
}

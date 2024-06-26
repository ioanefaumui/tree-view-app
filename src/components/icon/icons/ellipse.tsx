import { HTMLAttributes } from "react";

export function Ellipse(svgProps: HTMLAttributes<SVGElement>) {
  return (
    <svg {...svgProps} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}

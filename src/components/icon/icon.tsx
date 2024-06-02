import { HTMLProps } from "react";
import {
  Asset,
  Bolt,
  Component,
  Critic,
  Ellipse,
  Geolocation,
  Thunderbolt,
} from "./icons";

const icons = {
  asset: Asset,
  component: Component,
  location: Geolocation,
  alert: Ellipse,
  vibration: Ellipse,
  energy: Bolt,
  critic: Critic,
  tunderbolt: Thunderbolt,
};

interface IconProps extends HTMLProps<SVGElement> {
  icon: keyof typeof icons;
}

export function Icon({ icon, ...props }: IconProps) {
  if (!icons[icon]) return null;
  const Icon = icons[icon];
  return <Icon {...props} />;
}

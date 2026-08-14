"use client";

import { Globe, Smartphone, Code2, Palette, TrendingUp, Video, Layout, Gauge } from "lucide-react";

const ICONS = { Globe, Smartphone, Code2, Palette, TrendingUp, Video, Layout, Gauge };

export default function ServiceIcon({ name, className }) {
  const Icon = ICONS[name] ?? Globe;
  return <Icon className={className} aria-hidden="true" />;
}

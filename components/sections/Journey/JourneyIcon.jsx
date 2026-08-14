"use client";

import { Users, Package, Handshake, Store, Trophy, MapPin, Star, TrendingUp } from "lucide-react";

const ICONS = { Users, Package, Handshake, Store, Trophy, MapPin, Star, TrendingUp };

export default function JourneyIcon({ name, className }) {
  const Icon = ICONS[name] ?? Star;
  return <Icon className={className} aria-hidden="true" />;
}

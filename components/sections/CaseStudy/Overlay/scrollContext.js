"use client";

import { createContext, useContext } from "react";

export const ScrollContainerContext = createContext(null);
export const useScrollContainer = () => useContext(ScrollContainerContext);

// The bottom Previous/Next project bar needs to render outside the card's
// scrollable area (so it stays pinned regardless of scroll position) even
// though the component that owns the data lives inside the scrollable
// content tree - a portal target ref, shared the same way as the scroll
// container above, solves that without threading props through the
// server-rendered `@casestudy` slot boundary.
export const FooterSlotContext = createContext(null);
export const useFooterSlot = () => useContext(FooterSlotContext);

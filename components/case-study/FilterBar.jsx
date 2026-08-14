"use client";

import UiFilterBar from "@/components/ui/FilterBar";

const ALL = "All";

export default function FilterBar({ categories, active, onChange }) {
  return (
    <UiFilterBar
      categories={[ALL, ...categories]}
      active={active}
      onChange={onChange}
      layoutId="case-study-filter-pill"
    />
  );
}

export { ALL };

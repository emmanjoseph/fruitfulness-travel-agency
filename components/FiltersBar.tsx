"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TAGS = [
  { value: "safari", label: "Safari" },
  { value: "wildlife", label: "Wildlife" },
  { value: "big-five", label: "Big Five" },
  { value: "great-migration", label: "Great Migration" },
  { value: "beach", label: "Beach & Coast" },
  { value: "swahili-coast", label: "Swahili Coast" },
  { value: "mountain", label: "Mountain Trekking" },
  { value: "hiking", label: "Hiking" },
  { value: "cultural", label: "Cultural" },
  { value: "maasai", label: "Maasai Experience" },
  { value: "photography", label: "Photography" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "adventure", label: "Adventure" },
  { value: "luxury", label: "Luxury" },
  { value: "budget", label: "Budget" },
  { value: "family-friendly", label: "Family Friendly" },
  { value: "bird-watching", label: "Bird Watching" },
  { value: "hot-air-balloon", label: "Hot Air Balloon" },
];

const COUNTRIES = [
  { value: "kenya", label: "🇰🇪 Kenya" },
  { value: "tanzania", label: "🇹🇿 Tanzania" },
  { value: "uganda", label: "🇺🇬 Uganda" },
];

export default function FiltersBar() {
  const router = useRouter();
  const params = useSearchParams();

  const activeTag = params.get("tags") ?? "";
  const activeCountry = params.get("country") ?? "";

  function updateParam(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());
    if (value === "all") {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    sp.set("page", "1");
    router.push(`/services?${sp.toString()}`);
  }

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Explore handpicked trips</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {activeTag || activeCountry
              ? `Filtering by${activeTag ? ` #${activeTag}` : ""}${activeCountry ? ` · ${activeCountry}` : ""}`
              : "Browse all available journeys"}
          </p>
        </div>

        {/* Country dropdown — stays as select since there are only 3 */}
        <Select
          value={activeCountry || "all"}
          onValueChange={(value) => updateParam("country", value)}
        >
          <SelectTrigger className="w-40 rounded-3xl bg-white shadow-sm border h-10">
            <SelectValue placeholder="All countries" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl p-1">
            <SelectItem value="all">All countries</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tag pills — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        <button
          onClick={() => updateParam("tags", "all")}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !activeTag
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          }`}
        >
          All
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag.value}
            onClick={() => updateParam("tags", tag.value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeTag === tag.value
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
}
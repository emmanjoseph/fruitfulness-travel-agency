"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  { value: "safari", label: "Safari" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
  { value: "beach", label: "Beach" },
  { value: "luxury", label: "Luxury" },
  { value: "budget", label: "Budget" },
  { value: "family", label: "Family Friendly" },
  { value: "honeymoon", label: "Honeymoon" },
];

const COUNTRIES = [
  { value: "kenya", label: "Kenya" },
  { value: "tanzania", label: "Tanzania" },
  { value: "uganda", label: "Uganda" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function FiltersSidebar() {
  const router = useRouter();
  const params = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2300]);
  const activeCategory = params.get("category") ?? "";
  const activeCountry = params.get("country") ?? "";
  const activeMonth = params.get("month") ?? "";

  function updateParam(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());

    // Map category to tags for API
    if (key === "category") {
      if (value === "all" || !value) {
        sp.delete("category");
        sp.delete("tags");
      } else {
        sp.set("category", value);
        sp.set("tags", value); // Also set tags for API compatibility
      }
    } else if (value === "all" || !value) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }

    sp.set("page", "1");
    router.push(`/services?${sp.toString()}`);
  }

  function handleSearch() {
    const sp = new URLSearchParams(params.toString());
    if (searchQuery) {
      sp.set("q", searchQuery); // Use 'q' to match your API
    } else {
      sp.delete("q");
    }
    sp.set("page", "1");
    router.push(`/services?${sp.toString()}`);
  }

  return (
      <aside className="bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-3xl p-6 space-y-6 sticky top-6 h-fit shadow-sm border border-stone-200/50">
        {/* About Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-600 font-heading">About me</h2>
          <p className="text-sm text-gray-600 font-medium text-lg">
            Discover amazing travel experiences across East Africa
          </p>
        </div>

        {/* Search Tour */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700 font-heading">
            Search Tour
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
                id="search"
                placeholder="Search Tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 rounded-xl border-gray-300 bg-white focus:border-emerald-500 focus:ring-emerald-500 h-11"
            />
          </div>
        </div>

        {/* Where To */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-gray-700 font-heading">
            Where To..
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
            <Select
                value={activeCountry || "all"}
                onValueChange={(value) => updateParam("country", value)}
            >
              <SelectTrigger className="w-full h-13 pl-10 rounded-xl border-gray-300 bg-white focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Destinations</SelectItem>
                {COUNTRIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Month */}
        <div className="space-y-2">
          <Label htmlFor="month" className="text-sm font-medium text-gray-700">
            Month
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
            <Select
                value={activeMonth || "all"}
                onValueChange={(value) => updateParam("month", value)}
            >
              <SelectTrigger className="pl-10 rounded-xl border-gray-300 bg-white focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent className="rounded-xl max-h-[300px]">
                <SelectItem value="all">All Months</SelectItem>
                {MONTHS.map((month) => (
                    <SelectItem key={month.toLowerCase()} value={month.toLowerCase()}>
                      {month}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <RadioGroup
              value={activeCategory}
              onValueChange={(value) => updateParam("category", value)}
              className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all" />
              <Label htmlFor="all" className="text-sm text-gray-700 cursor-pointer font-heading">
                All Categories
              </Label>
            </div>
            {CATEGORIES.map((cat) => (
                <div key={cat.value} className="flex items-center space-x-2 cursor-pointer">
                  <RadioGroupItem value={cat.value} id={cat.value} />
                  <Label htmlFor={cat.value} className="text-sm text-gray-700 cursor-pointer">
                    {cat.label}
                  </Label>
                </div>
            ))}
          </RadioGroup>
        </div>

        {/* Search Button */}
        <Button
            onClick={handleSearch}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 font-semibold shadow-md hover:shadow-lg transition-all"
        >
          SEARCH
        </Button>
      </aside>
  );
}
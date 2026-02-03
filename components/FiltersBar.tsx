"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react";

export default function FiltersBar() {
  const router = useRouter();
  const params = useSearchParams();

  function updateParam(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());
    sp.set(key, value);
    sp.set("page", "1");
    router.push(`/services?${sp.toString()}`);
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-3">
      <h1 className="text-2xl font-semibold">Explore handpicked trips</h1>
      <div className="flex items-center space-x-3">
          <Select
        onValueChange={(value) => updateParam("tags", value)}
        // className="border px-3 py-2 rounded-[15px]"
      >
              <SelectTrigger className="w-full max-w-48 rounded-3xl bg-white shadow-md p-4 border">
        <SelectValue className="font-medium text-gray-600 p-4" placeholder="Select journey by tag" />

    <SelectContent className="rounded-4xl p-2">
         <SelectGroup>
          <SelectLabel>Journey tags</SelectLabel>
          <SelectItem value="beach">Coastal beaches</SelectItem>
          <SelectItem value="wildlife">Wildlife</SelectItem>
          <SelectItem value="honeymoon">Honeymoon</SelectItem>
          <SelectItem value="adventure">Adventure</SelectItem>
          <SelectItem value="budget">Budget</SelectItem>
          <SelectItem value="mountain">Mountain trekking</SelectItem>
        </SelectGroup>
    </SelectContent>
      </SelectTrigger>
      </Select>

      <Select
        onValueChange={(value) => updateParam("country", value)}
      >
<SelectTrigger className="w-full max-w-40 rounded-3xl bg-white shadow-md p-4 border ">
        <SelectValue className="font-medium text-gray-600 p-4" placeholder="All countries" />

     <SelectContent className="rounded-4xl p-2">
          <SelectItem value="kenya">Kenya </SelectItem>
          <SelectItem value="tanzania">Tanzania</SelectItem>
          <SelectItem value="uganda">Uganda</SelectItem>
        </SelectContent>
</SelectTrigger>
       
      </Select>

      {/* <div className="flex items-center gap-x-1.5 shadow-md px-3 rounded-2xl bg-white border-s-muted-foreground">
        <Search className="text-gray-500" size={17}/>
        <Input
        placeholder="Search journeys..."
        className="border px-3 py-2 rounded w-64 focus-visible:ring-0 border-none shadow-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") updateParam("q", (e.target as any).value);
        }}
      />
      </div> */}

      </div>

    
      
    </div>
  );
}

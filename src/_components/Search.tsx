"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      {isFocused && (
        <div
          className="fixed inset-0 bg-black/75 bg-opacity-50 z-10"
          onClick={() => setIsFocused(false)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="relative z-20 max-w-sm w-full mx-auto"
      >
        <div className="flex items-center w-full rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2">
          <SearchIcon className="h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full border-0 h-8 font-semibold bg-transparent focus:outline-none
            text-black
            "
            value={search}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import SearchResults from "@/_components/SearchResults";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl text-white font-semibold mb-4">
        Results for "{query}"
      </h1>
      <SearchResults search={query} />
    </div>
  );
}

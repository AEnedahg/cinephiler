"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchResults from "@/_components/SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchResultsWrapper />
    </Suspense>
  );
}

function SearchResultsWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  return <SearchResults search={query} />;
}

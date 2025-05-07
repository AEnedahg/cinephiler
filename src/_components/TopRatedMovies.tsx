"use client";

import React from "react";
import { topRatedQueryFunc } from "@/_lib/query/query";
import Link from 'next/link';
import { useRouter } from "next/navigation";
function TopRatedMovies() {
  const { data, isLoading, error } = topRatedQueryFunc();
  const router = useRouter();
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };
  if (isLoading) {
    return (
      <div className="overflow-x-auto md:overflow-x-hidden px-2 lg:px-40">
        <div className="mb-8 text-2xl bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="flex md:grid md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="min-w-[150px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto"
            >
              <div className="w-full h-[240px] bg-gray-700 rounded-lg animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-600 mt-2 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-red-500">Failed to load top rated movies.</p>;

  console.log(data);

  return (
    <div className="overflow-x-auto md:overflow-x-hidden px-2 lg:px-40 mt-6">
      <h2 className="mb-8 text-[#111827] text-2xl font-semibold">
        Top Rated Movies
      </h2>
      <div className="flex md:grid md:grid-cols-6 gap-2">
        {data?.results.slice(1, 7).map((movie) => (
          <Link
            href={`/movies/${movie.id}`}
            key={movie.id}
            className="min-w-[150px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handleMovieClick}
          >
            <div
              key={movie.id}
              className="min-w-[150px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="lg:rounded-lg lg:w-full lg:h-auto object-cover"
                width={145}
                height={160}
              />
              <div className="mt-2 w-full">
                <p className="text-md text-[#111827] text-ellipsis overflow-hidden whitespace-normal break-words">
                  {movie.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopRatedMovies;

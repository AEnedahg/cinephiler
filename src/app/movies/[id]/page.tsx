"use client";

import React from "react";
import { useParams } from "next/navigation";
import { movieDetailsQuery } from "@/_lib/query/query";
import { format } from "date-fns";

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = Number(params.id);
  const { data: movie, isLoading, error } = movieDetailsQuery(movieId);

  if (isLoading) {
    return (
      <div className="px-2 lg:px-40 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-700 h-10 w-3/4 mb-4 rounded animate-pulse"></div>
          <div className="bg-gray-600 h-6 w-1/2 mb-8 rounded animate-pulse"></div>
          <div className="bg-gray-700 h-64 w-full mb-6 rounded animate-pulse"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-600 h-4 w-full rounded animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-red-500 p-8">Failed to load movie details</div>;
  if (!movie) return <div className="p-8">Movie not found</div>;

  return (
    <div className="px-2 lg:px-40 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">
          {movie.title}
        </h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-600">
            {movie.release_date
              ? format(new Date(movie.release_date), "MMMM d, yyyy")
              : "Unknown date"}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">
            Popularity: {movie.popularity.toFixed(0)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder-movie.png"
            }
            alt={movie.title}
            className="w-full md:w-64 h-auto rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Vote Average</h3>
            <p className="text-2xl font-bold">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Vote Count</h3>
            <p className="text-2xl font-bold">{movie.vote_count}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Status</h3>
            <p className="text-xl font-semibold">{movie.status || "Unknown"}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-500">Runtime</h3>
            <p className="text-xl font-semibold">
              {movie.runtime ? `${movie.runtime} mins` : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

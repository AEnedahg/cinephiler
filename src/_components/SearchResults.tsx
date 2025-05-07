"use client"
import React from "react";
import { useDebounce } from "@/hooks/debounce";
import { combinedSearchQueryFunc } from "@/_lib/query/query";
import { Movie, Person } from "@/_lib/schema/combinedSearch";
import Link from 'next/link';
import { useRouter } from "next/navigation";

export type CombinedSearchData = {
  movies: Movie[];
  people: Person[];
};


export default function SearchResults({ search }: { search: string }) {
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter()
  const { data, isLoading, error } = combinedSearchQueryFunc(debouncedSearch);
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };
  const handlePersonClick = (personId: number) => {
    router.push(`/persons/${personId}`)
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4 lg:px-40 px-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-700 rounded-lg w-full aspect-[2/3]" />
            <div className="bg-gray-600 h-4 mt-2 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Search error:", error);
    return <p className="text-red-500">Failed to load search results.</p>;
  }

  return (
    <div className="space-y-8 lg:px-40 px-4">
      <section>
        <h2 className="text-xl font-bold mb-4">Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <Link
                href={`/movies/${movie.id}`}
                key={movie.id}
                className="min-w-[150px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleMovieClick}
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Actors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data?.people
            .filter((person) => person.profile_path)
            .map((person) => (
              <Link
                href={`/persons/${person.id}`}
                key={person.id}
                className="min-w-[150px] md:min-w-0 flex-shrink-0 md:flex-shrink md:w-auto cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handlePersonClick}
              >
                <PersonCard key={`person-${person.id}`} person={person} />
              </Link>
            ))}
        </div>
      </section>

      {data?.movies.length === 0 && data?.people.length === 0 && (
        <div className="text-center py-10">No results found</div>
      )}
    </div>
  );
}

const MovieCard = ({ movie }: { movie: Movie }) => (
  <div>
    <img
      src={
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/placeholder-movie.png"
      }
      alt={movie.title}
      className="rounded-lg w-full aspect-[2/3] object-cover"
    />
    <p className="text-[#111827] mt-2">{movie.title}</p>
    {movie.release_date && (
      <p className="text-gray-500 text-sm">
        {new Date(movie.release_date).getFullYear()}
      </p>
    )}
  </div>
);

const PersonCard = ({ person }: { person: Person }) => (
  <div>
    <img
      src={
        person.profile_path
          ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
          : "/placeholder-person.png"
      }
      alt={person.name}
      className="rounded-lg w-full aspect-[2/3] object-cover"
    />
    <div className="mt-2">
      <p className="text-[#111827] font-medium">{person.name}</p>
      <p className="text-gray-500 text-sm">{person.known_for_department}</p>
    </div>
  </div>
);

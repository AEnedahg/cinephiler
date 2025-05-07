import { Metadata } from "next";
import { Movie } from "@/_lib/schema/combinedSearch";
export const generateMovieMetadata = (movie: Movie): Metadata => {
  return {
    title: `${movie.title} | Reviews, Ratings & Details | Cinephiler`,
    description: `${movie.overview?.substring(
      0,
      160
    )}... Read reviews and ratings for ${movie.title}.`,
    keywords: [
      `${movie.title} review`,
      `${movie.title} rating`,
      `${movie.title} movie`,
      ...(movie.genre_ids || []).map((genre) => `${genre} movies`),
      "film reviews",
      "movie ratings",
    ],
    openGraph: {
      title: `${movie.title} | Cinephiler`,
      description:
        movie.overview?.substring(0, 160) ||
        `Detailed information about ${movie.title}`,
      url: `https://www.cinephiler.com/movies/${movie.id}`,
      images: [
        {
          url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/default-movie-og.jpg",
          width: 500,
          height: 750,
          alt: `${movie.title} poster`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${movie.title} | Cinephiler`,
      description:
        movie.overview?.substring(0, 160) ||
        `Check out ${movie.title} on Cinephiler`,
      images: [
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "/default-movie-og.jpg",
      ],
    },
  };
};


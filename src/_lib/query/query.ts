import { useQuery } from "@tanstack/react-query";
import { topRatedApi, upcomingAPI, popularApi, searchMultiApi, movieDetailsApi } from "../api/api";
import { Movie, Person } from "../schema/combinedSearch";

interface UpcomingMovieAPIResponse {
  results: {
    id: number;
    poster_path: string;
    title: string;
  }[];
}

interface TopRatedMovieAPIResponse {
  results: {
    id: number;
    poster_path: string;
    title: string;
  }[];
}

interface PopularMovieAPIResponse {
  results: {
    id: number;
    poster_path: string;
    title: string;
  }[];
}

type CombinedSearchData = {
  movies: {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
  };
  people: {
    results: Person[];
    page: number;
    total_pages: number;
    total_results: number;
  };
};



export const upcomingQueryFunc = () => {
  return useQuery<UpcomingMovieAPIResponse>({
    queryKey: ["upcomingMovies"],
    queryFn: () => upcomingAPI(""),
    enabled: true,
  });
};

export const topRatedQueryFunc = () => {
  return useQuery<TopRatedMovieAPIResponse>({
    queryKey: ['topRatedMovies'],
    queryFn: () => topRatedApi(""),
    enabled: true,
  })
}

export const popularQueryFunc = () => {
  return useQuery<PopularMovieAPIResponse>({
    queryKey: ['popularMovies'],
    queryFn: () => popularApi(""),
    enabled: true,
  })
}

export const combinedSearchQueryFunc = (search: string) => {
  return useQuery<CombinedSearchData>({
    queryKey: ["multi-search", search],
    queryFn: () => searchMultiApi(search),
    enabled: !!search,
  });
};

export const movieDetailsQuery = (movieId: number) =>
  useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => movieDetailsApi(movieId),
    enabled: !!movieId,
  });
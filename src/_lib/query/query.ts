import { useQuery } from "@tanstack/react-query";
import { topRatedApi, upcomingAPI, popularApi, searchCombinedApi, movieDetailsApi, personDetailsApi } from "../api/api";
import { Movie, Person} from "../schema/combinedSearch";

export type CombinedSearchData = {
  movies: Movie[];
  people: Person[];
};

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
    queryKey: ["combined-search", search],
    queryFn: () => searchCombinedApi(search),
    enabled: !!search,
  });
};

export const movieDetailsQuery = (movieId: number) =>
  useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => movieDetailsApi(movieId),
    enabled: !!movieId,
  });

export const personDetailsQuery = (personId: number) =>
  useQuery({
    queryKey: ["person-details", personId],
    queryFn: () => personDetailsApi(personId),
    enabled: !!personId,
  });
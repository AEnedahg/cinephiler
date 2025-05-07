import axios from "axios";
import { upcomingSchema } from "../schema/upcoming";
import { topRatedSchema } from "../schema/topRated";
import { popularSchema } from "../schema/popular";
import { MultiSearchAPIResponseSchema, Movie, Person } from "../schema/combinedSearch";
import { movieDetailSchema } from "../schema/movieDetails";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const upcomingAPI = async (upcomingMovie?: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    const parsed = upcomingSchema.parse(response.data);

    if (upcomingMovie) {
      const filteredResults = parsed.results.filter((movie) =>
        movie.title.toLowerCase().includes(upcomingMovie.toLowerCase())
      );
      return {
        ...parsed,
        results: filteredResults,
        total_results: filteredResults.length,
      };
    }

    return parsed;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};

export const topRatedApi = async (topRatedMovie: string) => {
 try {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: 1,
    }
  });
  const parsed = topRatedSchema.parse(response.data);
  if (topRatedMovie) {
    const topRatedResult = parsed.results.filter((movie) => {
      movie.title.toLowerCase().includes(topRatedMovie.toLowerCase())
    });
    return {
      ...parsed,
      results: topRatedResult,
      length: topRatedResult.length,
    }
  }
  return parsed;
 } catch(error) {
  console.log("API fetch failed", error);
  throw error;
 }
}

export const popularApi = async (popularMovie:string) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: 1,
        language: 'en-US'
      }
    });
    const parsed = popularSchema.parse(response.data);
    if(popularMovie) {
      const filteredPopularResults = parsed.results.filter((movie) => {
        movie.title.toLowerCase().includes(popularMovie.toLowerCase())
      })
      return {
      ...parsed,
      result: filteredPopularResults,
      length: filteredPopularResults.length,
      }
    }
    return parsed;
  }
  catch(error) {
    console.log('API fetch failed', error);
    throw error;
  }
}

export const searchMultiApi = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  // Parse with Zod
  const parsed = MultiSearchAPIResponseSchema.parse(response.data);

  // Filter movies and people
  const movies = parsed.results.filter(
    (result): result is Movie => result.media_type === "movie"
  );

  const people = parsed.results.filter(
    (result): result is Person => result.media_type === "person"
  );

  // Return in separate paginated blocks
  return {
    movies: {
      results: movies,
      page: parsed.page,
      total_pages: parsed.total_pages,
      total_results: parsed.total_results,
    },
    people: {
      results: people,
      page: parsed.page,
      total_pages: parsed.total_pages,
      total_results: parsed.total_results,
    },
  };
};

export const movieDetailsApi = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    const parsed = movieDetailSchema.parse(response.data);
    return parsed;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};
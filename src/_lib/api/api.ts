import axios from "axios";
import { upcomingSchema } from "../schema/upcoming";
import { topRatedSchema } from "../schema/topRated";
import { popularSchema } from "../schema/popular";
import { movieSchema, personSchema } from "../schema/combinedSearch";
import { movieDetailSchema } from "../schema/movieDetails";
import { personDetailSchema } from "../schema/personDetails";

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

export const searchCombinedApi = async (query: string) => {
  const [movieRes, personRes] = await Promise.all([
    axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: "en-US",
        include_adult: false,
        page: 1,
      },
    }),
    axios.get(`${BASE_URL}/search/person`, {
      params: {
        api_key: API_KEY,
        query,
        language: "en-US",
        include_adult: false,
        page: 1,
      },
    }),
  ]);

  try {
    const parsedMovies = movieSchema.parse(movieRes.data);
    const parsedPeople = personSchema.parse(personRes.data);

    const filteredMovies = parsedMovies.results.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPeople = parsedPeople.results.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );

    return {
      movies: filteredMovies,
      people: filteredPeople,
    };
  } catch (error) {
    console.error("Zod parsing error in searchCombinedApi:", error);
    throw error;
  }
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

export const personDetailsApi = async (personId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/person/${personId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    const parsed = personDetailSchema.parse(response.data);
    return parsed;
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    throw error;
  }
};
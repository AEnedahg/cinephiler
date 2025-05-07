import { z } from "zod";

// Movie Schema with adjustments
const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string().optional(), // Made optional as some movies might not have release dates
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  media_type: z.literal("movie").optional(), // Added media_type for better discrimination
});

// Person Schema with adjustments
const personSchema = z.object({
  adult: z.boolean().optional(), // Made optional as not always present
  gender: z.number().optional(), // Made optional
  known_for_department: z.string(),
  id: z.number(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(), // Made nullable
  known_for: z
    .array(
      z
        .object({
          adult: z.boolean().optional(),
          backdrop_path: z.string().nullable(), // Made nullable
          id: z.number(),
          title: z.string().optional(), // Made optional (might be name for TV shows)
          original_language: z.string().optional(),
          original_title: z.string().optional(),
          overview: z.string().optional(),
          poster_path: z.string().nullable(), // Made nullable
          media_type: z.string().optional(),
          genre_ids: z.array(z.number()).optional(), // Made optional
          popularity: z.number().optional(),
          release_date: z.string().optional(),
          video: z.boolean().optional(),
          vote_average: z.number().optional(),
          vote_count: z.number().optional(),
        })
        .passthrough() // Allows additional properties
    )
    .optional(), // Made optional as not always present
  media_type: z.literal("person").optional(), // Added media_type
});

// Search Response Schemas
export const SearchMovieAPIResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const SearchPersonAPIResponseSchema = z.object({
  page: z.number(),
  results: z.array(personSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// Combined Multi-Search Schema
export const MultiSearchAPIResponseSchema = z.object({
  page: z.number(),
  results: z.array(
    z.union([movieSchema, personSchema]).and(
      z.object({
        media_type: z.enum(["movie", "person"]).optional(),
      })
    )
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

// Type exports
export type Movie = z.infer<typeof movieSchema>;
export type Person = z.infer<typeof personSchema>;
export type MovieSearchResponse = z.infer<typeof SearchMovieAPIResponseSchema>;
export type PersonSearchResponse = z.infer<
  typeof SearchPersonAPIResponseSchema
>;
export type MultiSearchResponse = z.infer<typeof MultiSearchAPIResponseSchema>;

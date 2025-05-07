import { z } from "zod";

export const movieItemSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string().optional(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  media_type: z.literal("movie").optional(),
});

export const personItemSchema = z.object({
  adult: z.boolean().optional(),
  gender: z.number().optional(),
  known_for_department: z.string(),
  id: z.number(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  known_for: z
    .array(
      z
        .object({
          adult: z.boolean().optional(),
          backdrop_path: z.string().nullable(),
          id: z.number(),
          title: z.string().optional(),
          original_language: z.string().optional(),
          original_title: z.string().optional(),
          overview: z.string().optional(),
          poster_path: z.string().nullable(),
          media_type: z.string().optional(),
          genre_ids: z.array(z.number()).optional(),
          popularity: z.number().optional(),
          release_date: z.string().optional(),
          video: z.boolean().optional(),
          vote_average: z.number().optional(),
          vote_count: z.number().optional(),
        })
        .passthrough()
    )
    .optional(),
  media_type: z.literal("person").optional(),
});

export const movieSchema = z.object({
  page: z.number(),
  results: z.array(movieItemSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const personSchema = z.object({
  page: z.number(),
  results: z.array(personItemSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type Movie = z.infer<typeof movieItemSchema>;
export type Person = z.infer<typeof personItemSchema>;
export type MovieSearch = z.infer<typeof movieSchema>;
export type PersonSearch = z.infer<typeof personSchema>;

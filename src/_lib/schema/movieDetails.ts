import { z } from "zod";

export const movieDetailSchema = z.object({
  adult: z.boolean().nullable(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.object({}).nullable(),
  budget: z.number().nullable(),
  genres: z.array(
    z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
  ),
  homepage: z.string().nullable(),
  id: z.number().nullable(),
  imdb_id: z.string().nullable(),
  original_language: z.string().nullable(),
  original_title: z.string().nullable(),
  overview: z.string().nullable(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  genre_ids: z.array(z.number()).optional(),
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().nullable(),
        name: z.string(),
        origin_country: z.string(),
      })
    )
    .nullable(),
  production_countries: z.array(
    z
      .object({
        iso_3166_1: z.string().nullable(),
        name: z.string().nullable(),
      })
      .nullable()
  ),
  release_date: z.string().nullable(),
  revenue: z.number().nullable(),
  runtime: z.number().nullable(),
  spoken_languages: z.array(
    z
      .object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      })
      .nullable()
  ),
  status: z.string().nullable(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean().nullable(),
  vote_average: z.number(),
  vote_count: z.number().nullable(),
});

export type MovieDetail = z.infer<typeof movieDetailSchema>;

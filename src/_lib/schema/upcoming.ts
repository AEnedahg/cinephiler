import { z } from 'zod';

export const upcomingSchema = z.object({
  dates: z.object({
    maximum: z.string(),
    minimum: z.string(),
  }),
  page: z.number(),
  results: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string(),
      genre_ids: z.array(z.number()),
      id: z.number(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number(),
      poster_path: z.string(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});


import { z } from "zod";

export const personDetailSchema = z.object({
  adult: z.boolean().default(true),
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string().nullable(), // nullable in case it's missing
  deathday: z.string().nullable(), // nullable in case it's missing
  gender: z.number().default(0),
  homepage: z.string().nullable(), // nullable in case it's not provided
  id: z.number().default(0),
  imdb_id: z.string(),
  known_for_department: z.string(),
  name: z.string(),
  place_of_birth: z.string().nullable(), // can be nullable
  popularity: z.number().default(0),
  profile_path: z.string().nullable(), // often nullable if no image
});

export type PersonDetails = z.infer<typeof personDetailSchema>;

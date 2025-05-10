import { z } from "zod";

export const personDetailSchema = z.object({
  adult: z.boolean().default(true),
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string().nullable(), 
  deathday: z.string().nullable(), 
  gender: z.number().default(0),
  homepage: z.string().nullable(), 
  id: z.number().default(0),
  imdb_id: z.string(),
  known_for_department: z.string(),
  name: z.string(),
  place_of_birth: z.string().nullable(), 
  popularity: z.number().default(0),
  profile_path: z.string().nullable(), 
});

export type PersonDetails = z.infer<typeof personDetailSchema>;

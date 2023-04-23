import { z } from 'zod';

/////////////////////////////////////////
// USER RATING SCHEMA
/////////////////////////////////////////

export const UserRatingSchema = z.object({
  id: z.string().cuid(),
  score: z.number().int(),
  ratedById: z.string(),
  ratingForId: z.string(),
})

export type UserRating = z.infer<typeof UserRatingSchema>

/////////////////////////////////////////
// USER RATING OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserRatingOptionalDefaultsSchema = UserRatingSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type UserRatingOptionalDefaults = z.infer<typeof UserRatingOptionalDefaultsSchema>

export default UserRatingSchema;

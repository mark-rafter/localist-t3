import { z } from 'zod';

export const UserRatingOrderByRelevanceFieldEnumSchema = z.enum(['id','ratedById','ratingForId']);

export default UserRatingOrderByRelevanceFieldEnumSchema;

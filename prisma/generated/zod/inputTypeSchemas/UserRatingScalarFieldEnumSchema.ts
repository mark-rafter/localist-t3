import { z } from 'zod';

export const UserRatingScalarFieldEnumSchema = z.enum(['id','score','ratedById','ratingForId']);

export default UserRatingScalarFieldEnumSchema;

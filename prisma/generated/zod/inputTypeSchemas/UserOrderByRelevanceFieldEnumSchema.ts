import { z } from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','image']);

export default UserOrderByRelevanceFieldEnumSchema;

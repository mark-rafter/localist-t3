import { z } from 'zod';

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['id','sessionToken','userId']);

export default SessionOrderByRelevanceFieldEnumSchema;

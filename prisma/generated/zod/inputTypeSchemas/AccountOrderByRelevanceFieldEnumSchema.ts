import { z } from 'zod';

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export default AccountOrderByRelevanceFieldEnumSchema;

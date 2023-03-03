import { z } from 'zod';

export const PostOrderByRelevanceFieldEnumSchema = z.enum(['title','images','authorId']);

export default PostOrderByRelevanceFieldEnumSchema;

import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','title','size','price','details','images','authorId','viewCount','createdAt','updatedAt']);

export default PostScalarFieldEnumSchema;

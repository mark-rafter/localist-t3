import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum(['id','title','size','price','details','images','authorId','viewCount','createdAt','approvedAt','updatedAt']);

export default PostScalarFieldEnumSchema;

import { z } from 'zod';
import { NullableJsonValue } from '../inputTypeSchemas/NullableJsonValue'
import { ItemSizeSchema } from '../inputTypeSchemas/ItemSizeSchema'

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  size: ItemSizeSchema,
  id: z.number().int(),
  title: z.string(),
  price: z.number().int(),
  details: NullableJsonValue.optional(),
  images: z.string().array(),
  authorId: z.string(),
  viewCount: z.number().int(),
  createdAt: z.coerce.date(),
  approvedAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.number().int().optional(),
  viewCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

export default PostSchema;

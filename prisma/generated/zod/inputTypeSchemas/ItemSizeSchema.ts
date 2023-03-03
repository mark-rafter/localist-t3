import { z } from 'zod';

export const ItemSizeSchema = z.enum(['xs','small','medium','large','xl']);

export type ItemSizeType = `${z.infer<typeof ItemSizeSchema>}`

export default ItemSizeSchema;

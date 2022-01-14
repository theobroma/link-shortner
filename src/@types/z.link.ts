import * as z from 'zod';

export const LinkResultSchema = z.object({
  code: z.string(),
  short_link: z.string(),
  full_short_link: z.string(),
  short_link2: z.string(),
  full_short_link2: z.string(),
  short_link3: z.string(),
  full_short_link3: z.string(),
  share_link: z.string(),
  full_share_link: z.string(),
  original_link: z.string(),
});

export const LinkResponseSchema = z.object({
  ok: z.boolean(),
  result: LinkResultSchema,
});

export type LinkResponseType = z.infer<typeof LinkResponseSchema>;

import { z, type SchemaContext, reference } from 'astro:content'
import { MONTHS_EN } from '@/types'

const months = z.enum(MONTHS_EN)

const SOWING_SCHEMAS = ['A', 'B', 'C', 'D'] as const

type month = (typeof MONTHS_EN)[number]

export const plantsSchema = ({ image }: SchemaContext) =>
  z
    .object({
      name: z.object({ latin: z.string(), german: z.string() }),
      description: z.string().optional(),
      height: z.number(),
      soil: z.array(z.enum(['moist', 'dry', 'normal', 'wet'])),
      sunExposure: z.array(z.enum(['full', 'semi-shade', 'shade'])),
      hardiness: z.enum(['hardy', 'tender']),
      spread: z.number(),
      flowerColor: z.array(
        z.enum([
          'red',
          'blue',
          'yellow',
          'white',
          'pink',
          'green',
          'brown',
          'orange',
          'violet',
        ]),
      ),
      toSow: z.boolean().default(false),
      foliageColor: z.enum(['green', 'red', 'silver']),
      lifecycle: z.enum(['annual', 'perennial', 'biennial', 'shrub', 'tree']),
      germination: z.enum(['cold', 'cool', 'normal']),
      sowingTime: z.array(months).optional(),
      sowingScheme: z.enum(SOWING_SCHEMAS).optional(),
      floweringSeason: z.array(months),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
          }),
        )
        .optional(),
      inStock: z.boolean().default(false),
      supplier: reference('suppliers'),
    })
    .refine(
      ({ sowingTime, sowingScheme }) => sowingTime || sowingScheme,
      'You need to either set a `sowingTime` or a `sowingScheme`.',
    )
    .transform(({ sowingTime, sowingScheme: sowingScheme, ...data }) => ({
      ...data,
      ...(sowingTime
        ? { sowingTime }
        : { sowingTime: sowingSchemeToSowingTime(sowingScheme!) }),
    }))

const sowingSchemeToSowingTime = (
  sowingScheme: (typeof SOWING_SCHEMAS)[number],
): month[] => {
  switch (sowingScheme) {
    case 'A':
      return ['september', 'october']
    case 'B':
      return ['february', 'march', 'april', 'may']
    case 'C':
      return ['march', 'april', 'may', 'june']
    case 'D':
      return ['april', 'may', 'june']
  }
}

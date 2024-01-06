import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import type { CollectionEntry } from 'astro:content'
import type { FC } from 'react'

export const PlantTable: FC<{
  plants: CollectionEntry<'plants'>[]
  caption: string
}> = ({ plants, caption }) => (
  <Table>
    <TableCaption>{caption}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>vorrätig</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {plants.map((plant) => (
        <TableRow key={plant.id}>
          <TableCell>{plant.data.name.german}</TableCell>
          <TableCell>
            {plant.data.inStock ? <CheckIcon /> : <Cross2Icon />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

import { DataResource, ImageSlideData, SlideData } from '@/components/ui/dia/types'
import { saveAs } from 'file-saver'
import { match } from 'ts-pattern'
import formatFilename from 'filenamify'

/**
 * Get slide data save resource
 */

export const getSlideSaveResource = (data: SlideData): null | DataResource => {
  return match(data)
    .with({ type: 'image' }, data => ({ src: data.src, title: data.alt }))
    .with({ type: 'pdf' }, data => ({ src: data.src, title: data.alt }))
    .with({ type: 'video' }, data => {
      const src = data.sources[0].src
      if (!src) return null
      return { src, title: data.alt }
    })
    .otherwise(() => null)
}

/**
 * Save resource as file
 */

export const saveResource = (resource: { src: string; title: string }) => {
  saveAs(resource.src, formatFilename(resource.title))
}

/**
 * Convert srcSet to string
 */

export const srcSetToValue = (srcSet: { src: string; width: number; height: number }[]): string => {
  return srcSet.map(entry => `${entry.src} ${entry.width}w`).join(', ')
}

/**
 * Resolve thumbnail src
 */

export const resolveThumbnailSrc = (data: ImageSlideData) => {
  if (data.thumbnailSrc) return data.thumbnailSrc
  const sorted = data.srcSet.toSorted((a, b) => a.width - b.width)
  if (sorted[0]) return sorted[0].src
  return data.src
}

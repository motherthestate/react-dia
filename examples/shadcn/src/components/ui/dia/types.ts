import { MinViableSlideData } from 'react-dia'

/**
 * Slide data types
 */

export type ImageSlideData = MinViableSlideData & {
  type: 'image'
  title: string
  srcSet: SrcSet
  alt: string
  size?: { width: number; height: number }
  src: string
  thumbnailSrc?: string
}

export type VideoSlideData = MinViableSlideData & {
  type: 'video'
  title: string
  alt: string
  sources: { src: string; type: string }[]
}

export type PDFSlideData = MinViableSlideData & {
  type: 'pdf'
  title: string
  alt: string
  src: string
}

export type SlideData = ImageSlideData | VideoSlideData | PDFSlideData

/**
 * Other
 */

export type DataResource = { src: string; title: string }
export type SrcSet = { src: string; width: number; height: number }[]

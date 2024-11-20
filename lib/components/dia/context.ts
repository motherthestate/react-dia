import React from 'react'
import { MinViableSlideData } from '../../types'

export const SliderContext = React.createContext<null | {
  slides: MinViableSlideData[]
  open: boolean
  setOpen: (open: boolean) => void
  slideIndex: number
  activeSlide: MinViableSlideData | null
  activeSlideId: null | string
  setActiveSlideId: (id: null | string) => void
  registerSlide: (slide: MinViableSlideData[]) => void
  unregisterSlide: (id: string[]) => void
  animate: boolean
  fullscreen: boolean
  setFullscreen: (value: boolean) => void
  setSlideFromIndex: (index: number | ((value: number) => number)) => void
  transformThreshold: number
  disableTransforms: boolean
  setDisableTransforms: (disable: boolean) => void
}>(null)

export const SlideContext = React.createContext<null | SlideContext>(null)

export type SlideContext<D extends MinViableSlideData = MinViableSlideData> = {
  data: D
  active: boolean
}

export const SliderContentContext = React.createContext<null | {
  container: React.RefObject<HTMLDivElement>
}>(null)

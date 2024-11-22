import React from 'react'

export const CarouselContext = React.createContext<null | {
  slidesInView: number[]
  lazy: boolean
}>(null)

import React from 'react'
import { CarouselContext } from './context'

export const useCarouselContext = () => {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error('react-dia: CarouselContext used outside Carousel')
  return context
}

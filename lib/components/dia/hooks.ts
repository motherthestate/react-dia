import React from 'react'
import { MinViableSlideData } from '../../types'
import { SlideContext, SliderContentContext, SliderContext } from './context'
import { of } from '../../functions/array'

export const useSliderContext = <D extends MinViableSlideData>(symbol: string = 'Unknown') => {
  const context = React.useContext(SliderContext) as null | SliderContext<D>
  if (!context) throw new Error(`react-dia: ${symbol} used outside .Root`)

  return context
}

export const useSliderContentContext = () => {
  const context = React.useContext(SliderContentContext)
  if (!context) throw new Error(`react-dia: ContentContext used outside .Content`)
  return context
}

export const useRegisterSlide = (
  slide: MinViableSlideData | MinViableSlideData[] | null,
  config: Partial<{ symbol: string }> = {}
) => {
  const context = useSliderContext(config.symbol)

  React.useEffect(() => {
    if (!slide) return
    const slides = of(slide)
    const stableIds = slides.map(s => s.id)
    context.registerSlide(slides.map(slide => ({ ...slide, id: slide.id })))
    return () => void context.unregisterSlide(stableIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide])
}

export const useSlideContext = <D extends MinViableSlideData>(symbol: string = 'Unknown') => {
  const context = React.useContext(SlideContext) as null | SlideContext<D>
  if (!context) throw new Error(`SlideContext: ${symbol} used outside .Root`)
  return context
}

import useEmblaCarousel from 'embla-carousel-react'
import { useSlideContext, useSliderContext } from '../dia/hooks'
import React from 'react'
import { CarouselContext } from './context'
import { useCarouselContext } from './hooks'

/**
 * Root
 */

type DiaCarouselProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  lazy?: boolean
  children: React.ReactElement
}

export const CarouselRoot: React.FC<DiaCarouselProps> = props => {
  const { lazy = true, ...elProps } = props

  const slider = useSliderContext()
  const [emblaRef, api] = useEmblaCarousel({ watchDrag: slider.disableTransforms, duration: 20 })
  const [slidesInView, setSlidesInView] = React.useState(Array<number>())

  React.useLayoutEffect(() => {
    if (!api) return
    api.scrollTo(slider.slideIndex, !slider.animate)
  }, [slider.slideIndex, slider.animate, api])

  React.useEffect(() => {
    if (!api) return
    const handle = (e: typeof api) => {
      setSlidesInView(e.slidesInView())
    }
    api.on('slidesInView', handle)
    return () => void api.off('slidesInView', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  React.useEffect(() => {
    if (!api) return
    const handle = (e: typeof api) => {
      slider.setSlideFromIndex(e.selectedScrollSnap())
    }
    api.on('select', handle)
    return () => void api.off('select', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <CarouselContext.Provider value={{ slidesInView, lazy }}>
      <div
        {...elProps}
        style={{
          overflow: 'hidden',
          ...elProps.style,
        }}
        ref={emblaRef}
      />
    </CarouselContext.Provider>
  )
}

/**
 *
 */

export const CarouselSlides: React.FC<React.ComponentProps<'div'>> = props => {
  const { ...elProps } = props

  return (
    <div
      {...elProps}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: 20,
        ...elProps.style,
      }}
    />
  )
}

/**
 *
 */

export const CarouselSlide: React.FC<React.ComponentProps<'div'>> = props => {
  const { children, ...elProps } = props
  const carousel = useCarouselContext()
  const slide = useSlideContext()

  const inView = React.useMemo(() => {
    if (!carousel.lazy) return true
    return carousel.slidesInView.includes(slide.index)
  }, [carousel.lazy, carousel.slidesInView, slide.index])

  return (
    <div
      {...elProps}
      style={{
        flex: '0 0 100%',
        minWidth: 0,
        ...elProps.style,
      }}
    >
      {inView ? children : null}
    </div>
  )
}

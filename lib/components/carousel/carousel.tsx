import useEmblaCarousel from 'embla-carousel-react'
import { useSliderContext } from '../dia/hooks'
import React from 'react'
import { CarouselContext } from './context'

/**
 * Root
 */

export const CarouselRoot: React.FC<
  Omit<React.ComponentProps<'div'>, 'children'> & { children: React.ReactElement }
> = props => {
  const { ...elProps } = props

  const slider = useSliderContext()
  const [emblaRef, api] = useEmblaCarousel({ watchDrag: slider.disableTransforms, duration: 20 })

  React.useLayoutEffect(() => {
    if (!api) return
    api.scrollTo(slider.slideIndex, !slider.animate)
  }, [slider.slideIndex, slider.animate, api])

  const interactedRef = React.useRef(false)

  React.useEffect(() => {
    if (!api) return
    const handle = (e: typeof api) => {
      // setSettled(false)
      const inView = e.slidesInView()
      const onlyIndex = inView.length === 1 ? inView[0] : undefined
      if (typeof onlyIndex === 'number' && interactedRef.current)
        slider.setSlideFromIndex(onlyIndex)
    }
    api.on('slidesInView', handle)
    return () => void api.off('slidesInView', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  React.useEffect(() => {
    if (!api) return
    const handle = () => {
      console.log('select')
      interactedRef.current = true
    }
    api.on('select', handle)
    return () => void api.off('select', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <CarouselContext.Provider value={{ settled: true }}>
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
  const { ...elProps } = props

  return (
    <div
      {...elProps}
      style={{
        flex: '0 0 100%',
        minWidth: 0,
        ...elProps.style,
      }}
    />
  )
}

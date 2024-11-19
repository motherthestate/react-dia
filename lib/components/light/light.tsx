import { Slot } from '@radix-ui/react-slot'
import FocusTrap from 'focus-trap-react'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { RemoveScroll } from 'react-remove-scroll'
import screenfull from 'screenfull'
import { useOnClickOutside } from 'usehooks-ts'
import { MinViableSlideData } from '../../types'
import { Portal } from '../portal'
import { SlideContext, SliderContext } from './context'
import { useLightSliderContext, useRegisterSlide } from './hooks'

/**
 * Root
 */

export const LightRoot: React.FC<{
  children: React.ReactNode
}> = props => {
  const [slides, setSlides] = React.useState(Array<MinViableSlideData>())
  const [activeSlideId, setActiveSlideId] = React.useState<null | string>(null)
  const [open, setOpen] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)

  const animate = React.useDeferredValue(open)

  React.useEffect(() => {
    const handler = () => void setFullscreen(!!document.fullscreenElement)
    window.addEventListener('fullscreenchange', handler)
    return () => window.removeEventListener('fullscreenchange', handler)
  }, [])

  const activeSlide = React.useMemo(() => {
    return slides.find(s => s.id === activeSlideId) ?? null
  }, [activeSlideId, slides])

  const slideIndex = React.useMemo(() => {
    const index = slides.findIndex(slide => slide.id === activeSlideId)
    return Math.max(0, index)
  }, [slides, activeSlideId])

  const setSlideFromIndex = (index: number | ((value: number) => number)) => {
    const reduce = typeof index === 'function' ? index : () => index
    const nextIndex = Math.max(0, Math.min(reduce(slideIndex), slides.length - 1))
    const slide = slides[nextIndex]
    if (slide) setActiveSlideId(slide.id)
  }

  const registerSlide = (slides: MinViableSlideData[]) => {
    const ids = slides.map(s => s.id)
    setSlides(current => [...current.filter(s => !ids.includes(s.id)), ...slides])
  }

  const unregisterSlide = (ids: string[]) => {
    setSlides(current => current.filter(slide => !ids.includes(slide.id)))
  }

  useHotkeys('ArrowRight', () => setSlideFromIndex(index => index + 1), {
    preventDefault: true,
    enabled: open,
    enableOnFormTags: false,
    enableOnContentEditable: false,
  })

  useHotkeys('ArrowLeft', () => setSlideFromIndex(index => index - 1), {
    preventDefault: true,
    enabled: open,
    enableOnFormTags: false,
    enableOnContentEditable: false,
  })

  return (
    <SliderContext.Provider
      value={{
        slides,
        open,
        setOpen,
        slideIndex,
        activeSlide,
        activeSlideId,
        setActiveSlideId,
        registerSlide,
        unregisterSlide,
        animate,
        fullscreen,
        setFullscreen,
        setSlideFromIndex,
      }}
    >
      {props.children}
    </SliderContext.Provider>
  )
}

/**
 * Open
 */

export const LightOpen: React.FC<{ children: React.ReactNode }> = props => {
  const context = useLightSliderContext('Slider')
  if (!context.open) return null
  return props.children
}

/**
 * Portal
 */

type SliderProps<D> = React.ComponentProps<'div'>

export const LightPortal = <D,>() =>
  React.forwardRef<HTMLDivElement, SliderProps<D>>((props, ref) => {
    const { ...elProps } = props
    return <Portal {...elProps} ref={ref}></Portal>
  })

/**
 * Overlay
 */

type LightOverlayProps = React.ComponentProps<'div'>

export const LightOverlayOpen: React.FC<LightOverlayProps> = props => {
  return (
    <LightOpen>
      <LightOverlay {...props} />
    </LightOpen>
  )
}

export const LightOverlay: React.FC<LightOverlayProps> = props => {
  return <div aria-hidden {...props} />
}

/**
 * Content
 */

type LightContentProps = React.ComponentProps<'div'> & {
  trapFocus?: boolean
  scrollLock?: boolean
}

export const LightContentOpen: React.FC<LightContentProps> = props => {
  return (
    <LightOpen>
      <LightContent {...props} />
    </LightOpen>
  )
}

export const LightContent: React.FC<LightContentProps> = props => {
  const { trapFocus = true, scrollLock = true, ...elProps } = props

  const context = useLightSliderContext('Slider Content')
  const containerRef = React.useRef<HTMLDivElement>(null)

  /**
   * Dismissals
   */

  useHotkeys('Escape', e => context.setOpen(false), {
    enableOnFormTags: false,
    enableOnContentEditable: false,
    keyup: true,
    keydown: false,
  })

  useOnClickOutside(containerRef, () => {
    context.setOpen(false)
  })

  /**
   * Fullscreen
   */

  React.useEffect(() => {
    if (!containerRef.current) return

    if (context.fullscreen) {
      screenfull.request(containerRef.current)
    } else {
      screenfull.exit()
    }
  }, [context.fullscreen])

  return (
    <FocusTrap active={trapFocus} containerElements={[containerRef.current!]}>
      <RemoveScroll enabled={scrollLock} as={Slot} allowPinchZoom shards={[containerRef.current!]}>
        <div {...elProps} ref={containerRef}></div>
      </RemoveScroll>
    </FocusTrap>
  )
}

/**
 * Slides
 */

type SliderSlidesProps<D> = {
  children: (slideData: D) => React.ReactNode
}

export const LightSlideSlides = <D extends { type: string }>(props: SliderSlidesProps<D>) => {
  const { children: slideFromData } = props

  const context = useLightSliderContext('Slides')

  return (
    <>
      {context.slides.map(slideData => {
        return (
          <SlideContext.Provider
            key={slideData.id}
            value={{
              data: slideData,
              active: context.activeSlideId === slideData.id,
            }}
          >
            {slideFromData(slideData as any)}
          </SlideContext.Provider>
        )
      })}
    </>
  )
}

/**
 * Active slide
 */

type SliderActiveProps<D> = {
  children: (slideData: D) => React.ReactNode
}

export const LightSlideActive = <D extends { type: string }>(props: SliderActiveProps<D>) => {
  const { children: slideFromData } = props

  const context = useLightSliderContext('Content')
  if (!context.activeSlide) return null

  return <>{slideFromData(context.activeSlide as any)}</>
}

/**
 * Slide
 */

export const LightSlide = <D extends MinViableSlideData>(props: { data: D }) => {
  useRegisterSlide(props.data)
  return null
}

/**
 * Close
 */

type CloseProps = React.ComponentProps<'button'> & {
  asChild?: boolean
}

export const LightClose = React.forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const { asChild, ...elProps } = props

  const context = useLightSliderContext('Close')

  const Container = asChild ? Slot : 'button'

  return (
    <Container onClick={() => context.setOpen(false)} {...elProps} ref={ref}>
      {props.children}
    </Container>
  )
})

/**
 * Close
 */

type TriggerProps<D> =
  | (React.ComponentProps<'button'> & {
      id: string
      data?: undefined
      asChild?: boolean
    })
  | (React.ComponentProps<'button'> & {
      data: D
      asChild?: boolean
    })

export const LightTrigger = <D extends MinViableSlideData>() =>
  React.forwardRef<HTMLButtonElement, TriggerProps<D>>((props, ref) => {
    const { asChild, ...elProps } = props

    // resolve some data id
    const dataId = props.data ? props.data.id : props.id
    if (!dataId) throw new Error('Trigger: no data.id or props.id provided')

    useRegisterSlide(props.data ?? null, { symbol: 'Trigger' })
    const context = useLightSliderContext('Trigger')

    const Container = asChild ? Slot : 'button'

    return (
      <Container
        onClick={() => {
          context.setActiveSlideId(dataId)
          context.setOpen(true)
        }}
        {...elProps}
        ref={ref}
      >
        {props.children}
      </Container>
    )
  })

/**
 * Buttons
 */

type LightButtonProps =
  | (React.ComponentProps<'button'> & { asChild?: false })
  | { asChild: true; children: React.ReactElement }

export const LightPrevious = React.forwardRef<HTMLButtonElement, LightButtonProps>((props, ref) => {
  const { asChild, ...elProps } = props
  const Button = asChild ? Slot : 'button'
  const context = useLightSliderContext('Previous')

  return (
    <Button onClick={() => context.setSlideFromIndex(index => index - 1)} {...elProps} ref={ref} />
  )
})

export const LightNext = React.forwardRef<HTMLButtonElement, LightButtonProps>((props, ref) => {
  const { asChild, ...elProps } = props
  const Button = asChild ? Slot : 'button'
  const context = useLightSliderContext('Next')

  return (
    <Button onClick={() => context.setSlideFromIndex(index => index + 1)} {...elProps} ref={ref} />
  )
})

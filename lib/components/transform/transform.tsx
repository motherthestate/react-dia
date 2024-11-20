import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import useMeasure from 'react-use-measure'
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
  useControls,
  useTransformEffect,
} from 'react-zoom-pan-pinch'
import { useSlideContext, useSliderContext } from '../dia/hooks'
import { TransformContext } from './context'

/**
 * Transform
 */

export type TransformRootProps = React.ComponentProps<'div'> & {
  minScale?: number
  maxScale?: number
}

export const TransformRoot: React.FC<TransformRootProps> = props => {
  const { minScale = 0.9, maxScale = 9, children: transformChildren, ...elProps } = props

  const [ref, bounds] = useMeasure()
  const [scale, setScale] = React.useState(1)

  const slider = useSliderContext()
  const slide = useSlideContext()

  const transformRef = React.useRef<ReactZoomPanPinchContentRef>(null)

  const updateScale = (value: number) => {
    if (!transformRef.current) return

    const factor = Math.log(value / scale)
    const { zoomIn, zoomOut } = transformRef.current

    if (value > scale) {
      zoomIn(factor, 0)
    } else {
      zoomOut(-factor, 0)
    }

    setScale(value)
  }

  return (
    <TransformContext.Provider
      value={{
        scale,
        minScale,
        maxScale,
        setScale: updateScale,
      }}
    >
      <div
        {...elProps}
        style={
          {
            width: '100%',
            height: '100%',
            overflow: 'clip',
            display: 'flex',
            ...elProps.style,
            '--dia-transform-bounds-height': `${bounds.height}px`,
            '--dia-transform-bounds-width': `${bounds.width}px`,
          } as React.CSSProperties
        }
        ref={ref}
      >
        {bounds.height > 0 && bounds.width > 0 && (
          <TransformWrapper
            disabled={!slide.active}
            ref={transformRef}
            centerOnInit
            minScale={minScale}
            maxScale={maxScale}
            key={`${bounds.width}x${bounds.height}`}
            wheel={{ step: 1 }}
            pinch={{ step: 1 }}
            panning={{ disabled: slider.disableTransforms }}
            onZoomStop={e => {
              console.log(e.state.scale)
              setScale(e.state.scale)
            }}
            onZoom={e => {
              setScale(e.state.scale)
            }}
          >
            {transformChildren}
          </TransformWrapper>
        )}
      </div>
    </TransformContext.Provider>
  )
}

const TransformEffects: React.FC<unknown> = props => {
  const context = useControls()
  const slider = useSliderContext()
  const slide = useSlideContext()

  React.useEffect(() => {
    if (!slide.active) {
      context.resetTransform(0)
      context.centerView(1, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.active])

  useTransformEffect(({ state }) => {
    slider.setDisableTransforms(state.scale <= 1 + slider.transformThreshold)
  })

  return null
}

/**
 * Content
 */

type TransformComponentProps = Parameters<typeof TransformComponent>[0]

export const TransformContent: React.FC<TransformComponentProps> = props => {
  const { ...elProps } = props

  return (
    <TransformComponent
      {...elProps}
      wrapperStyle={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        ...elProps.wrapperStyle,
      }}
    >
      <TransformEffects />
      <Slot
        style={{
          maxHeight: 'var(--dia-transform-bounds-height)',
          maxWidth: 'var(--dia-transform-bounds-width)',
        }}
      >
        {props.children}
      </Slot>
    </TransformComponent>
  )
}

/**
 * Controls
 */

export const TransformControls: React.FC<{ children: React.ReactNode }> = props => {
  const slide = useSlideContext()
  if (!slide.active) return null
  return props.children
}

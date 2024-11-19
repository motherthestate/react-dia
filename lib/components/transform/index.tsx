import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import useMeasure from 'react-use-measure'
import {
  TransformComponent,
  TransformWrapper,
  useControls,
  useTransformEffect,
} from 'react-zoom-pan-pinch'
import { useSlideContext, useSliderContext } from '../dia/hooks'

/**
 * Transform
 */

export const SlideTransform: React.FC<{ children: React.ReactElement }> = props => {
  const [ref, bounds] = useMeasure()
  const slider = useSliderContext()

  return (
    <div
      ref={ref}
      style={
        {
          width: '100%',
          height: '100%',
          overflow: 'clip',
          display: 'flex',
          '--dia-transform-bounds-height': `${bounds.height}px`,
          '--dia-transform-bounds-width': `${bounds.width}px`,
        } as React.CSSProperties
      }
    >
      {bounds.height > 0 && bounds.width > 0 && (
        <TransformWrapper
          centerOnInit
          key={`${bounds.width}x${bounds.height}`}
          wheel={{ step: 1 }}
          pinch={{ step: 1 }}
          panning={{ disabled: slider.disableTransforms }}
        >
          <TransformComponent wrapperClass='size-full overflow-hidden flex'>
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
        </TransformWrapper>
      )}
    </div>
  )
}

const TransformEffects: React.FC<unknown> = props => {
  const context = useControls()
  const slider = useSliderContext()
  const slide = useSlideContext()

  React.useEffect(() => {
    if (!slide.active) context.resetTransform(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.active])

  useTransformEffect(({ state }) => {
    slider.setDisableTransforms(state.scale <= 1 + slider.transformThreshold)
  })

  return null
}

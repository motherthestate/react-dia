import { Button } from '@/components/ui/button'
import { Dia } from '@/components/ui/dia'
import { ImageSlideData } from '@/components/ui/dia/types'
import { resolveThumbnailSrc, srcSetToValue } from '@/components/ui/dia/utils'
import { Slider } from '@/components/ui/slider'
import { ArrowsOut, Minus, Plus } from '@phosphor-icons/react'
import React from 'react'
import { DiaTransform, useTransform, useTransformControls } from 'react-dia'

/**
 * Image Slide
 */

export const ImageSlide: React.FC<{ data: ImageSlideData }> = props => {
  const { data } = props

  return (
    <DiaTransform.Root className='relative'>
      <DiaTransform.Content>
        <img
          alt={data.alt}
          srcSet={srcSetToValue(data.srcSet)}
          src={data.srcSet.length === 0 ? data.src : undefined}
          className='h-auto max-h-full w-auto max-w-full'
        />
      </DiaTransform.Content>

      <DiaTransform.Controls>
        <Dia.ContentPortal>
          <ImageTransformControls />
        </Dia.ContentPortal>
      </DiaTransform.Controls>
    </DiaTransform.Root>
  )
}

export const ImageThumbnail: React.FC<{ data: ImageSlideData }> = props => {
  const { data } = props

  return (
    <img
      alt={`${data.alt} - Thumbnail`}
      src={resolveThumbnailSrc(data)}
      className='pointer-events-none h-auto max-h-full w-auto mx-auto my-auto'
    />
  )
}

export const ImageTransformControls: React.FC<unknown> = () => {
  const controls = useTransformControls()
  const transform = useTransform()

  return (
    <div
      onClick={e => e.stopPropagation()}
      className='dia-controls pointer-events-none absolute bottom-[4.6rem] left-0 right-0 z-20 flex h-min w-full gap-3 select-none group-data-[state-ui=hidden]/dia-content:opacity-0 transition-opacity'
    >
      <div className='dark text-white pointer-events-auto mx-auto my-auto flex items-center rounded-full bg-zinc-800 p-1.5 gap-0 shadow-modal-lg shadow-2xl'>
        <Button
          size='icon'
          variant='ghost'
          className='shrink-0 rounded-full'
          onClick={() => controls.zoomOut()}
        >
          <Minus className='mx-auto my-auto size-4' />
        </Button>

        <Slider
          className='shrink-0 w-[5.2rem] mx-3'
          max={transform.maxScale}
          min={transform.minScale}
          step={1 / 10}
          value={[transform.scale]}
          onValueChange={([value]) => {
            if (typeof value === 'number') transform.setScale(value)
          }}
        />

        <Button
          size='icon'
          variant='ghost'
          className='shrink-0 rounded-full'
          onClick={() => controls.resetTransform()}
        >
          <ArrowsOut className='mx-auto my-auto size-4' />
        </Button>

        <Button
          size='icon'
          variant='ghost'
          className='shrink-0 rounded-full'
          onClick={() => controls.zoomIn()}
        >
          <Plus className='mx-auto my-auto size-4' />
        </Button>
      </div>
    </div>
  )
}

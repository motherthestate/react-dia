import { ArrowsOut, CaretLeft, CaretRight, Minus, Plus } from '@phosphor-icons/react'
import React from 'react'
import { match } from 'ts-pattern'
import {
  DiaCarousel,
  DiaTransform,
  Dia as BaseDia,
  WithData,
  useSlider,
  useTransformControls,
  useTransform,
  Share,
  useSlide,
} from '../lib/main'
import * as Slider from '@radix-ui/react-slider'

const ImageSlide: React.FC<{ data: ImageData }> = props => {
  const slide = useSlide()

  return (
    <DiaTransform.Root className='relative'>
      <DiaTransform.Content>
        <img
          src={props.data.src}
          className='max-w-full max-h-full w-auto h-auto data-[state="active"]:opacity-100 opacity-25 transition-opacity'
          data-state={slide.active ? 'active' : ''}
        />
      </DiaTransform.Content>

      <DiaTransform.Controls>
        <Dia.ContentPortal>
          <SlideControls />
        </Dia.ContentPortal>
      </DiaTransform.Controls>
    </DiaTransform.Root>
  )
}

const SlideControls: React.FC<unknown> = props => {
  const controls = useTransformControls()
  const transform = useTransform()

  return (
    <div className='dia-controls absolute top-0 h-full bottom-0 right-20 flex gap-3 z-20 text-white'>
      <div className='bg-gray-900 flex-col p-1.5 rounded-full mx-auto flex items-center my-auto border-white/10 border-[1px]'>
        <button
          className='size-10 flex hover:bg-white/20 rounded-full'
          onClick={() => {
            controls.zoomIn()
          }}
        >
          <Plus className='size-4 mx-auto my-auto' />
        </button>

        <Slider.Root
          orientation='vertical'
          className='h-[3.2rem] relative flex flex-col items-center select-none touch-none w-2 my-3'
          value={[transform.scale]}
          onValueChange={([value]) => {
            transform.setScale(value)
          }}
          max={transform.maxScale}
          min={transform.minScale}
          step={0.01}
        >
          <Slider.Track className='bg-white/20 w-1 rounded-full flex-grow'>
            <Slider.Range className='' />
          </Slider.Track>
          <Slider.Thumb className='size-3 bg-white rounded-full block ' />
        </Slider.Root>

        <button
          className='size-10 flex hover:bg-white/20 rounded-full disabled:opacity-25'
          onClick={() => controls.resetTransform()}
          disabled={transform.scale !== 1}
        >
          <ArrowsOut className='size-4 mx-auto my-auto' />
        </button>

        <button
          className='size-10 flex hover:bg-white/20 rounded-full'
          onClick={() => controls.zoomOut()}
        >
          <Minus className='size-4 mx-auto my-auto' />
        </button>
      </div>
    </div>
  )
}

const VideoSlide: React.FC<{ data: VideoData }> = props => {
  return <div>video: {props.data.alt}</div>
}

const dataEntries: Data[] = [
  { id: 'a', type: 'image', alt: 'a', src: '/assets/birds/a.jpg' },
  { id: 'b', type: 'image', alt: 'b', src: '/assets/birds/b.jpg' },
  { id: 'c', type: 'image', alt: 'c', src: '/assets/birds/c.jpg' },
  { id: 'd', type: 'image', alt: 'd', src: '/assets/birds/d.jpg' },
]

const Page: React.FC<unknown> = () => {
  return (
    <div>
      <div className='flex gap-3'>
        {dataEntries.map(data => {
          return (
            <Dia.Trigger key={data.id} asChild data={data}>
              <button>{data.id}</button>
            </Dia.Trigger>
          )
        })}
      </div>

      <div className='flex flex-col'>
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu erat non massa
            congue congue. Morbi at mauris sapien. Etiam lacinia quam ipsum, quis consequat metus
            consectetur a. Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Maecenas ultrices malesuada urna, eget accumsan nisl lobortis
            quis. Integer libero massa, pellentesque at turpis id, rhoncus hendrerit sem. Cras diam
            nisi, aliquet eget lectus non, ultrices semper nisi. Proin quis pellentesque velit, ac
            euismod magna. Sed quis egestas libero.
          </p>
        ))}
      </div>
    </div>
  )
}

const Example: React.FC<unknown> = props => {
  const slider = useSlider()

  return (
    <Dia.Portal>
      <Dia.Overlay className='fixed inset-0 size-full bg-black/30' />

      <Dia.Content className='fixed rounded-t-2xl overflow-hidden inset-0 top-12 overscroll-none flex flex-col w-full bg-black text-white select-none'>
        <div className='flex absolute top-0 left-0 right-0 z-20 bg-black/50 px-6 py-4 gap-4 justify-end'>
          <Dia.ActiveSlide>
            {slide => (
              <button onClick={() => slider.setFullscreen(!slider.fullscreen)}>
                {slider.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              </button>
            )}
          </Dia.ActiveSlide>

          <Dia.ActiveSlide>
            {data => (
              <Share asChild shareData={{ title: data.alt }}>
                <button>Share</button>
              </Share>
            )}
          </Dia.ActiveSlide>

          <button onClick={() => slider.setFullscreen(!slider.fullscreen)}>
            {slider.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          </button>

          <Dia.Close asChild>
            <button>Close</button>
          </Dia.Close>
        </div>

        <Dia.Previous asChild>
          <button className='size-10 absolute left-3 top-[50%] translate-y-[-50%] z-20 flex justify-center items-center disabled:opacity-25'>
            <CaretLeft className='size-5' />
          </button>
        </Dia.Previous>

        <Dia.Next asChild>
          <button className='size-10 absolute right-3 top-[50%] translate-y-[-50%] z-20 flex justify-center items-center disabled:opacity-25'>
            <CaretRight className='size-5' />
          </button>
        </Dia.Next>

        <Dia.ActiveSlide>
          {slide => (
            <div className='bg-black/50 p-3 absolute pointer-events-none bottom-0 left-0 right-0 z-20'>
              {slide.alt}
            </div>
          )}
        </Dia.ActiveSlide>

        <DiaCarousel.Root className='size-full'>
          <DiaCarousel.Slides>
            <Dia.Slides>
              {data => {
                return (
                  <DiaCarousel.Slide key={data.id}>
                    {match(data)
                      .with({ type: 'image' }, data => <ImageSlide data={data} />)
                      .with({ type: 'video' }, data => <VideoSlide data={data} />)
                      .otherwise(() => null)}
                  </DiaCarousel.Slide>
                )
              }}
            </Dia.Slides>
          </DiaCarousel.Slides>
        </DiaCarousel.Root>
      </Dia.Content>
    </Dia.Portal>
  )
}

export const App = () => {
  return (
    <Dia.Root>
      <div className='p-4'>
        <Page />
      </div>

      <Example />
    </Dia.Root>
  )
}

/**
 * Types
 */

type ImageData = {
  id: string
  type: 'image'
  alt: string
  src: string
}

type VideoData = {
  id: string
  type: 'video'
  src: string
  alt: string
}

type Data = ImageData | VideoData

const Dia = BaseDia as WithData<Data>

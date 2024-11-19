import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useMeasure from 'react-use-measure'
import {
  TransformComponent,
  TransformWrapper,
  useControls,
  useTransformEffect,
} from 'react-zoom-pan-pinch'
import { match } from 'ts-pattern'
import { Light, WithData, useSlide, useSlider } from '../lib/main'

const ImageSlide: React.FC<{ data: ImageData }> = props => {
  const [ref, bounds] = useMeasure()

  return (
    <div
      className='size-full overflow-hidden flex'
      ref={ref}
      style={
        {
          '--bounds-height': `${bounds.height}px`,
          '--bounds-width': `${bounds.width}px`,
        } as React.CSSProperties
      }
    >
      {bounds.height > 0 && (
        <TransformWrapper
          centerOnInit
          key={`${bounds.width}x${bounds.height}`}
          wheel={{ step: 1 }}
          pinch={{ step: 1 }}
        >
          <TransformControls />
          <TransformComponent wrapperClass='size-full overflow-hidden flex'>
            <img
              src={props.data.src}
              className='max-w-full max-h-[var(--bounds-height)] w-auto h-auto'
            />
          </TransformComponent>
        </TransformWrapper>
      )}
    </div>
  )
}

const TransformControls: React.FC<unknown> = props => {
  const context = useControls()
  const slide = useSlide<ImageData>()

  React.useEffect(() => {
    if (!slide.active) context.resetTransform(0)
  }, [slide.active])

  return <div></div>
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
            <LightCustom.Trigger key={data.id} asChild data={data}>
              <button className='focus:bg-red-500'>{data.id}</button>
            </LightCustom.Trigger>
          )
        })}
      </div>

      <div className='flex flex-col'>
        {Array.from({ length: 1000 }).map((_, i) => (
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

const Slider: React.FC<unknown> = props => {
  const slider = useSlider()

  const [emblaRef, api] = useEmblaCarousel({ watchDrag: false, duration: 20 })

  React.useLayoutEffect(() => {
    if (!api) return
    api.scrollTo(slider.slideIndex, !slider.animate)
  }, [slider.slideIndex, slider.animate, api])

  return (
    <LightCustom.Portal>
      <LightCustom.Overlay className='fixed inset-0 size-full bg-black/10' />

      <LightCustom.Content className='fixed rounded-t-2xl overflow-hidden inset-0 top-12 overscroll-none flex flex-col w-full bg-black text-white select-none'>
        <div className='flex absolute top-0 left-0 right-0 z-20 bg-black/50'>
          <LightCustom.Close asChild>
            <button>Close</button>
          </LightCustom.Close>

          <div className='flex'>
            <LightCustom.Previous asChild>
              <button>Prev</button>
            </LightCustom.Previous>

            <LightCustom.Next asChild>
              <button>Next</button>
            </LightCustom.Next>

            <button onClick={() => slider.setFullscreen(true)}>Fullscreen</button>
          </div>
        </div>

        {/* <LightCustom.ActiveSlide>
          {data => {
            return match(data)
              .with({ type: 'image' }, data => 'Image')
              .with({ type: 'video' }, data => 'Video')
              .otherwise(() => null)
          }}
        </LightCustom.ActiveSlide> */}

        <div className='embla size-full' ref={emblaRef}>
          <div className='embla__container size-full'>
            <LightCustom.Slides>
              {data => {
                return (
                  <div className='embla__slide' key={data.id}>
                    {match(data)
                      .with({ type: 'image' }, data => <ImageSlide data={data} />)
                      .with({ type: 'video' }, data => <VideoSlide data={data} />)
                      .otherwise(() => null)}
                  </div>
                )
              }}
            </LightCustom.Slides>
          </div>
        </div>

        {/* <div className='flex items-center justify-center gap-4 absolute bottom-12 left-0 right-0'>
          {slider.slides.slice().map(slide => {
            return (
              <LightCustom.Trigger key={slide.id} id={slide.id} asChild>
                <button>{slide.id}</button>
              </LightCustom.Trigger>
            )
          })}
        </div> */}
      </LightCustom.Content>
    </LightCustom.Portal>
  )
}

export const App = () => {
  return (
    <LightCustom.Root>
      <LightCustom.Root>
        <div className='p-4'>
          <Page />
        </div>

        <Slider />
      </LightCustom.Root>
    </LightCustom.Root>
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

const LightCustom = Light as WithData<Data>

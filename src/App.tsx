import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import { match } from 'ts-pattern'
import { SlideTransform } from '../lib/components/transform'
import { Dia, WithData, useSlider } from '../lib/main'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { takeOnly } from '../lib/functions/array'

const ImageSlide: React.FC<{ data: ImageData }> = props => {
  return (
    <SlideTransform>
      <img src={props.data.src} className='max-w-full max-h-full w-auto h-auto' />
    </SlideTransform>
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
            <DiaCustom.Trigger key={data.id} asChild data={data}>
              <button className='focus:bg-red-500'>{data.id}</button>
            </DiaCustom.Trigger>
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

const Slider: React.FC<unknown> = props => {
  const slider = useSlider()
  const [emblaRef, api] = useEmblaCarousel({ watchDrag: slider.disableTransforms, duration: 20 })

  React.useLayoutEffect(() => {
    if (!api) return
    api.scrollTo(slider.slideIndex, !slider.animate)
  }, [slider.slideIndex, slider.animate, api])

  React.useEffect(() => {
    if (!api) return
    const handle = (e: typeof api) => {
      const inView = e.slidesInView()
      const onlyIndex = inView.length === 1 ? inView[0] : undefined
      if (typeof onlyIndex === 'number') slider.setSlideFromIndex(onlyIndex)
    }
    api.on('slidesInView', handle)
    return () => void api.off('slidesInView', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <DiaCustom.Portal>
      <DiaCustom.Overlay className='fixed inset-0 size-full bg-black/30' />

      <DiaCustom.Content className='fixed rounded-t-2xl overflow-hidden inset-0 top-12 overscroll-none flex flex-col w-full bg-black text-white select-none'>
        <div className='flex absolute top-0 left-0 right-0 z-20 bg-black/50 px-6 py-4 gap-4 justify-end'>
          <DiaCustom.Close asChild>
            <button>Close</button>
          </DiaCustom.Close>

          <button onClick={() => slider.setFullscreen(!slider.fullscreen)}>
            {slider.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          </button>
        </div>

        <DiaCustom.Previous asChild>
          <button className='size-10 absolute left-3 top-[50%] translate-y-[-50%] z-20 flex justify-center items-center disabled:opacity-25'>
            <CaretLeft className='size-5' />
          </button>
        </DiaCustom.Previous>

        <DiaCustom.Next asChild>
          <button className='size-10 absolute right-3 top-[50%] translate-y-[-50%] z-20 flex justify-center items-center disabled:opacity-25'>
            <CaretRight className='size-5' />
          </button>
        </DiaCustom.Next>

        <div className='embla size-full' ref={emblaRef}>
          <div className='embla__container size-full'>
            {/* {slider.slides.map(() => {})} */}

            <DiaCustom.Slides>
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
            </DiaCustom.Slides>
          </div>
        </div>
      </DiaCustom.Content>
    </DiaCustom.Portal>
  )
}

export const App = () => {
  return (
    <DiaCustom.Root>
      <DiaCustom.Root>
        <div className='p-4'>
          <Page />
        </div>

        <Slider />
      </DiaCustom.Root>
    </DiaCustom.Root>
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

const DiaCustom = Dia as WithData<Data>

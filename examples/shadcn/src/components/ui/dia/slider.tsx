import { AutoSlider } from '@/components/ui/auto-slider'
import { Button } from '@/components/ui/button'
import { useStillTap } from '@/components/ui/dia/hooks'
import { ImageSlide, ImageThumbnail } from '@/components/ui/dia/slide-image'
import { PDFSlide } from '@/components/ui/dia/slide-pdf'
import { VideoSlide } from '@/components/ui/dia/slide-video'
import { SlideData } from '@/components/ui/dia/types'
import { getSlideSaveResource, saveResource } from '@/components/ui/dia/utils'
import { cn as cx } from '@/lib/utils'
import {
  ArrowsOut,
  CaretLeft,
  CaretRight,
  DownloadSimple,
  FilePdf,
  Info,
  MonitorPlay,
  Share as ShareIcon,
  X as XIcon,
} from '@phosphor-icons/react'
import React from 'react'
import { DiaCarousel, Share as DiaShare, Dia as ReactDia, useSlider, WithData } from 'react-dia'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import { match } from 'ts-pattern'

export const Dia = ReactDia as WithData<SlideData>

const DiaRoot = Dia.Root
const DiaTrigger = Dia.Trigger
const DiaPortal = Dia.Portal
const DiaContentPortal = Dia.ContentPortal
const DiaSlides = Dia.Slides
const DiaSlide = Dia.Slide

/**
 * Overlay
 */

type DiaOverlayProps = React.ComponentProps<typeof Dia.Overlay>

const DiaOverlay = React.forwardRef<HTMLDivElement, DiaOverlayProps>((props, ref) => {
  const { ...overlayProps } = props

  return <Dia.Overlay {...overlayProps} ref={ref}></Dia.Overlay>
})

/**
 * Content
 */

type DiaContentProps = React.ComponentProps<typeof Dia.Content>

const DiaContent = React.forwardRef<HTMLDivElement, DiaContentProps>((props, ref) => {
  const { ...contentProps } = props
  const slider = useSlider()
  const [hideUI, setHideUI] = React.useState(false)

  const bindStillTap = useStillTap(() => setHideUI(hide => !hide))

  return (
    <Dia.Portal>
      <Dia.Overlay className='bg-black/40 fixed inset-0 size-full' />

      <Dia.Content
        {...contentProps}
        ref={ref}
        data-state-ui={hideUI ? 'hidden' : 'visible'}
        className='group/dia-content animate-appear text-white duration-300 bg-black fixed inset-0 transition-all data-[state-ui=visible]:top-12 data-[state-ui=visible]:rounded-t-3xl overflow-hidden w-full flex flex-col isolate'
      >
        <div className='flex absolute top-0 left-0 right-0 justify-between w-full p-4 z-20 group-data-[state-ui=hidden]/dia-content:opacity-0 transition-opacity'>
          <div />

          <div className='flex gap-1'>
            <SliderMenubar />

            <Button
              size='icon'
              variant='ghost'
              onClick={() => slider.setFullscreen(!slider.fullscreen)}
            >
              <ArrowsOut />
            </Button>

            <Dia.Close asChild>
              <Button size='icon' variant='ghost'>
                <XIcon />
              </Button>
            </Dia.Close>
          </div>
        </div>

        <Dia.Previous asChild>
          <Button
            size='icon'
            variant='ghost'
            className='absolute left-5 top-1/2 -translate-y-1/2 z-20 disabled:!pointer-events-auto'
          >
            <CaretLeft />
          </Button>
        </Dia.Previous>

        <Dia.Next asChild>
          <Button
            size='icon'
            variant='ghost'
            className='absolute right-5 top-1/2 -translate-y-1/2 z-20 disabled:!pointer-events-auto'
          >
            <CaretRight />
          </Button>
        </Dia.Next>

        <DiaCarousel.Root
          lazy
          {...bindStillTap()}
          className={
            'flex-1 group-data-[state-ui=visible]/dia-content:rounded-b-3xl transition-colors overflow-hidden group-data-[state-ui=visible]/dia-content:bg-zinc-950'
          }
        >
          <DiaCarousel.Slides>
            <Dia.Slides>
              {data => (
                <DiaCarousel.Slide
                  data-state={slider.activeSlideId === data.id ? 'active' : ''}
                  className='opacity-15 data-[state="active"]:opacity-100 transition-opacity'
                >
                  {match(data)
                    .with({ type: 'image' }, data => <ImageSlide data={data} />)
                    .with({ type: 'video' }, data => <VideoSlide data={data} />)
                    .with({ type: 'pdf' }, data => <PDFSlide data={data} />)
                    .exhaustive()}
                </DiaCarousel.Slide>
              )}
            </Dia.Slides>
          </DiaCarousel.Slides>
        </DiaCarousel.Root>

        <div className='pointer-events-none bg-gradient-to-t from-black/70 to-transparent absolute bottom-0 left-0 right-0 h-[7rem] group-data-[state-ui=hidden]/dia-content:opacity-0 transition-opacity'></div>
        <div className='pointer-events-none bg-gradient-to-b from-black/30 to-transparent absolute top-0 left-0 right-0 h-[6rem] group-data-[state-ui=hidden]/dia-content:opacity-0 transition-opacity'></div>

        <div className='h-0 transition-all duration-300 opacity-0 group-data-[state-ui=visible]/dia-content:h-[3.8rem] group-data-[state-ui=visible]/dia-content:opacity-100 overflow-hidden'>
          <SliderThumbnails />
        </div>
      </Dia.Content>
    </Dia.Portal>
  )
})

const SliderThumbnails: React.FC<unknown> = () => {
  const slider = useSlider()

  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (!slider.activeSlideId) return

    const thumbnail = document.querySelector(
      `button[data-slider-thumbnail="${slider.activeSlideId}"]`
    )

    if (thumbnail) {
      scrollIntoViewIfNeeded(thumbnail, {
        // behavior: "smooth",
        block: 'center',
        inline: 'center',
        scrollMode: 'always',
      })
    }
  }, [slider.activeSlideId, width])

  return (
    <div className='flex h-[4rem] w-full flex-col select-none'>
      <AutoSlider.Viewport className='!my-0 mx-auto flex h-full w-fit max-w-full justify-start whitespace-nowrap rounded-xl !pt-2.5 pb-4'>
        <div className='isolate mx-auto flex h-full w-fit'>
          <Dia.Slides>
            {data => {
              const index = slider.slides.findIndex(s => s.id === data.id)
              const beforeActive = index === slider.slideIndex - 1
              const afterActive = index === slider.slideIndex + 1

              return (
                <Dia.Trigger
                  id={data.id}
                  data-slider-thumbnail={data.id}
                  data-state={slider.activeSlideId === data.id ? 'active' : ''}
                  className={cx(
                    'outline-none',
                    "z-10 h-full shrink-0 overflow-hidden !ring-white pointer-events-auto transition-all flex empty:hidden data-[state='active']:shadow-2xl data-[state='active']:rounded-md bg-zinc-800 data-[state='active']:mx-1.5 data-[state='active']:ring-[3px] data-[state='active']:z-20",
                    'max-w-20 min-w-3',
                    (afterActive || index === 0) && 'rounded-l-lg',
                    (beforeActive || index === slider.slides.length - 1) && 'rounded-r-lg'
                  )}
                >
                  {match(data)
                    .with({ type: 'image' }, data => <ImageThumbnail data={data} />)
                    .otherwise(data => (
                      <div className='flex aspect-square h-full bg-white/20 text-white/80'>
                        {match(data)
                          .with({ type: 'pdf' }, () => (
                            <FilePdf className='mx-auto my-auto size-6' />
                          ))
                          .with({ type: 'video' }, () => (
                            <MonitorPlay className='mx-auto my-auto size-6' />
                          ))
                          .otherwise(() => null)}
                      </div>
                    ))}
                </Dia.Trigger>
              )
            }}
          </Dia.Slides>
        </div>
      </AutoSlider.Viewport>
    </div>
  )
}

const SliderMenubar: React.FC<unknown> = () => {
  const slider = useSlider<SlideData>()
  const resource = slider.activeSlide ? getSlideSaveResource(slider.activeSlide) : null

  return (
    <>
      {resource && (
        <Button size='icon' variant='ghost' onClick={() => saveResource(resource)}>
          <DownloadSimple />
        </Button>
      )}

      <DiaShare asChild shareData={{ title: slider.activeSlide?.alt }}>
        <Button size='icon' variant='ghost'>
          <ShareIcon />
        </Button>
      </DiaShare>
    </>
  )
}

export {
  DiaContent as Content,
  DiaContentPortal as ContentPortal,
  DiaOverlay as Overlay,
  DiaPortal as Portal,
  DiaRoot as Root,
  DiaSlide as Slide,
  DiaSlides as Slides,
  DiaTrigger as Trigger,
}

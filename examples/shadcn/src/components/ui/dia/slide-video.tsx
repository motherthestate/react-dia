import { VideoSlideData } from '@/components/ui/dia/types'

/**
 * Video Slide
 */

export const VideoSlide: React.FC<{ data: VideoSlideData }> = props => {
  const { data } = props

  return (
    <div className='flex size-full p-28'>
      <video
        width='auto'
        height='auto'
        controls
        className='mx-auto my-auto h-auto max-h-full w-full'
      >
        {data.sources.map(source => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
    </div>
  )
}

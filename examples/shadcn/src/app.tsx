import { Dia } from '@/components/ui/dia'
import { SlideData } from '@/components/ui/dia/types'

/**
 * App
 */

export const App: React.FC<unknown> = () => {
  return (
    <Dia.Root>
      <ul className='m-4'>
        {slideData.map(slide => (
          <li key={slide.id}>
            <Dia.Trigger data={slide} className='underline'>
              {slide.alt}
            </Dia.Trigger>
          </li>
        ))}
      </ul>

      <Dia.Content />
    </Dia.Root>
  )
}

const slideData: SlideData[] = [
  {
    id: '1',
    type: 'image',
    alt: 'Bird A',
    title: 'Bird A',
    src: '/assets/a.jpg',
    srcSet: [],
  },
  {
    id: '2',
    type: 'image',
    alt: 'Bird B',
    title: 'Bird B',
    src: '/assets/b.jpg',
    srcSet: [],
  },
  {
    id: '3',
    type: 'image',
    alt: 'Bird C',
    title: 'Bird C',
    src: '/assets/c.jpg',
    srcSet: [],
  },
  {
    id: '4',
    type: 'image',
    alt: 'Bird D',
    title: 'Bird D',
    src: '/assets/d.jpg',
    srcSet: [],
  },
  {
    id: '5',
    type: 'image',
    alt: 'E',
    title: 'E',
    src: '/assets/e.jpg',
    srcSet: [],
  },
  {
    id: '6',
    type: 'video',
    title: 'Dummy video A',
    alt: 'Dummy video A',
    sources: [
      {
        src: '/assets/dummy.mp4',
        type: 'video/mp4',
      },
    ],
  },
  {
    id: '7',
    type: 'pdf',
    title: 'Dummy pdf A',
    alt: 'Dummy pdf A',
    src: '/assets/dummy.pdf',
  },
]

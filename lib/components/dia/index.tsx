import { MinViableSlideData } from '../../types'
import {
  DiaClose,
  DiaContentOpen,
  DiaContentPortal,
  DiaNext,
  DiaOverlayOpen,
  DiaPortal,
  DiaPrevious,
  DiaRoot,
  DiaSlide,
  DiaSlideActive,
  DiaSlideSlides,
  DiaTrigger,
} from './dia'

export const Dia = {
  Root: DiaRoot,
  Portal: DiaPortal(),
  Slide: DiaSlide,
  Slides: DiaSlideSlides,
  Close: DiaClose,
  Trigger: DiaTrigger(),
  ActiveSlide: DiaSlideActive(),
  Overlay: DiaOverlayOpen,
  Content: DiaContentOpen,
  Next: DiaNext,
  Previous: DiaPrevious,
  ContentPortal: DiaContentPortal,
}

export type WithData<D extends MinViableSlideData> = {
  Root: typeof DiaRoot
  Portal: ReturnType<typeof DiaPortal<D>>
  Slide: typeof DiaSlide<D>
  Slides: typeof DiaSlideSlides<D>
  Close: typeof DiaClose
  Trigger: ReturnType<typeof DiaTrigger<D>>
  ActiveSlide: ReturnType<typeof DiaSlideActive<D>>
  Overlay: typeof DiaOverlayOpen
  Content: typeof DiaContentOpen
  Next: typeof DiaNext
  Previous: typeof DiaPrevious
  ContentPortal: typeof DiaContentPortal
}

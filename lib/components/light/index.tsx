import { MinViableSlideData } from '../../types'
import {
  LightClose,
  LightContentOpen,
  LightNext,
  LightOverlayOpen,
  LightPortal,
  LightPrevious,
  LightRoot,
  LightSlide,
  LightSlideActive,
  LightSlideSlides,
  LightTrigger,
} from './light'

export const Light = {
  Root: LightRoot,
  Portal: LightPortal(),
  Slide: LightSlide,
  Slides: LightSlideSlides,
  Close: LightClose,
  Trigger: LightTrigger(),
  ActiveSlide: LightSlideActive,
  Overlay: LightOverlayOpen,
  Content: LightContentOpen,
  Next: LightNext,
  Previous: LightPrevious,
}

export type WithData<D extends MinViableSlideData> = {
  Root: typeof LightRoot
  Portal: ReturnType<typeof LightPortal<D>>
  Slide: typeof LightSlide<D>
  Slides: typeof LightSlideSlides<D>
  Close: typeof LightClose
  Trigger: ReturnType<typeof LightTrigger<D>>
  ActiveSlide: typeof LightSlideActive
  Overlay: typeof LightOverlayOpen
  Content: typeof LightContentOpen
  Next: typeof LightNext
  Previous: typeof LightPrevious
}

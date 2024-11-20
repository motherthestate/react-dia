# react-dia 📽️

A headless content slider.

---

## Anatomy

Import all components as `Dia`

```tsx
import { Dia } from "react-dia"

export default () => (
  <Dia.Root>
    <Dia.Trigger data />
    <Dia.Slide data />

    <Dia.Portal>
      <Dia.Overlay />
      <Dia.Content>
        <Dia.Close />
        <Dia.ActiveSlide />
        <Dia.Previous />
        <Dia.Next />
        <Dia.ContentPortal />

        <Dia.Slides>{slide => ...}</Dia.Slides>
        <Dia.ActiveSlide>{slide => ...}</Dia.ActiveSlide>
      </Dia.Content>
    </Dia.Portal>
  </Dia.Root>
);
```

## Typed data

The `WithData` type, prepares all Dia components with your data types.

```tsx
import { Dia as ReactDia, WithData } from "react-dia"

const Dia = ReactDia as WithData<
 | { type: "image", ... }
 | { type: "video" , ... }
>

// ...

<Dia.Slides>{(data) => data.type /* "image" | "video" */ }</Dia.Slides>
```

## Reference

### **Trigger**

The button that opens the dialog.

| **Prop**  | **Type**  | **Default** | **Description**                                                    |
| --------- | --------- | ----------- | ------------------------------------------------------------------ |
| `data`    | `object`  | `undefined` | Optional slide data.                                               |
| `asChild` | `boolean` | `false`     | Change the default rendered element for the one passed as a child. |

### **Slide**

Registers a slide using data.

| **Prop** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| `data`   | `object` | `undefined` | Slide data.     |

### **Content**

Contains the main content to be rendered.

| **Prop**     | **Type**  | **Default** | **Description**                                   |
| ------------ | --------- | ----------- | ------------------------------------------------- |
| `trapFocus`  | `boolean` | `undefined` | Whether the component should trap focus or not.   |
| `scrollLock` | `boolean` | `undefined` | Whether the component should scroll lock outside. |

### **Close / Previous / Next**

Action buttons.

| **Prop**  | **Type**  | **Default** | **Description**                                                    |
| --------- | --------- | ----------- | ------------------------------------------------------------------ |
| `asChild` | `boolean` | `false`     | Change the default rendered element for the one passed as a child. |

### **ActiveSlide**

Component with a child callback being passed slide data.

| **Prop**   | **Type**                              | **Default** | **Description**                              |
| ---------- | ------------------------------------- | ----------- | -------------------------------------------- |
| `children` | `(data: SlideData) ⇒ React.ReactNode` | `undefined` | A callback to render slide data as children. |

### **Slides**

Component with a child callback mapping all slides.

| **Prop**   | **Type**                              | **Default** | **Description**                              |
| ---------- | ------------------------------------- | ----------- | -------------------------------------------- |
| `children` | `(data: SlideData) ⇒ React.ReactNode` | `undefined` | A callback to render all slides as children. |

### **ContentPortal**

Portal rendering children directly in Dia content.

## Family components

Ready-made implementations for additional functionality

### Carousel

Carousel component using `embla-carousel-react`

```tsx
import { Dia, DiaCarousel } from 'react-dia'

export default () => (
  <DiaCarousel.Root>
    <DiaCarousel.Slides>
      <Dia.Slides>
        {data => <DiaCarousel.Slide>{/* Slide content ... */}</DiaCarousel.Slide>}
      </Dia.Slides>
    </DiaCarousel.Slides>
  </DiaCarousel.Root>
)
```

### Transform

Zoom Pan Pinch component using `react-zoom-pan-pinch`

```tsx
import { Dia, DiaTransform } from 'react-dia'

export default () => (
  <DiaTransform.Root>
    <DiaTransform.Content minScale maxScale>
      <img className='max-w-full max-h-full w-auto h-auto' />
    </DiaTransform.Content>

    <DiaTransform.Controls>
      <Dia.ContentPortal>
        <SlideControls />
      </Dia.ContentPortal>
    </DiaTransform.Controls>
  </DiaTransform.Root>
)
```

### Share

[**Web Share API**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) trigger. Will not render on firefox since not supported.

```tsx
import { Share } from "react-dia"

export default () => (
  <Dia.ActiveSlide>
    {data => (
      <Share asChild shareData={{ title: data.alt, ... }}>
        <button>Share</button>
      </Share>
    )}
  </Dia.ActiveSlide>
)
```

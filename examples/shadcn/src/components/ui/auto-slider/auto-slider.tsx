import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

export const Viewport: React.FC<React.ComponentProps<'div'> & { asChild?: boolean }> = props => {
  const { asChild, ...elProps } = props

  const Comp = asChild ? Slot : 'div'

  const viewportRef = React.useRef<HTMLDivElement>(null)
  const { events } = useDraggable(viewportRef as React.MutableRefObject<HTMLDivElement>, {
    applyRubberBandEffect: true,
  })

  return (
    <Comp
      {...elProps}
      {...events}
      ref={viewportRef}
      className={cn(
        '-my-1 min-w-0 overflow-x-auto overflow-y-hidden py-1 scrollbar-none [&>*]:shrink-0',
        elProps.className
      )}
    />
  )
}

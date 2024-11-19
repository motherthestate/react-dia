import React from 'react'
import { createPortal } from 'react-dom'

/**
 * Portal container
 */

export type PortalProps = React.ComponentProps<'div'> & {
  container?: Element | DocumentFragment | null
}

export const Portal = React.forwardRef<HTMLDivElement, PortalProps>((props, forwardedRef) => {
  const { container: containerProp, ...elProps } = props
  const [mounted, setMounted] = React.useState(false)
  React.useLayoutEffect(() => setMounted(true), [])
  const container = containerProp || (mounted && globalThis?.document?.body)
  return container ? createPortal(<div {...elProps} ref={forwardedRef} />, container) : null
})

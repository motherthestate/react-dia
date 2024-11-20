import { Slot } from '@radix-ui/react-slot'
import React from 'react'

/**
 * Share
 */

type ShareProps =
  | {
      asChild: true
      children: React.ReactElement
      shareData: ShareData
    }
  | (React.ComponentProps<'button'> & { asChild?: false; shareData: ShareData })

const shareSupported = typeof navigator?.share === 'function'
if (!shareSupported) console.warn('react-dia: Share not supported on firefox')

export const Share = React.forwardRef<HTMLButtonElement, ShareProps>((props, ref) => {
  const { asChild = false, shareData, ...elProps } = props
  const Button = asChild ? Slot : 'button'

  const handleOpenShare = async () => {
    console.log(navigator.share)
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.error(err)
    }
  }

  if (!shareSupported) return null
  return <Button {...elProps} onClick={handleOpenShare} ref={ref} />
})

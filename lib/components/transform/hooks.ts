import React from 'react'
import { ReactZoomPanPinchState, useControls, useTransformEffect } from 'react-zoom-pan-pinch'
import { TransformContext } from './context'

export const useTransformControls = () => {
  const controls = useControls()
  const [transformState, setTransformState] = React.useState<ReactZoomPanPinchState>(
    controls.instance.transformState
  )

  useTransformEffect(({ state }) => {
    setTransformState(state)
  })

  return {
    ...controls,
    state: transformState,
  }
}

export const useTransformContext = () => {
  const context = React.useContext(TransformContext)
  if (!context) throw new Error('react-dia: TransformContext used outside provider')
  return context
}

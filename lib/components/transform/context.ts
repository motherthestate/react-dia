import React from 'react'

export const TransformContext = React.createContext<null | {
  scale: number
  minScale: number
  maxScale: number
  setScale: (value: number) => void
}>(null)

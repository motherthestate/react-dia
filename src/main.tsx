import React from 'react'
import { App } from './app.tsx'
import { createRoot } from 'react-dom/client'

import './index.css'

const domNode = document.getElementById('root')!
createRoot(domNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

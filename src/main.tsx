import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'motion/react'
import './index.css'
import App from './App'

// Components use the slim `m` export; animation features load in their own chunk.
const loadMotion = () => import('./motion-features').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadMotion}>
      <App />
    </LazyMotion>
  </StrictMode>,
)

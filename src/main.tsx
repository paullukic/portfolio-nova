import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion } from 'motion/react'
// Self-hosted fonts (same weights the Google Fonts link used), latin +
// latin-ext only: no third-party render-blocking stylesheet, and no unused
// Cyrillic/Greek/Vietnamese subsets inlined into the CSS.
import '@fontsource/chakra-petch/latin-300.css'
import '@fontsource/chakra-petch/latin-ext-300.css'
import '@fontsource/chakra-petch/latin-400.css'
import '@fontsource/chakra-petch/latin-ext-400.css'
import '@fontsource/chakra-petch/latin-400-italic.css'
import '@fontsource/chakra-petch/latin-ext-400-italic.css'
import '@fontsource/chakra-petch/latin-500.css'
import '@fontsource/chakra-petch/latin-ext-500.css'
import '@fontsource/chakra-petch/latin-600.css'
import '@fontsource/chakra-petch/latin-ext-600.css'
import '@fontsource/chakra-petch/latin-600-italic.css'
import '@fontsource/chakra-petch/latin-ext-600-italic.css'
import '@fontsource/chakra-petch/latin-700.css'
import '@fontsource/chakra-petch/latin-ext-700.css'
import '@fontsource/zen-dots/latin-400.css'
import '@fontsource/zen-dots/latin-ext-400.css'
import './fonts-jetbrains.css'
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

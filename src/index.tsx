import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/index.tsx'
import reportWebVitals from './reportWebVitals.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

reportWebVitals()
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/index.tsx'
import reportWebVitals from './reportWebVitals.ts'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate.tsx'
import { ErrorBoundary } from './app/providers/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <App />
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)

reportWebVitals()
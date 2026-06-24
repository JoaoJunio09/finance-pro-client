import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './global.css'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        position={window.innerWidth < 768 ? "top-center" : "bottom-right"}
        toastOptions={{
          style: {
            background: "#0f0f0f",
            color: "#fff",
            borderRadius: "20px",
          },
        }}
      />
      <App />
    </QueryClientProvider>
  </StrictMode>
)
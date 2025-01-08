import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-tailwind/react'
import { store } from './Redex/Store.ts'

interface ProviderProps {
  children: ReactNode
}

const CustomProvider: React.FC<ProviderProps> = ({ children }: any) => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
    <Toaster />
  </Provider>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider>
      <App />
    </CustomProvider>
  </React.StrictMode>
)

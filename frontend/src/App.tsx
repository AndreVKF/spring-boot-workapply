import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'

import { Router } from './routes'

import theme from './styles/theme'
import { AuthProvider } from './contexts/AuthContext'

import 'react-toastify/dist/ReactToastify.css'
import { Toast } from './utils/Toast'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  )
}

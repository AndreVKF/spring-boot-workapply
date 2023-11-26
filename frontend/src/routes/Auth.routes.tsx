import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { createBrowserRouter } from 'react-router-dom'

export const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
])

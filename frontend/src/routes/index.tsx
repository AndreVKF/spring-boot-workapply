import { RouterProvider } from 'react-router-dom'

import { useAuthContext } from '../contexts/AuthContext'
import { appRouter } from './App.routes'
import { authRouter } from './Auth.routes'

export const Router = () => {
  const { userInfo } = useAuthContext()
  const router = !userInfo ? authRouter : appRouter

  return <RouterProvider router={router} />
}

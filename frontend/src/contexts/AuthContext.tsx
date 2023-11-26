/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios'
import { api } from '../api'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

interface AuthProviderProps {
  children: ReactNode
}

interface HandleLoginProps {
  email: string
  password: string
  userType: string
}

interface UserInfoProps {
  access_token: string
  user_id: string
  role: string
}

interface AuthContextProps {
  userInfo: UserInfoProps | null
  handleLogin: ({ email, password, userType }: HandleLoginProps) => void
  handleLogout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null)

  const setLoginInfo = ({ access_token, user_id, role }: UserInfoProps) => {
    setUserInfo({
      access_token,
      user_id,
      role,
    })

    localStorage.setItem('@workapply', access_token)
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`
  }

  const clearLoginInfo = () => {
    setUserInfo(null)
    localStorage.removeItem('@workapply')
    api.defaults.headers.common.Authorization = null
  }

  const handleLogout = () => {
    clearLoginInfo()
  }

  const handleLogin = ({ email, password, userType }: HandleLoginProps) => {
    const authUrl = userType === 'company' ? '/auth/company' : '/auth/candidate'

    api
      .post(authUrl, {
        email,
        password,
      })
      .then((res: AxiosResponse) => {
        const { access_token, user_id, role } = res.data
        setLoginInfo({ access_token, user_id, role })
      })
      .catch((err: AxiosError | any) => {
        if (err.response?.data) {
          return toast.error(err.response.data)
        } else {
          return toast.error('Not possible to login')
        }
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('@workapply')

    if (!token) {
      clearLoginInfo()
      return
    }

    // validate access token
    api
      .post('/auth/validate', {
        token,
      })
      .then((res: AxiosResponse) => {
        const { access_token, user_id, role } = res.data
        setLoginInfo({ access_token, user_id, role })
      })
      .catch(() => {
        clearLoginInfo()
      })
  }, [])

  return (
    <AuthContext.Provider value={{ userInfo, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}

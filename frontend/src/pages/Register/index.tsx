import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, FormContainer, FormWrapper, LogoContainer } from './styles'

import { LogoTitle } from '../../components/LogoTitle'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { UserTypeRadioSelect } from '../../components/UserTypeRadioSelect'
import { useAuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { AxiosError } from 'axios'

export const Register = () => {
  const [userType, setUserType] = useState('candidate')
  const navigate = useNavigate()

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const { handleLogin } = useAuthContext()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const username = usernameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    if (!username || !email || !password || !confirmPassword) {
      return toast.error('Please fill all fields')
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords don't match")
    }

    const registerUrl = userType === 'company' ? '/company/' : '/candidate/'

    const adjUsername = username.toUpperCase().trim()
    const adjEmail = email.toLowerCase()

    api
      .post(registerUrl, {
        name: adjUsername,
        username: adjUsername.replace(/\s/g, '_'),
        email: adjEmail,
        password,
      })
      .then(() => {
        handleLogin({ email: adjEmail, password, userType })
      })
      .then(() => {
        navigate('/')
      })
      .catch((err: AxiosError | any) => {
        if (err.response?.data) {
          if (typeof err.response?.data === 'object') {
            return toast.error(err.response.data[0].message)
          } else {
            return toast.error(err.response.data)
          }
        } else {
          return toast.error('Not possible to login')
        }
      })
  }

  return (
    <Container>
      <LogoContainer>
        <LogoTitle />
      </LogoContainer>

      <FormContainer>
        <h2>Register</h2>

        <FormWrapper>
          <Input
            label="username"
            name="username"
            placeholder="Lupet Bolota"
            ref={usernameRef}
          />

          <Input
            label="email"
            name="email"
            placeholder="lupet@lupet.com"
            ref={emailRef}
          />

          <Input
            label="password"
            name="password"
            type="password"
            placeholder="******"
            ref={passwordRef}
          />

          <Input
            label="confirm password"
            name="confirmPassword"
            type="password"
            placeholder="******"
            ref={confirmPasswordRef}
          />

          <UserTypeRadioSelect userType={userType} setUserType={setUserType} />

          <Button type="submit" text="Register" onClick={handleSubmit} />
        </FormWrapper>

        <span>
          Already have an account ?<a href="/"> Log In</a>
        </span>
      </FormContainer>
    </Container>
  )
}

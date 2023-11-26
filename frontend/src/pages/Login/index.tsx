import { Container, FormContainer, FormWrapper, LogoContainer } from './styles'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { FormEvent, useRef, useState } from 'react'
import { LogoTitle } from '../../components/LogoTitle'
import { UserTypeRadioSelect } from '../../components/UserTypeRadioSelect'
import { useAuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

export const Login = () => {
  const [userType, setUserType] = useState('candidate')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const { handleLogin } = useAuthContext()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    if (!email || !password) {
      return toast.error('Please fill all fields')
    }

    handleLogin({ email, password, userType })
  }

  return (
    <Container>
      <LogoContainer>
        <LogoTitle />
      </LogoContainer>

      <FormContainer>
        <h2>Log In</h2>
        <FormWrapper>
          <Input
            label="username"
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

          <UserTypeRadioSelect userType={userType} setUserType={setUserType} />

          <Button type="submit" text="Log In" onClick={handleSubmit} />
        </FormWrapper>
        <span>
          Don&apos;t have an account ?<a href="/register"> Register</a>
        </span>
      </FormContainer>
    </Container>
  )
}

import styled from 'styled-components'

import { User, MagnifyingGlass } from '@phosphor-icons/react'
import { LogoTitle } from './LogoTitle'

import theme from '../styles/theme'
import { paddingX, shadowMd } from '../styles/utils'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export const Navbar = () => {
  const [showUserOptions, setShowUserOptions] = useState(false)
  const { handleLogout } = useAuthContext()

  const navigate = useNavigate()

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
  }

  const handleGoToHome = () => {
    navigate('/')
  }

  const handleSingOut = () => {
    handleLogout()
    navigate('/')
  }

  return (
    <Container>
      <LogoContainer onClick={handleGoToHome}>
        <LogoTitle />
      </LogoContainer>
      <FormSearchContainer onSubmit={handleSearch}>
        <button type="submit">
          <MagnifyingGlass size={22} />
        </button>
        <input type="text" placeholder="Search job..." />
      </FormSearchContainer>

      <UserContainer onClick={() => setShowUserOptions(!showUserOptions)}>
        <User size={24} color={theme.COLORS.FT_COLOR} weight="bold" />

        <UserOptionsContainer
          $showUserOptions={showUserOptions}
          onMouseLeave={() => setShowUserOptions(false)}
        >
          <ul>Profile</ul>
          <hr />
          <ul onClick={handleSingOut}>Logout</ul>
        </UserOptionsContainer>
      </UserContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  height: 100%;

  ${paddingX}

  ${shadowMd}
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  > img {
    width: 48px;
    height: 48px;
  }
`

const FormSearchContainer = styled.form`
  justify-self: flex-start;
  flex: 1;

  display: flex;
  align-items: center;
  gap: 4px;

  border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
  border-radius: 6px;
  padding: 6px 4px 4px;

  max-width: 24rem;

  > input {
    flex: 1;

    border: 0;
    outline: none;
    background: transparent;

    font-size: 16px;
  }

  > button {
    border: 0;
    outline: none;
    background-color: transparent;

    cursor: pointer;
  }
`

const UserContainer = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  border: 2px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
  border-radius: 999px;

  padding: 8px;
`

const UserOptionsContainer = styled.div<{ $showUserOptions: boolean }>`
  position: absolute;

  bottom: -48px;
  right: 8px;

  width: 108px;

  z-index: 999;

  border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
  border-radius: 4px;
  background: ${(props) => props.theme.COLORS.BG_COLOR_50};

  padding: 6px 4px;

  display: ${(props) => (props.$showUserOptions ? 'flex' : 'none')};
  flex-direction: column;
  gap: 4px;

  cursor: pointer;

  > ul {
    cursor: pointer;

    transition:
      font-weight 0.2s,
      color 0.2s;

    &:hover {
      color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
      font-weight: bold;
    }
  }
`

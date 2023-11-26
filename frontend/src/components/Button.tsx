import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export const Button = ({ text, ...rest }: ButtonProps) => {
  return (
    <ButtonWrapper {...rest}>
      <span>{text}</span>
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.button`
  background-color: ${(props) => props.theme.COLORS.BTN_PRIMARY_COLOR};
  color: ${(props) => props.theme.COLORS.BG_COLOR_100};

  border: 0;
  outline: none;
  padding: 0.4rem 0.2rem;
  font-size: 1rem;
  font-weight: 700;

  cursor: pointer;

  transition: opacity 0.4s;
  border-radius: 8px;
`

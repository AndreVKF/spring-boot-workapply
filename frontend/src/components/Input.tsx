import React, { InputHTMLAttributes, forwardRef } from 'react'
import styled from 'styled-components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, ...rest }, ref) => (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <input ref={ref} type="text" id={name} {...rest} />
    </InputWrapper>
  ),
)
Input.displayName = 'Input'

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: start;

  border: 1px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
  border-radius: 6px;

  > label {
    position: relative;

    top: -10px;
    left: 2px;

    background: ${(props) => props.theme.COLORS.BG_COLOR_100};
    z-index: 99;
    padding: 0 0.2rem;
  }

  > input {
    position: relative;
    width: 100%;

    border: 0;
    outline: none;
    background: transparent;

    bottom: 4px;
    left: 4px;

    font-size: 1rem;
  }
`

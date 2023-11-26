import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme.COLORS.BG_COLOR_100};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_600};
    font-weight: 700;
    transition: color 0.4s;
  }

  a:hover {
    color: red;
  }

  button {
    transition: opacity 0.4s;
  }

  button:hover {
    opacity: 0.9;
  }

  body, input, button, textarea, a {
    font: "Poppins", "sans-serif";
    font-weight: 500;
    color: ${(props) => props.theme.COLORS.FT_COLOR};
  }

  input::placeholder {
    color: ${(props) => props.theme.COLORS.FT_PLACEHOLDER_COLOR};
  }

    /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  /* Change the white to any color */
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px ${(props) =>
      props.theme.COLORS.BG_COLOR_100} inset !important;
}

  /*Change text in autofill textbox*/
input:-webkit-autofill{
    -webkit-text-fill-color: ${(props) =>
      props.theme.COLORS.FT_COLOR} !important;
    -webkit-text-size-adjust: 1rem;
}
`

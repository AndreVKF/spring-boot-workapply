import { css } from 'styled-components'

export const basePageLayout = css`
  display: grid;
  height: 100vh;
  grid-template-rows: 64px 1fr;
`

export const paddingX = css`
  padding-left: 1.6rem;
  padding-right: 1.6rem;

  @media screen and (min-width: ${(props) => props.theme.BREAKPOINTS.DESKTOP}) {
    padding-left: 16rem;
    padding-right: 16rem;
  }
`

export const shadowMd = css`
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`

export const shadowLg = css`
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
`

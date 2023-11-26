import { basePageLayout, paddingX } from '../../styles/utils'
import styled from 'styled-components'

export const PageContainer = styled.div`
  ${basePageLayout}
`

export const NavbarContainer = styled.nav`
  background-color: ${(props) => props.theme.COLORS.BG_COLOR_50};
`

export const MainContainer = styled.main`
  background-color: ${(props) => props.theme.COLORS.BG_COLOR_200};

  padding: 2rem 0 0.8rem;
  ${paddingX}
`

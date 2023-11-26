import { Outlet, useParams } from 'react-router-dom'
import { MainContentContainer } from '../../components/MainContentContainer'
import { Navbar } from '../../components/Navbar'
import { MainContainer, PageContainer, NavbarContainer } from './styles'

export const Main = () => {
  const { candidateId, jobId } = useParams()

  return (
    <PageContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <MainContainer>
        {!candidateId && !jobId && <MainContentContainer />}
        {(candidateId || jobId) && <Outlet />}
      </MainContainer>
    </PageContainer>
  )
}

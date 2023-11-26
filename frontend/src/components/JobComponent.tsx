/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components'
import { Job } from '../@types/job'

import { Buildings, ClockCountdown } from '@phosphor-icons/react'
import theme from '../styles/theme'
import { useNavigate } from 'react-router-dom'

export const JobComponent = ({
  idJob,
  description,
  benefits,
  level,
  companyName,
}: Job) => {
  const navigate = useNavigate()

  const handleGoToJobPage = () => {
    navigate(`job/${idJob}`)
  }

  return (
    <JobContainer onClick={handleGoToJobPage}>
      <LogoContainer>
        <Buildings size={32} color={theme.COLORS.PRIMARY_COLOR_700} />
      </LogoContainer>

      <JobDescriptionWrapper>
        <DescriptionContainer>
          <h2>{companyName}</h2>
          <p>
            {description} <span>({level})</span>
          </p>
          <span>Brasil (Remoto)</span>
          <p>Beneficios: {benefits}</p>
        </DescriptionContainer>

        <DetailsWrapper>
          <span>
            <ClockCountdown color={theme.COLORS.PRIMARY_COLOR_700} /> Recrutando
            agora
          </span>
          <p>
            Promovida - <span>16 candidaturas</span>
          </p>
        </DetailsWrapper>
      </JobDescriptionWrapper>
    </JobContainer>
  )
}

const JobContainer = styled.section`
  width: 100%;
  min-height: 8.8rem;

  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1.6rem;

  padding-bottom: 0.8rem;

  cursor: pointer;
`

const LogoContainer = styled.div`
  padding-top: 0.2rem;

  cursor: pointer;
`

const JobDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.6rem;
`

const DescriptionContainer = styled.div`
  > h2 {
    font-size: 1.125rem;
    color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_700};
    font-weight: bold;
    line-height: 1.8rem;
  }

  > p {
    line-height: 1.6rem;
  }

  > p:first-of-type {
    font-weight: bold;
  }

  > span {
    color: ${(props) => props.theme.COLORS.FT_PLACEHOLDER_COLOR};
  }
`
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.4rem;

  > span {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    color: ${(props) => props.theme.COLORS.FT_PLACEHOLDER_COLOR};
    font-size: 0.875rem;
  }

  > p {
    font-size: 0.875rem;

    > span {
      color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_700};
    }
  }
`

import styled from 'styled-components'
import { Candidate } from '../@types/candidate'

import { ClockCountdown, IdentificationCard } from '@phosphor-icons/react'
import theme from '../styles/theme'
import { useNavigate } from 'react-router-dom'

export const CandidateComponent = ({
  idCandidate,
  description,
  email,
  name,
  username,
}: Candidate) => {
  const navigate = useNavigate()

  const handleGoToCandidate = () => {
    navigate(`/candidate/${idCandidate}`)
  }

  return (
    <CandicateContainer onClick={handleGoToCandidate}>
      <LogoContainer>
        <IdentificationCard size={32} color={theme.COLORS.PRIMARY_COLOR_700} />
      </LogoContainer>

      <CandidateDescriptionWrapper>
        <DescriptionContainer>
          <h2>
            {name} (@{username.toLowerCase()})
          </h2>
          <span>{email}</span>
          <p>{description}</p>
        </DescriptionContainer>

        <DetailsWrapper>
          <span>
            <ClockCountdown color={theme.COLORS.PRIMARY_COLOR_700} /> Buscando
            realocação
          </span>
          <p>
            <span>17 candidaturas</span>
          </p>
        </DetailsWrapper>
      </CandidateDescriptionWrapper>
    </CandicateContainer>
  )
}

const CandicateContainer = styled.section`
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

const CandidateDescriptionWrapper = styled.div`
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

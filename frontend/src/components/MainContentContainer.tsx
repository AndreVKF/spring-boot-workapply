import { AxiosError, AxiosResponse } from 'axios'
import { api } from '../api'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { JobComponent } from './JobComponent'
import { Job } from '../@types/job'
import { useAuthContext } from '../contexts/AuthContext'
import { Candidate } from '../@types/candidate'
import { CandidateComponent } from './CandidateComponent'

export const MainContentContainer = () => {
  const [loading, setLoading] = useState(false)
  const [jobsList, setJobsList] = useState<Job[]>([])
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([])

  const { userInfo } = useAuthContext()

  const headerTitle =
    userInfo && userInfo.role === 'CANDIDATE' ? 'Jobs' : 'Candidates'

  // get candidates
  useEffect(() => {
    if (!userInfo || userInfo.role === 'CANDIDATE') return

    setLoading(true)

    api
      .get('/candidate/all')
      .then((res: AxiosResponse) => {
        setCandidatesList(res.data)
      })
      .catch((err: AxiosError | any) => {
        if (err.response?.data) {
          if (typeof err.response?.data === 'object') {
            return toast.error(err.response.data[0].message)
          } else {
            return toast.error(err.response.data)
          }
        } else {
          return toast.error('Not possible to login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // get jobs
  useEffect(() => {
    if (!userInfo || userInfo.role === 'COMPANY') return

    setLoading(true)

    api
      .get('/job/')
      .then((res: AxiosResponse) => {
        setJobsList(res.data)
      })
      .catch((err: AxiosError | any) => {
        if (err.response?.data) {
          if (typeof err.response?.data === 'object') {
            return toast.error(err.response.data[0].message)
          } else {
            return toast.error(err.response.data)
          }
        } else {
          return toast.error('Not possible to login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <div />
      <MainContentWrapper>
        <MainContentHeaderWrapper>
          Work<span>apply</span> {headerTitle}
        </MainContentHeaderWrapper>
        {userInfo?.role === 'CANDIDATE' &&
          jobsList.length > 0 &&
          jobsList.map((job) => (
            <JobComponent
              key={job.idJob}
              idJob={job.idJob}
              benefits={job.benefits}
              companyName={job.companyName}
              description={job.description}
              level={job.level}
            />
          ))}
        {userInfo?.role === 'COMPANY' &&
          candidatesList.length > 0 &&
          candidatesList.map((candidate) => (
            <CandidateComponent
              key={candidate.idCandidate}
              idCandidate={candidate.idCandidate}
              description={candidate.description}
              email={candidate.email}
              name={candidate.name}
              username={candidate.username}
            />
          ))}
      </MainContentWrapper>
      <div />
    </Container>
  )
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 20% 1fr 20%;
`

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;

  width: 100%;

  background-color: ${(props) => props.theme.COLORS.BG_COLOR_50};

  border-radius: 8px;
  padding: 1.2rem;

  > section:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.COLORS.PRIMARY_COLOR_500};
  }
`

const MainContentHeaderWrapper = styled.h1`
  padding-bottom: 1.2rem;

  > span {
    color: ${(props) => props.theme.COLORS.PRIMARY_COLOR_700};
  }
`

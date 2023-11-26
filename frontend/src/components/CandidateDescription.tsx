import { useNavigate, useParams } from 'react-router-dom'
import { Candidate } from '../@types/candidate'
import { useEffect, useState } from 'react'
import { api } from '../api'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import styled from 'styled-components'

export const CandidateDescription = () => {
  const [loading, setLoading] = useState(false)
  const [candidateDetails, setCandidateDetails] = useState<Candidate | null>(
    null,
  )

  const navigate = useNavigate()
  const { candidateId } = useParams()

  if (!candidateId) {
    navigate('/not-found')
  }

  useEffect(() => {
    setLoading(true)

    api
      .get(`/candidate/${candidateId}`)
      .then((res: AxiosResponse) => {
        setCandidateDetails(res.data)
      })
      .catch((err: AxiosError | any) => {
        if (err.response?.data) {
          if (typeof err.response?.data === 'object') {
            return toast.error(err.response.data[0].message)
          } else {
            return toast.error(err.response.data)
          }
        } else {
          return toast.error('Not to retrieve job info')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [candidateId])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <h1>{candidateDetails?.name}</h1>
      <span>{candidateDetails?.email}</span>
      <p>{candidateDetails?.description}</p>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.COLORS.BG_COLOR_50};

  padding: 1.2rem;
  border-radius: 8px;

  min-height: 16rem;

  line-height: 2.4rem;

  > span {
    color: ${(props) => props.theme.COLORS.FT_PLACEHOLDER_COLOR};
  }
`

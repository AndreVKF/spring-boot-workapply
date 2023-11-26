import { Job } from '../@types/job'
import { api } from '../api'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'

export const JobDescription = () => {
  const [loading, setLoading] = useState(false)
  const [jobDetails, setJobDetails] = useState<Job | null>(null)

  const navigate = useNavigate()
  const { jobId } = useParams()

  if (!jobId) {
    navigate('/not-found')
  }

  useEffect(() => {
    setLoading(true)

    api
      .get(`/job/${jobId}`)
      .then((res: AxiosResponse) => {
        setJobDetails(res.data)
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
  }, [jobId])

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <h1>{jobDetails?.companyName}</h1>
      <p>
        {jobDetails?.description} <span>({jobDetails?.level})</span>
      </p>
      <p>Benefits: {jobDetails?.benefits}</p>
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
`

import { useNavigate } from 'react-router-dom'
import { JobDescription } from '../../components/JobDescription'
import { useAuthContext } from '../../contexts/AuthContext'
import { useEffect } from 'react'

export const JobPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuthContext()

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'CANDIDATE') {
      navigate('/not_found')
    }
  }, [userInfo])

  return (
    <>
      <JobDescription />
    </>
  )
}

import { useAuthContext } from '../../contexts/AuthContext'
import { CandidateDescription } from '../../components/CandidateDescription'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const CandidatePage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuthContext()

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'COMPANY') {
      navigate('/not_found')
    }
  }, [userInfo])

  return (
    <>
      <CandidateDescription />
    </>
  )
}

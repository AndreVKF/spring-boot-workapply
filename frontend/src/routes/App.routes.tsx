import { NotFound } from '../pages/NotFound'
import { JobPage } from '../pages/JobPage'
import { Main } from '../pages/Main'
import { createBrowserRouter } from 'react-router-dom'
import { CandidatePage } from '../pages/CandidatePage'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'candidate/:candidateId',
        element: <CandidatePage />,
      },
      {
        path: 'job/:jobId',
        element: <JobPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

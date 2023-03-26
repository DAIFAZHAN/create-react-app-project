import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'

const Mine = lazy(() => import('@/views/mine'))

const Recommend = lazy(() => import('@/views/discover/c-views/recommend'))
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/Ranking',
        element: <Ranking />
      }
    ]
  },
  {
    path: '/mine',
    element: <Mine />
  }
]

export default routes

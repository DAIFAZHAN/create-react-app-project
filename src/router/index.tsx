import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'

const Mine = lazy(() => import('@/views/mine'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/mine',
    element: <Mine />
  }
]

export default routes

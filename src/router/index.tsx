import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />
  },
  {
    path: '/discover',
    element: <Discover />
  }
]

export default routes

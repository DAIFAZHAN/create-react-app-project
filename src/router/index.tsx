import React from 'react'
import { RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Discover />
  }
]

export default routes

import React, { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Discover = () => {
  return (
    <div>
      <Link to="/discover/recommend">推荐</Link>
      <Link to="/discover/ranking">排行</Link>
      <Suspense fallback="loading...">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Discover

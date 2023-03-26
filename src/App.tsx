import React, { Suspense } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import routes from './router'
import { IRootState } from './store'

function App() {
  const { count, message } = useSelector(
    (state: IRootState) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual // 浅层比较，不改变就不自动刷新
  )

  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现</Link>
        <Link to="/mine">我的</Link>
      </div>
      <Suspense fallback="loading...">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <h2>当前计数：{count}</h2>
      <h2>当前消息：{message}</h2>
    </div>
  )
}

export default App

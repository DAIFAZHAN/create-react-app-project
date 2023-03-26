import React, { Suspense } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import routes from './router'
import { useAppDispatch, useAppSelector } from './store'
import { changeCountAction } from './store/modules/counter'

function App() {
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message
    }),
    shallowEqual // 浅层比较，不改变就不自动刷新
  )

  const dispatch = useAppDispatch()
  const handleClick = () => dispatch(changeCountAction(count + 1))

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
      <button onClick={handleClick}>点击修改计数</button>
    </div>
  )
}

export default App

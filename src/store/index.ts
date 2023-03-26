import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

type GetStateFnType = typeof store.getState // 先拿到函数类型
export type IRootState = ReturnType<GetStateFnType> // 再拿到返回值类型

export default store

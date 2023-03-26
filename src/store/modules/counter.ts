import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'Hello Redux'
  },
  reducers: {
    changeCountAction: (state, { payload }) => {
      state.count = payload
    }
  }
})

export const { changeCountAction } = counterSlice.actions
export default counterSlice.reducer

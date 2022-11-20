import { createSlice } from '@reduxjs/toolkit'

const initialState = { count: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count+=1
    },
    decrement(state) {
      state.count-=1
    },
    AddBy(state, action) {
      state.count += action.payload
    },
  },
})

export const { increment, decrement, AddBy } = counterSlice.actions //action is name 
export default counterSlice.reducer //reducer is a function
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return state = action.payload
    }
  }
})

export const notify = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer

import { combineReducers } from '@reduxjs/toolkit'

import weatherReducer from '../features/weather/weatherSlice'

const rootReducer = combineReducers({
  currentWeather: weatherReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
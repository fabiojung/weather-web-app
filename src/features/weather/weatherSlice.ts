import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '../../app/store'

import { Location, getLocation } from '../../api/geocodeAPI'

import { Weather, getWeatherByLocation } from '../../api/weatherAPI'

interface WeatherState {
  location: string
  weather?: Weather
  isLoading: boolean
  error: string | null
}

const initialState: WeatherState = {
  location: "",
  isLoading: false,
  error: null
}

function startLoading(state: WeatherState) {
  state.isLoading = true
}

function loadingFailed(state: WeatherState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getLocationStart: startLoading,
    getWeatherStart: startLoading,
    getLocationSuccess(state, action: PayloadAction<Location>) {
      state.location = action.payload.city + ' ' + action.payload.countryCode
      state.error = null
    },
    getLocationFailed(state, action: PayloadAction<string>) {
      state.location = ""
      state.error = action.payload
    },
    getWeatherSuccess(state, action: PayloadAction<Weather>) {
      state.weather = action.payload
      state.error = null
      state.isLoading = false
    },
    getWeatherFailed(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    getLocationFailure: loadingFailed,
    getWeatherFailure: loadingFailed,
  }
})

export const {
  getWeatherStart,
  getWeatherSuccess,
  getWeatherFailed,
  getLocationSuccess,
  getLocationFailed,
  getLocationFailure,
  getWeatherFailure
} = weather.actions

export default weather.reducer

export const fetchCurrentWeather = (): AppThunk => async dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( async (pos: Position) => {
      try {
        dispatch(getWeatherStart())
        const location = await getLocation(pos.coords.latitude, pos.coords.longitude)
        dispatch(getLocationSuccess(location))
        const weather = await getWeatherByLocation(location.city, location.countryCode)
        dispatch(getWeatherSuccess(weather))
      } catch (error) {
        dispatch(getWeatherFailed(error.toString()))
      }
    },
    () => dispatch(getLocationFailed('Unable to retrieve your current location.'))
    );
  }
  else {
    dispatch(getLocationFailed('Location services not available.'))
  }
}
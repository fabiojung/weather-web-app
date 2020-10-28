import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../app/rootReducer'

import { fetchCurrentWeather } from './weatherSlice'

import { WeatherDisplay } from './WeatherDisplay'

export const Weather = () => {
  const dispatch = useDispatch()

  const onUpdateButtonClicked = () => {
    dispatch(fetchCurrentWeather())
  }

  const {
    location,
    weather,
    error: fetchError,
    isLoading,
  } = useSelector((state: RootState) => state.currentWeather )

  useEffect(() => {
    dispatch(fetchCurrentWeather())
  }, [dispatch]) 

  if (fetchError) {
    return (
      <main>
        <div className="error-message">
          <h5>Something went wrong...</h5>
          <div>{fetchError.toString()}</div>
        </div>
      </main>
    )
  }

  let weatherHeader = <h5>Fetching Weather...</h5> 
  let weatherDetails = <div className="loader"></div>

  if (!isLoading) {
    weatherHeader = (location !== "") ? <h5>Current Weather in {location}</h5> : <h5>Weather Not Available</h5>
    weatherDetails = <WeatherDisplay currentWeather={weather} />
  }

  return (
    <main>
      {weatherHeader}
      {weatherDetails}
      <button
          type="button"
          id="updateButton"
          className="button button-primary"
          onClick={onUpdateButtonClicked}
          disabled={isLoading}
      >Refresh Weather Data</button>
    </main>

  )

}
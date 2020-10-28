import React from 'react'
import { WEATHER_ICON_URL } from '../../constants'

interface Props {
  iconId: string
}

export const WeatherIcon = ({ iconId }: Props) => {
  const iconUrl = `${WEATHER_ICON_URL}${iconId}@4x.png`
  return (
    <div>
      <img src={iconUrl} alt="weather-icon"></img>
    </div>
  )
}
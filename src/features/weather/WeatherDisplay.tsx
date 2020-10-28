import React from 'react'
import { WeatherIcon } from './WeatherIcon'
import { Weather } from '../../api/weatherAPI'

interface Props {
  currentWeather?: Weather
}

function getCardinalDirection(degrees: number): string {
  degrees = Math.floor((degrees / 22.5) + 0.5);
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

  return directions[degrees % 16];
}

function getDisplayValue(value: number, decimals: number): string {
  return value.toFixed(decimals).toString()
}

function getFormattedDate(timestamp: number) {
  const date = new Date(timestamp * 1000)
  const dateString = date.toLocaleString();
  const timezone = date.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]
  return `${dateString} (${timezone})`
}

export const WeatherDisplay = ({ currentWeather }: Props) => {

  const iconId = (currentWeather?.summary) ? currentWeather.summary.icon : '02n'
  const temperature = (currentWeather?.temperature) ? getDisplayValue(currentWeather.temperature.actual, 1) : '--'
  const feelsLike   = (currentWeather?.temperature) ? getDisplayValue(currentWeather.temperature.feelsLike, 1) : '--'

  const windSpeed = (currentWeather?.wind) ? getDisplayValue(currentWeather.wind.speed * 3.6, 1) : '--';
  const windDirection = (currentWeather?.wind) ? getCardinalDirection(currentWeather.wind.deg) : '--';

  const humidity = (currentWeather?.clouds) ? currentWeather.clouds.humidity : '--'
  const coverage = (currentWeather?.clouds) ? currentWeather.clouds.all : '--'
  const visibility = (currentWeather?.clouds) ? currentWeather.clouds.visibility/1000 : '--'

  const lastUpdated = (currentWeather?.timestamp) ? getFormattedDate(currentWeather.timestamp) : '--'
 //add wind speed unit
  return (
    <div className="weather-details">
      <WeatherIcon iconId={iconId}/>
      <div>Temperature: {temperature}&deg; C</div>
      <div>Feels Like: {feelsLike}&deg; C</div>
      <div>Wind: {windDirection} {windSpeed} km/h</div> 
      <div>Humidity: {humidity} %</div>
      <div>Cloud Cover: {coverage} %</div>
      <div>Visibility: {visibility} km</div>
      <br/>
      <div>Last Updated: {lastUpdated} </div>
    </div>
  )
}

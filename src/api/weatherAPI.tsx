import { WEATHER_API_URL } from '../constants'

export interface Weather {
  summary: WeatherSummary;
  temperature: TemperatureData;
  wind: WindData;
  clouds: CloudsData;
  timestamp: number;
}

interface WeatherSummary {
  title: string;
  description: string;
  icon: string;
}

interface TemperatureData {
  actual: number;
  feelsLike: number;
}

interface WindData {
  speed: number;
  deg: number;
}

interface CloudsData {
  all: number;
  visibility: number;
  humidity: number;
}

export async function getWeatherByLocation( cityName: string, countryCode: string): Promise<Weather> {

  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }

  const gqlQuery = `query getCityByName($cityName: String!, $countryCode: String) {
    getCityByName(name: $cityName, country: $countryCode, config: { units:metric }) {
      name
      country
      weather { 
        summary { 
          title 
          description 
          icon 
        } 
        temperature { 
          actual 
          feelsLike
        }
        wind { 
          speed 
          deg 
        } 
        clouds { 
          all 
          visibility 
          humidity 
        } 
        timestamp 
      } 
    } 
  }`;

  
  try {
    const resp = await fetch(WEATHER_API_URL, { 
      method: 'POST', 
      headers: headers,
      body: JSON.stringify({
        query: gqlQuery,
        variables: { cityName, countryCode },
      })
    })

    const weatherData = await resp.json();
    return weatherData.data.getCityByName.weather;
  } catch (error) {
    throw error;
  }
}
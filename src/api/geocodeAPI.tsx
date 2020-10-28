import { GEOCODE_API_URL } from '../constants'

export interface Location {
  countryCode: string;
  city: string;
}

export async function getLocation( lat: number, lon: number): Promise<Location> {
  const apiURL = `${GEOCODE_API_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`

  const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' }

  try {
    const resp = await fetch(apiURL, { method: 'GET', headers: headers })
    const locationData = await resp.json();
    
    const city = (locationData.city.length > 0) ? locationData.city : locationData.locality;
    const location: Location = { city: city, countryCode: locationData.countryCode }
    
    return location;
  } catch (error) {
    throw error;
  }
}
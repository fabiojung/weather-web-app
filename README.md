# 🌦️ Weather Web App

A React/Redux SPA to display the current weather conditions based on your geolocation.

### Requirements 

#### OpenWeatherMap API Key 

You will need to sign up for the free account [here](https://openweathermap.org/api) and get your API key.

#### graphql-weather-api

Clone the repository [GraphQL Weather API](https://github.com/konstantinmuenster/graphql-weather-api), create an `.env` file containing your OpenWeatherMap key (format: `KEY=api-key-here`), and run `npm install && npm run dev` to start the wrapper app.

Test your access to `http://localhost:4000` and make sure it's working!

#### BigDataCloud API 

This App uses a free Reverse Geocoding to City API from [BigDataCloud](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocode-to-city-api), but no API key is required.

---
### How to run the app locally

**If you are running the `graphql-weather-api` on a different ip/port, open the file `constants.ts` and update the URL variable accordingly.

Clone the repository to your machine and run: 

#### `npm install`

Installs all dependencies required to run the app locally.

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### How to build the app for deployment

Clone the repository to your machine and run: 

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
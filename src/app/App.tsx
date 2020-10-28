import React from 'react'

import { Header } from '../components/Header'
import { Weather } from '../features/weather/Weather'
import { Footer } from '../components/Footer'

import './App.css'

const App: React.FC = () => {
  
    const content = (
      <React.Fragment>
        <Header/>
        <Weather/>
        <Footer/>
      </React.Fragment>
    )

  return <div className="App">{content}</div>
}

export default App

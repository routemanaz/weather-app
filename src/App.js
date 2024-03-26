import './App.css';

import WeatherData from './components/weatherData';

function App() {
  return (
    <div className='App-container'>
      <div className='App'></div>
      <div className='weather-daata'>
        <WeatherData />
      </div>
    </div>
  );
}

export default App;

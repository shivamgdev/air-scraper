import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch nearby airports
  const fetchNearbyAirports = async () => {
    setError(''); // Clear any previous errors

    try {
      const response = await axios.get('http://localhost:5000/api/nearby-airports', {
        params: { lat, lng }
      });

      // Log the full response for debugging
      console.log('Response from backend:', response.data);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setAirports(response.data);
      } else {
        setError('No nearby airports found.');
      }
    } catch (error) {
      setError('Error fetching nearby airports. Please try again.');
      console.error('Error fetching nearby airports:', error);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Nearby Airports Finder</h1>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="App-input"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="App-input"
        />
        <button onClick={fetchNearbyAirports} className="App-button">Find Airports</button>
        {error && <p className="App-error">{error}</p>}
        <ul>
          {airports.map((airport, index) => (
            <li key={index}>{airport.presentation.title} ({airport.skyId})</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

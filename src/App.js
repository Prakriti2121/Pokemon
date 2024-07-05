import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const cachedData = localStorage.getItem('pokemonList');
      const cacheTime = localStorage.getItem('cacheTime');
      const now = new Date();

      if (cachedData && cacheTime && now - new Date(cacheTime) < 3600000) {
        setPokemonList(JSON.parse(cachedData));
      } else {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
          setPokemonList(response.data.results);
          localStorage.setItem('pokemonList', JSON.stringify(response.data.results));
          localStorage.setItem('cacheTime', now.toString());
        } catch (error) {
          console.error('Error fetching Pokemon:', error);
        }
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  const showPokemon = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <img alt="Pokemon logo" className="logo" src={logo} />
        <nav className="navbar">
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
        </nav>
      </header>

      <main>
        <div className="search-container">
          <input
            id="pokemon-search"
            className="search-box"
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>

        {selectedPokemon && (
          <div className="pokemon-details">
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
            <p>Height: {selectedPokemon.height}</p>
            <p>Weight: {selectedPokemon.weight}</p>

            <div className="pokemon-stats">
              {selectedPokemon.stats.map((stat, index) => (
                <div key={index}>
                  <p>{stat.stat.name}: {stat.base_stat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <ul className="pokemon-list">
          {filteredPokemonList.map(pokemon => (
            <li key={pokemon.name} className="pokemon-item">
              <a href="#!" onClick={() => showPokemon(pokemon.url)}>
                {pokemon.name}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

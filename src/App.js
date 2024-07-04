import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        setPokemonList(response.data.results);
        localStorage.setItem('pokemonList', JSON.stringify(response.data.results));
        localStorage.setItem('cacheTime', new Date());
      }
    };
    fetchPokemon();
  }, []);

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );

  const showPokemon = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="App">
      <header>
        <img alt="Pokémon logo" className="logo" src={logo} />
      </header>

      <main>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
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

            {selectedPokemon.stats.map((stat, index) => (
              <div key={index}>
                <p>{stat.stat.name}: {stat.base_stat}</p>
              </div>
            ))}
          </div>
        )}

        <ul>
          {filteredPokemonList.map(pokemon => (
            <li key={pokemon.name} className="pokemon-item">
              <a href="#" onClick={() => showPokemon(pokemon.url)}>
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

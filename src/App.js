import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const data = await response.json();
      setPokemonList(data.results);
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
        <img alt="react logo" className="logo" src="logo.png" />
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

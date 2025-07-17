import { useState, useEffect } from 'react';
import useOnlineStatus from './utils/hooks/useOnlineStatus.js';
import { getWatchedMovies, saveWatchedMovies } from './utils/storage.js';
import './App.css';

const moviesData = [
  {
    mal_id: 5114,
    title: 'Fullmetal Alchemist: Brotherhood',
    year: 2009,
    image: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
    score: 9.13,
    synopsis:
      'After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality...'
  },
  {
    mal_id: 11061,
    title: 'Hunter x Hunter (2011)',
    year: 2011,
    image: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
    score: 9.04,
    synopsis:
      'Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and potential, he seeks his missing father...'
  },
  {
    mal_id: 9253,
    title: 'Steins;Gate',
    year: 2011,
    image: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
    score: 9.08,
    synopsis:
      'Self-proclaimed mad scientist Rintarou Okabe accidentally discovers that you can send text messages to the past...'
  },
  {
    mal_id: 30276,
    title: 'One Punch Man',
    year: 2015,
    image: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
    score: 8.54,
    synopsis:
      'Saitama is a hero who only became a hero for fun. After three years of training, he has become so powerful that he can defeat any enemy with a single punch...'
  },
  {
    mal_id: 11757,
    title: 'Sword Art Online',
    year: 2012,
    image: 'https://cdn.myanimelist.net/images/anime/11/39717.jpg',
    score: 7.21,
    synopsis:
      'In the year 2022, thousands of people get trapped in a new virtual MMORPG, and the only way to escape is to beat the game...'
  },
  {
    mal_id: 19815,
    title: 'No Game No Life',
    year: 2014,
    image: 'https://cdn.myanimelist.net/images/anime/5/65187.jpg',
    score: 8.09,
    synopsis:
      'Brilliant NEET siblings Sora and Shiro are transported to a world where everything is decided by games...'
  },
  {
    mal_id: 28977,
    title: 'One Punch Man 2nd Season',
    year: 2019,
    image: 'https://cdn.myanimelist.net/images/anime/1783/100978.jpg',
    score: 7.49,
    synopsis:
      'Saitama continues his quest for a worthy opponent as a new threat emerges in the form of Garou, a hero hunter...'
  },
  // Daftar 20+ film tetap disisipkan di sini
];

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(moviesData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);
  const isOnline = useOnlineStatus();

  const [watched, setWatched] = useState(() => getWatchedMovies() || []);
  const [pendingUpdates, setPendingUpdates] = useState([]);

  function handleSelectedMovie(id) {
    const newMovie = movies.find((movie) => movie.mal_id === id);
    setSelectedMovie(newMovie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  function handleToggleWatched(movie) {
    const isAlreadyWatched = watched.some((m) => m.mal_id === movie.mal_id);
    let updatedWatched;

    if (isAlreadyWatched) {
      updatedWatched = watched.filter((m) => m.mal_id !== movie.mal_id);
    } else {
      updatedWatched = [...watched, movie];
    }

    setWatched(updatedWatched);
    saveWatchedMovies(updatedWatched);

    if (!isOnline) {
      const action = isAlreadyWatched ? 'remove' : 'add';
      setPendingUpdates([...pendingUpdates, { action, movie }]);
    }
  }

  useEffect(() => {
    if (isOnline && pendingUpdates.length > 0) {
      console.log('📡 Syncing with server:', pendingUpdates);
      setPendingUpdates([]);
    }
  }, [isOnline]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <h1>MOVIE WEB TECHTEST</h1>
        </div>
        <div className="search-container">
          <input
            className="search"
            type="text"
            placeholder="Cari Film...."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p className="search-results">
            Found <strong>{filteredMovies.length}</strong> results
          </p>
        </div>
      </nav>

      <p className="status">{isOnline ? '🟢 Online' : '🔴 Offline'}</p>

      <main className="main">
        <div className="box">
          <button className="btn-toggle" onClick={() => setIsOpen1((open) => !open)}>
            {isOpen1 ? '–' : '+'}
          </button>
          {isOpen1 && (
            <ul className="list list-movie">
              {filteredMovies.map((movie) => (
                <li key={movie.mal_id} onClick={() => handleSelectedMovie(movie.mal_id)}>
                  <img src={movie.image} alt={`${movie.title} cover`} />
                  <h3>{movie.title}</h3>
                  <div>
                    <p><span>{movie.year}</span></p>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleToggleWatched(movie);
                  }}>
                    {watched.some((m) => m.mal_id === movie.mal_id) ? 'Unwatch' : 'Watch'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box watched">
          <h2>🎬 Watched Movies</h2>
          <ul>
            {watched.map((movie) => (
              <li key={movie.mal_id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      </main>

      {selectedMovie && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <img src={selectedMovie.image} alt={`${selectedMovie.title} cover`} />
            <div className="details-overview">
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.year} • {selectedMovie.score}</p>
              <p><em>{selectedMovie.synopsis}</em></p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

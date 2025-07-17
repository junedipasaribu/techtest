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
    image: 'data:image/jpeg;base64,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',
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

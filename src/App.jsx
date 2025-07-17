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
    synopsis: 'After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality...',
  },
  {
    mal_id: 1,
    title: 'M3GAN',
    year: 2025,
    image: 'https://media.themoviedb.org/t/p/w440_and_h660_face/4a63rQqIDTrYNdcnTXdPsQyxVLo.jpg',
    score: 8.8,
    synopsis: 'A skilled thief is offered a chance to erase his past crimes by planting an idea in someone’s mind, a process known as inception.',
  },
  {
    mal_id: 2,
    title: 'The Shawshank Redemption',
    year: 1994,
    image: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    score: 9.3,
    synopsis: 'Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.',
  },
  {
    mal_id: 3,
    title: 'The Dark Knight',
    year: 2008,
    image: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    score: 9.0,
    synopsis: 'Batman raises the stakes in his war on crime. With the help of allies, he sets out to dismantle the remaining criminal organizations.',
  },
  {
    mal_id: 4,
    title: 'Interstellar',
    year: 2014,
    image: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    score: 8.6,
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
  },
  {
    mal_id: 5,
    title: 'Parasite',
    year: 2019,
    image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    score: 8.6,
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
  },
  {
    mal_id: 6,
    title: 'Spirited Away',
    year: 2001,
    image: 'https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg',
    score: 8.6,
    synopsis: 'During her family’s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, spirits, and monsters.',
  },
  {
    mal_id: 7,
    title: 'Avengers: Endgame',
    year: 2019,
    image: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    score: 8.4,
    synopsis: 'After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos’ actions.',
  },
  {
    mal_id: 8,
    title: 'Joker',
    year: 2019,
    image: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    score: 8.5,
    synopsis: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, which starts his descent into madness.',
  },
  {
    mal_id: 9,
    title: 'Influencer',
    year: 1994,
    image: 'https://media.themoviedb.org/t/p/w440_and_h660_face/mtXV301BF7pqwvRjsWhQo6sD10F.jpg',
    score: 8.9,
    synopsis: 'While struggling on a solo backpacking trip in Thailand, social media influencer Madison meets CW, who travels with ease and shows her a more uninhibited way of living. But CWs interest in her takes a darker turn.',
  },
  {
    mal_id: 10,
    title: 'Your Name',
    year: 2016,
    image: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
    score: 8.9,
    synopsis: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies.',
  },
  {
    mal_id: 11,
    title: 'Fight Club',
    year: 1999,
    image: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg',
    score: 8.8,
    synopsis: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.',
  },
  {
    mal_id: 12,
    title: 'The Matrix',
    year: 1999,
    image: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    score: 8.7,
    synopsis: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
  },
  {
    mal_id: 13,
    title: 'F1',
    year: 2014,
    image: 'https://media.themoviedb.org/t/p/w440_and_h660_face/9PXZIUsSDh4alB80jheWX4fhZmy.jpg',
    score: 8.5,
    synopsis: 'Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.',
  },
  {
    mal_id: 14,
    title: 'The Hangman',
    year: 2024,
    image: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/rij9Eh4RVXyPet8A1BNU8pDvtmu.jpg',
    score: 8.1,
    synopsis: 'Troubled father Leon takes son camping in Appalachia. Local cult summons evil Hangman demon. Son goes missing. Leon must confront cult, monster to find him amid rising body count.',
  },
  {
    mal_id: 15,
    title: 'Coco',
    year: 2017,
    image: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    score: 8.4,
    synopsis: 'Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
  },
  {
    mal_id: 16,
    title: 'Get Out',
    year: 2017,
    image: 'https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
    score: 7.7,
    synopsis: 'A young African-American visits his white girlfriend’s parents for the weekend, where his simmering uneasiness about their reception grows.',
  },
  {
    mal_id: 17,
    title: 'La La Land',
    year: 2016,
    image: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
    score: 8.0,
    synopsis: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.',
  },
  {
    mal_id: 18,
    title: 'The Godfather',
    year: 1972,
    image: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    score: 9.2,
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  {
    mal_id: 19,
    title: 'The Social Network',
    year: 2010,
    image: 'https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',
    score: 7.8,
    synopsis: 'Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea.',
  },
  {
    mal_id: 20,
    title: 'Toy Story',
    year: 1995,
    image: 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
    score: 8.3,
    synopsis: 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy’s room.',
  },
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
    title: 'SUPERMAN',
    year: 2025,
    image: 'https://media.themoviedb.org/t/p/w440_and_h660_face/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
    score: 7.49,
    synopsis:
      'Superman, a journalist in Metropolis, embarks on a journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent.'
  },
   {
    mal_id: 28977,
    title: 'AllMOST COPS',
    year: 2025,
    image: 'https://media.themoviedb.org/t/p/w440_and_h660_face/7bcndiaTgu1Kj5a6qyCmsWYdtI.jpg',
    score: 7.49,
    synopsis:
      'When an overeager community officer and a reckless ex-detective are forced to team up, plenty of chaos ensues on the streets of Rotterdam..'
  },
   {
    mal_id: 28977,
    title: 'KAYARA',
    year: 2025,
    image: 'https://media.themoviedb.org/t/p/w600_and_h900_bestv2/tpZdjnoJ6Z3NsSxI6HjAIggrcEv.jpg',
    score: 8.49,
    synopsis:
      'A courageous and athletic teenager, Kayara dreams that she is destined to be the first female to break into the league of Chasquis - the official messengers of the Incan empire. As she learns what it takes to be a Chasqui along with its challenges, she tackles every mission she gets and discovers the ancient stories of her land and her people.'
  },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(moviesData);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isOpen1, setIsOpen1] = useState(true);
  const isOnline = useOnlineStatus();

  const [watched, setWatched] = useState(() => getWatchedMovies() || []);
  const [pendingUpdates, setPendingUpdates] = useState([]);

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');
  const [commentMovieId, setCommentMovieId] = useState(null);

  function handleSelectedMovie(id) {
    const newMovie = movies.find((movie) => movie.mal_id === id);
    setSelectedMovie(newMovie);
  }

  function handleToggleWatched(movie) {
    const isAlreadyWatched = watched.some((m) => m.mal_id === movie.mal_id);

    if (isAlreadyWatched) {
      const updatedWatched = watched.filter((m) => m.mal_id !== movie.mal_id);
      setWatched(updatedWatched);
      saveWatchedMovies(updatedWatched);
      return;
    }

    setCommentMovieId(movie.mal_id);
    setSelectedMovie(null);
  }

  function handleAddCommentAndRating(movieId) {
    if (!newComment || !newRating) return;

    const movie = movies.find((m) => m.mal_id === movieId);
    const watchedMovie = {
      ...movie,
      comment: newComment,
      userRating: Number(newRating),
    };

    const updatedWatched = [...watched, watchedMovie];
    setWatched(updatedWatched);
    saveWatchedMovies(updatedWatched);

    if (!isOnline) {
      setPendingUpdates([...pendingUpdates, { action: 'add', movie: watchedMovie }]);
    }

    setNewComment('');
    setNewRating('');
    setCommentMovieId(null);
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
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.mal_id}
              className="movie-card"
              onClick={() => handleSelectedMovie(movie.mal_id)}
            >
              <img src={movie.image} alt={`${movie.title} cover`} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
              </div>
              <button
                className="watch-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleWatched(movie);
                }}
              >
                {watched.some((m) => m.mal_id === movie.mal_id)
                  ? 'Unwatch'
                  : 'Watch'}
              </button>
            </div>
          ))}
        </div>

        {selectedMovie && (
          <div className="modal" onClick={() => setSelectedMovie(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setSelectedMovie(null)}>
                &times;
              </span>
              <img src={selectedMovie.image} alt={`${selectedMovie.title} cover`} />
              <h2>{selectedMovie.title}</h2>
              <p><strong>Year:</strong> {selectedMovie.year}</p>
              <p><strong>Score:</strong> {selectedMovie.score}</p>
              <p className="synopsis">{selectedMovie.synopsis}</p>
            </div>
          </div>
        )}

        {commentMovieId && (
          <div className="modal" onClick={() => setCommentMovieId(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setCommentMovieId(null)}>
                &times;
              </span>
              <h2>Add Comment and Rating</h2>
              <textarea
                rows="4"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <input
                type="number"
                placeholder="Rate this movie (1-10)"
                value={newRating}
                min="1"
                max="10"
                onChange={(e) => setNewRating(e.target.value)}
              />
              <button onClick={() => handleAddCommentAndRating(commentMovieId)}>
                Submit
              </button>
            </div>
          </div>
        )}

        <aside className="watched-box">
          <h2>🎬 Watched Movies</h2>
          {watched.length === 0 ? (
            <p>No watched movies yet.</p>
          ) : (
            watched.map((movie) => (
              <div key={movie.mal_id} className="watched-card">
                <img src={movie.image} alt={movie.title} />
                <div>
                  <h4>{movie.title}</h4>
                  <p><strong>Comment:</strong> {movie.comment}</p>
                  <p><strong>Your Rating:</strong> {movie.userRating}/10</p>
                </div>
              </div>
            ))
          )}
        </aside>
      </main>
    </>
  );
}

// src/components/WatchedList.jsx
import React from 'react';

function WatchedList({ movies }) {
  return (
    <div>
      <h2>Watched Movies</h2>
      {movies.length === 0 ? <p>No movies watched yet.</p> : null}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WatchedList;

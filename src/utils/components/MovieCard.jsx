import React from 'react';

function MovieCard({ movie, onWatch, watched }) {
  return (
    
    <div 
    style={{ border: '4px solid blck', 
    padding: '10px', 
    margin: '10px',
    backgroundColor: watched ? 'orange' : 'white',
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center'
    }}> 
      <img src={movie.thumbnail} alt={movie.title} width="50" />
      <h3>{movie.title} ({movie.year})</h3>
       <h4>({movie.description})</h4>
       <h5>({movie.ratting})</h5>
       <h6>({movie.ganre})</h6>
       <h7>({movie.director})</h7>
       
    
        <button onClick={() => onWatch(movie)} disabled={watched}>
        {watched ? "Watched" : "Mark as Watched"}
      </button>
      
    </div>
    

  );
}


export default MovieCard; // ⬅ WAJIB ADA

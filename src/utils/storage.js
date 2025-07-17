export function getWatchedMovies() {
  const data = localStorage.getItem('watched');
  return data ? JSON.parse(data) : [];
}

export function saveWatchedMovies(movies) {
  localStorage.setItem('watched', JSON.stringify(movies));
}

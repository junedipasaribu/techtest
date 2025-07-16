// src/utils/storage.js

const STORAGE_KEY = 'watched_movies';

export const getWatchedMovies = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWatchedMovies = (movies) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};
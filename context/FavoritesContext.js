import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('jobFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (job) => {
    const newFavorites = [...favorites, job];
    setFavorites(newFavorites);
    localStorage.setItem('jobFavorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (jobId) => {
    const newFavorites = favorites.filter(job => job._id !== jobId);
    setFavorites(newFavorites);
    localStorage.setItem('jobFavorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (jobId) => {
    return favorites.some(job => job._id === jobId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
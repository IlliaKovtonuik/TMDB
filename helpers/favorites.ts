import { Movie } from "../types/movie";
import { addFavorite } from "../store/slices/favoritesSlice";
import { AppDispatch } from "../store/store";

export const addToFavorites = (dispatch: AppDispatch, movie: Movie) => {
  dispatch(addFavorite(movie));
};

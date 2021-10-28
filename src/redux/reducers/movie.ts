import {
  GET_MOVIE_ERROR,
  GET_MOVIE_PENDING,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_BY_ID_ERROR,
  GET_MOVIE_BY_ID_PENDING,
  GET_MOVIE_BY_ID_SUCCESS,
  SEARCH_MOVIE_ERROR,
  SEARCH_MOVIE_PENDING,
  SEARCH_MOVIE_SUCCESS,
} from "../actions";
import { Action, MovieState } from "../types";

const initialState: MovieState = {
  movieList: [],
  totalResultList: 0,
  isLoadingMovieList: false,
  currentPage: 0,
  currentTitle: "star wars",
  movieDetail: null,
  isLoadingMovieDetail: false,
  isLoadingSearch: false,
};

export default (state = initialState, { type, payload }: Action) => {
  switch (type) {
    // get MOVIE

    case GET_MOVIE_BY_ID_PENDING:
      return { ...state, isLoadingMovieDetail: true };
    case GET_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoadingMovieDetail: false,
        movieDetail: payload.data,
      };
    case GET_MOVIE_BY_ID_ERROR:
      return { ...state, isLoadingMovieDetail: false };

    case SEARCH_MOVIE_PENDING:
      return { ...state, isLoadingSearch: true };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        isLoadingSearch: false,
        movieList: payload.data.data.Search,
        totalResultList: Number(payload.data.data.totalResults),
        currentPage: 1,
        currentTitle: payload.data.currentTitle,
      };
    case SEARCH_MOVIE_ERROR:
      return { ...state, isLoadingSearch: false };

    case GET_MOVIE_PENDING:
      return { ...state, isLoadingMovieList: true };
    case GET_MOVIE_SUCCESS:
      return {
        ...state,
        isLoadingMovieList: false,
        movieList: [...state.movieList, ...payload.data.data.Search],
        totalResultList: Number(payload.data.data.totalResults),
        currentPage: state.currentPage + 1,
        currentTitle: payload.data.currentTitle,
      };
    case GET_MOVIE_ERROR:
      return { ...state, isLoadingMovieList: false };

    default:
      return state;
  }
};

import { API } from "../../configs";
import { Dispatch } from "../types";

// get seasons
export const GET_MOVIE_PENDING = "GET_MOVIE_PENDING";
export const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
export const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";

export const GET_MOVIE_BY_ID_PENDING = "GET_MOVIE_BY_ID_PENDING";
export const GET_MOVIE_BY_ID_SUCCESS = "GET_MOVIE_BY_ID_SUCCESS";
export const GET_MOVIE_BY_ID_ERROR = "GET_MOVIE_BY_ID_ERROR";

export const SEARCH_MOVIE_PENDING = "SEARCH_MOVIE_PENDING";
export const SEARCH_MOVIE_SUCCESS = "SEARCH_MOVIE_SUCCESS";
export const SEARCH_MOVIE_ERROR = "SEARCH_MOVIE_ERROR";

export const getMovieById = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_MOVIE_BY_ID_PENDING });
    const res = await API.getMovieById(id);
    dispatch({
      type: GET_MOVIE_BY_ID_SUCCESS,
      payload: { data: res.data },
    });
  } catch (err) {
    if (err.response) {
      dispatch({
        type: GET_MOVIE_BY_ID_ERROR,
        payload: { data: err.response },
      });
    } else {
      dispatch({ type: GET_MOVIE_BY_ID_ERROR });
    }
  }
};

export const getMovie = (title: string, page: number) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: GET_MOVIE_PENDING });
    const res = await API.getMovie(title, page);
    dispatch({
      type: GET_MOVIE_SUCCESS,
      payload: { data: { data: res.data, currentTitle: title } },
    });
  } catch (err) {
    if (err.response) {
      dispatch({ type: GET_MOVIE_ERROR, payload: { data: err.response } });
    } else {
      dispatch({ type: GET_MOVIE_ERROR });
    }
  }
};

export const searchMovie = (title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: SEARCH_MOVIE_PENDING });
    const res = await API.getMovie(title, 1);
    dispatch({
      type: SEARCH_MOVIE_SUCCESS,
      payload: { data: { data: res.data, currentTitle: title } },
    });
  } catch (err) {
    if (err.response) {
      dispatch({ type: SEARCH_MOVIE_ERROR, payload: { data: err.response } });
    } else {
      dispatch({ type: SEARCH_MOVIE_ERROR });
    }
  }
};

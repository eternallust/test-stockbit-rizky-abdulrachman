import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import "./styles.scss";

import { documentTitle } from "../../utils";
import { Reducers } from "../../redux/types";
// import { IMAGES } from "../../configs";
import { getMovieById } from "../../redux/actions";

const Component = () => {
  documentTitle("Detail");
  const { id }: any = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  const movieState = useSelector((state: Reducers) => state.movie);
  const _renderDesc = (info: string, desc: string) => {
    return (
      <div className="info">
        <div style={{ marginTop: 20, width: "20%" }}>
          <span style={{ fontSize: 18 }}>{info}</span>
        </div>
        <div style={{ marginTop: 20, width: "90%" }}>
          <span style={{ fontSize: 18, fontWeight: "bold" }}>{desc}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="page-detail">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="content-header">
              <span className="logo">MovieKu</span>
            </div>
          </div>
          {movieState.isLoadingMovieDetail ? (
            <p>Loading...</p>
          ) : (
            <div className="movie-detail">
              <div className="content-detail">
                <img
                  className="imgPoster"
                  src={movieState.movieDetail && movieState.movieDetail.Poster}
                />
                <div style={{ marginLeft: 40 }}>
                  <div>
                    <span className="movie-title">
                      {movieState.movieDetail && movieState.movieDetail.Title}
                    </span>
                  </div>
                  <span style={{ fontSize: 18 }}>
                    {movieState.movieDetail && movieState.movieDetail.Plot}
                  </span>
                  {_renderDesc(
                    "Actors",
                    (movieState.movieDetail && movieState.movieDetail.Actors) ||
                      "-"
                  )}
                  {_renderDesc(
                    "Genres",
                    (movieState.movieDetail && movieState.movieDetail.Genre) ||
                      "-"
                  )}
                  {_renderDesc(
                    "Awards",
                    (movieState.movieDetail && movieState.movieDetail.Awards) ||
                      "-"
                  )}
                  {_renderDesc(
                    "Released",
                    (movieState.movieDetail &&
                      movieState.movieDetail.Released) ||
                      "-"
                  )}
                  {_renderDesc(
                    "IMDB",
                    (movieState.movieDetail &&
                      movieState.movieDetail.imdbRating) ||
                      "-"
                  )}
                  <button className="btn-back" onClick={() => history.goBack()}>
                    Back to home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Component);

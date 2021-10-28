import React, { useEffect, useCallback, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

import "./styles.scss";

import { documentTitle } from "../../utils";
import { getMovie, searchMovie } from "../../redux/actions";
import { Reducers } from "../../redux/types";
import { MovieCapsule } from "../../components";
import { IMAGES } from "../../configs";

const Component = () => {
  documentTitle("Home");

  const dispatch = useDispatch();
  const observer: any = useRef();
  const movieState = useSelector((state: Reducers) => state.movie);
  const [openModal, setOpenModal] = useState(false);
  const [viewPosterUrl, setViewPosterUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const history = useHistory();

  const lastMovieElementRef = useCallback(
    (node: any) => {
      if (movieState.isLoadingMovieList) {
        return null;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          movieState.currentPage < 100 &&
          movieState.movieList.length < movieState.totalResultList &&
          !movieState.isLoadingSearch
        ) {
          dispatch(
            getMovie(movieState.currentTitle, movieState.currentPage + 1)
          );
        }
      });
      if (node) {
        observer.current.observe(node);
      }
      return null;
    },
    [movieState, dispatch]
  );

  useEffect(() => {
    dispatch(getMovie(movieState.currentTitle, 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="page-home">
      <div className="container">
        <div className="content">
          <div className="header">
            <div className="content-header">
              <span className="logo">MovieKu</span>
              <div className="search">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="search-input"
                  placeholder="Search movie by title"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      dispatch(searchMovie(searchValue));
                    }
                  }}
                />
                <div onClick={() => dispatch(searchMovie(searchValue))}>
                  <img style={{ height: 20, width: 20 }} src={IMAGES.search} />
                </div>
              </div>
            </div>
          </div>
          <div className="banner" />
          <div className="list-movie">
            {movieState.movieList &&
              movieState.movieList.map((item: any, index: number) => {
                if (movieState.movieList.length === index + 1) {
                  return (
                    <MovieCapsule
                      key={index}
                      onClick={() => history.push(`/${item.imdbID}`)}
                      keyComponent={index}
                      refComponent={lastMovieElementRef}
                      imgSrc={item.Poster}
                      onClickImg={() => {
                        setOpenModal(true);
                        setViewPosterUrl(item.Poster);
                      }}
                      title={item.Title}
                    />
                  );
                }
                return (
                  <MovieCapsule
                    key={index}
                    onClick={() => history.push(`/${item.imdbID}`)}
                    keyComponent={index}
                    imgSrc={item.Poster}
                    onClickImg={() => {
                      setOpenModal(true);
                      setViewPosterUrl(item.Poster);
                    }}
                    title={item.Title}
                  />
                );
              })}
          </div>
          {movieState.isLoadingMovieList && (
            <div className="loading">
              <p>Loading...</p>
            </div>
          )}
          {!movieState.movieList && (
            <div className="loading">
              <p>Not found</p>
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        style={{
          overlay: {
            backgroundColor: "#00000050",
          },
          content: {
            backgroundColor: "transparent",
            borderWidth: 0,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          },
        }}
      >
        <img
          src={viewPosterUrl}
          onClick={() => setOpenModal(false)}
          className="movie-image-modal"
        />
      </Modal>
    </div>
  );
};

export default memo(Component);

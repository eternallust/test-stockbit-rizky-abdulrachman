import axios from "axios";

const host = axios.create({
  baseURL: process.env.REACT_APP_HOST,
});

// type body

const api = {
  getSeasons: () => host.get("seasons"),
  getMovie: (title: string, page: number) =>
    host.get(`?apikey=e234303c&s=${title}&page=${page}`),
  getMovieById: (id: string) => host.get(`?apikey=e234303c&i=${id}`),
};

export default api;

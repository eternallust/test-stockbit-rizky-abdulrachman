// actions
interface Payload {
  data?: any;
}

interface Params {
  type: string;
  payload?: Payload;
}

export type Dispatch = (params: Params | Function) => void;
export type GetState = () => Reducers;

export interface Action {
  type: string;
  payload: Payload;
}

// combine reducers
export interface Reducers {
  home: HomeState;
  detail: DetailState;
  movie: MovieState;
}

// reducers
export interface HomeState {
  count: number;
}

export interface DetailState {
  data: [];
  isLoading: boolean;
}

export interface MovieState {
  movieList: [];
  isLoadingMovieList: boolean;
  totalResultList: number;
  currentPage: number;
  currentTitle: string;
  movieDetail: any;
  isLoadingMovieDetail: boolean;
  isLoadingSearch: boolean;
}

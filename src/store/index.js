import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
  import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
  };


export const getGenres = createAsyncThunk('netflix/genres',async()=> {
  const {data:{genres}} = await axios.get(`${(TMDB_BASE_URL)}/genre/movie/list?api_key=${API_KEY}`);
//console.log(genres)
  return genres
})

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      'https://api.themoviedb.org/3/movie/popular?api_key=455c026cdba1d4666c6d0bed168a1040',
      genres,
      true
    );
  }
);


const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      //state.genresLoaded = true;
    });
     builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
     });
   
  },
});

export const store = configureStore({
  reducer:{
   netflix: NetflixSlice.reducer,
  },
});


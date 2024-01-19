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

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjQ4OTMwMmE1NzFlMzM4Nzk5YzQ5ODhjMDkzMzczNyIsInN1YiI6IjY1YTk5MjFiNWNlYTE4MDEzN2MwZjJjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h1_kZjQDYGjICQC59pxf_2sOK4VkOwUwKlnoCTqR9zk'
      }
    };

    const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, options);
    const data = await response.json();

    return getRawData(data, genres, true);
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
    // builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
    // builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
    // builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
  },
});

export const store = configureStore({
  reducer:{
   netflix: NetflixSlice.reducer,
  },
});


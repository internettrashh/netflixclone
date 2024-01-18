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

  const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=> {}
  })

export const store = configureStore({
  reducer:{
   netflix: NetflixSlice.reducer,
  },
});


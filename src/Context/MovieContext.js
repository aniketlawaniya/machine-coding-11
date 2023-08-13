import React, { createContext, useEffect, useReducer, useState } from "react";
import { movies } from "../Utils/Data";

export const MovieContext = createContext();
const moviesData = movies.map((movie) => ({
	...movie,
	addedToWatchLater: false,
	addedToStarred: false,
}));

const initialState = {
	moviesArr: JSON.parse(localStorage.getItem("MovieWatchList")) ?? moviesData,
};

function Reducer(state, action) {
	const { payload, type } = action;

	switch (type) {
		case "ADD MOVIE":
			return {
				...state,
				moviesArr: [...state.moviesArr, payload],
			};

		case "ADD TO WATCHLATER":
			return {
				...state,
				moviesArr: state.moviesArr.map((movie) =>
					movie.id === payload ? { ...movie, addedToWatchLater: true } : movie
				),
			};

		case "REMOVE FROM WATCHLATER":
			return {
				...state,
				moviesArr: state.moviesArr.map((movie) =>
					movie.id === payload ? { ...movie, addedToWatchLater: false } : movie
				),
			};

		case "ADD TO STARRED":
			return {
				...state,
				moviesArr: state.moviesArr.map((movie) =>
					movie.id === payload ? { ...movie, addedToStarred: true } : movie
				),
			};

		case "REMOVE FROM STARRED":
			return {
				...state,
				moviesArr: state.moviesArr.map((movie) =>
					movie.id === payload ? { ...movie, addedToStarred: false } : movie
				),
			};

		default:
			return state;
	}
}

const MovieContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, initialState);

	const [movieList, setMovieList] = useState(state.moviesArr);

	useEffect(() => {
		localStorage.setItem("MovieWatchList", JSON.stringify(state.moviesArr));
		setMovieList(state.moviesArr);
	}, [state]);

	return (
		<MovieContext.Provider value={{ state, dispatch, movieList, setMovieList }}>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieContextProvider;

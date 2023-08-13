import React, { useContext } from "react";
import MovieCard from "../Components/MovieCard";
import { MovieContext } from "../Context/MovieContext";

const Starred = () => {
	const { state } = useContext(MovieContext);
	const movies = state.moviesArr.filter((movie) => movie.addedToStarred);
	return (
		<div>
			<h1 className="text-3xl font-bold text-center pt-[30px]">
				Starred Movies
			</h1>
			<section className="flex flex-wrap gap-5 justify-center py-[20px]">
				{movies.length === 0 && (
					<p className="text-xl font-semibold text-red-400">
						Oops! No match found. Try something different.
					</p>
				)}
				{movies?.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
		</div>
	);
};

export default Starred;

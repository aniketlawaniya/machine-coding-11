import React, { useContext, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";
import AddMovieModal from "../Components/AddMovieModal";

const MovieList = () => {
	const { movieList } = useContext(MovieContext);
	const [openMovieModal, setOpenMovieModal] = useState(false);

	console.log(movieList);

	const [filters, setFilters] = useState({
		genre: "All",
		year: "All",
		rating: "All",
	});

	const allGenres = [...new Set(movieList.map((item) => item.genre).flat())];

	const years = Array.from(
		{ length: 2023 - 1990 + 1 },
		(_, index) => 1990 + index
	);
	const ratings = Array.from({ length: 10 }, (_, idx) => idx + 1);

	const genreFiltered =
		filters.genre === "All"
			? movieList
			: movieList?.filter((item) =>
					item.genre.some((el) => el === filters.genre)
			  );
	const yearFiltered =
		filters.year === "All"
			? genreFiltered
			: genreFiltered?.filter((item) => item.year === Number(filters.year));
	const ratingFiltered =
		filters.rating === "All"
			? yearFiltered
			: yearFiltered?.filter((item) => item.rating === Number(filters.rating));
	return (
		<div>
			<nav className="flex flex-wrap justify-between gap-2 p-3">
				<span className="text-xl font-bold">Movies</span>
				<select
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							genre: e.target.value,
						}))
					}
				>
					<option value="All">All Genre</option>
					{allGenres.map((genre, idx) => (
						<option value={genre} key={idx}>
							{genre}
						</option>
					))}
				</select>
				<select
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							year: e.target.value,
						}))
					}
				>
					<option value="All">Release Year</option>
					{years.map((year, idx) => (
						<option value={year} key={idx}>
							{year}
						</option>
					))}
				</select>
				<select
					onChange={(e) =>
						setFilters((prev) => ({
							...prev,
							rating: e.target.value,
						}))
					}
				>
					<option value="All">Rating</option>
					{ratings.map((rating, idx) => (
						<option value={rating} key={idx}>
							{rating}
						</option>
					))}
				</select>
				<button className="button" onClick={() => setOpenMovieModal(true)}>
					Add New Movie
				</button>
			</nav>
			{/* Modal */}
			<AddMovieModal
				openMovieModal={openMovieModal}
				setOpenMovieModal={setOpenMovieModal}
				ratings={ratings}
				years={years}
			/>
			<section className="flex flex-wrap gap-5 justify-center">
				{ratingFiltered.length === 0 && (
					<p className="text-xl font-semibold text-red-400">
						Oops! No match found. Try something different.
					</p>
				)}
				{ratingFiltered?.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</section>
		</div>
	);
};

export default MovieList;

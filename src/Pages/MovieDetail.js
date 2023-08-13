import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";

const MovieDetail = () => {
	const { movieId } = useParams();
	const { state } = useContext(MovieContext);
	const movie = state.moviesArr.find((item) => item.id === Number(movieId));

	return (
		<section className="flex justify-center items-center flex-col w-full py-[30px] ">
			<h1 className="text-2xl md:text-4xl font-bold text-center p-4 ">
				{movie?.title}
			</h1>
			<div className="flex flex-col gap-2 shadow-md p-3 shadow-black rounded-md md:w-[50%] ">
				<img
					className="min-w-[300px] max-h-[250px] w-full"
					src={movie?.imageURL}
					alt=""
				/>
				<p>
					<span className="text-lg font-semibold pr-2">Rating:</span>{" "}
					{movie?.rating}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Year:</span>{" "}
					{movie?.year}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Director:</span>{" "}
					{movie?.director}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Writer:</span>{" "}
					{movie?.writer}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Summary:</span>{" "}
					{movie?.summary}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Cast:</span>{" "}
					{movie?.cast.join(",")}
				</p>
				<p>
					<span className="text-lg font-semibold pr-2">Genre:</span>{" "}
					{movie?.genre.join(",")}
				</p>
			</div>
		</section>
	);
};

export default MovieDetail;

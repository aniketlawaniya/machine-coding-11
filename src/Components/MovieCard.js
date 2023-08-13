import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { MovieContext } from "../Context/MovieContext";
import { useToast } from "@chakra-ui/react";

const MovieCard = ({ movie }) => {
	const { dispatch } = useContext(MovieContext);
	const toast = useToast();
	const {
		id,
		title,
		rating,
		summary,
		imageURL,
		addedToWatchLater,
		addedToStarred,
	} = movie;

	const { pathname } = useLocation();
	return (
		<div className="p-3 shadow-lg shadow-gray-600 rounded-md min-w-[250px] w-[90%] md:w-[30%] lg:w-[25%] flex flex-col gap-2 justify-between">
			<Link to={`/movie/${id}`} className="w-full relative">
				<img src={imageURL} className="w-full h-[280px]  " alt="" />
				<span className="bg-green-700 text-yellow-400 px-2 py-1 rounded-md absolute top-1 right-1 flex gap-1 items-center">
					{rating} <AiFillStar size={20} />
				</span>
			</Link>
			<p className="text-lg font-bold text-center">{title}</p>
			<p className="text-center">{summary}</p>
			<div className={`flex justify-between p-3 `}>
				{pathname.includes("starred") ? (
					<button
						onClick={() =>
							dispatch({ type: "REMOVE FROM STARRED", payload: id })
						}
					>
						Remove From Starred
					</button>
				) : addedToStarred ? (
					<Link to="/starred">
						<button className="button">Starred</button>
					</Link>
				) : (
					<button
						onClick={() => dispatch({ type: "ADD TO STARRED", payload: id })}
						className="button"
					>
						Star
					</button>
				)}

				{pathname.includes("watchlater") ? (
					<button
						onClick={() =>
							dispatch({ type: "REMOVE FROM WATCHLATER", payload: id })
						}
					>
						Remove From Watch Later
					</button>
				) : addedToWatchLater ? (
					<Link to="/watchlater">
						<button className="button">Added To WatchLater</button>
					</Link>
				) : (
					<button
						onClick={() => dispatch({ type: "ADD TO WATCHLATER", payload: id })}
						className="button"
					>
						Add to WatchList
					</button>
				)}
			</div>
		</div>
	);
};

export default MovieCard;

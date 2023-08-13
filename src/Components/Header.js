import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";


const Header = () => {
	const { setMovieList, state } = useContext(MovieContext);
	const [inputText, setInputText] = useState("");
	const navigate = useNavigate();

	function handleInputSearch(e) {
		navigate("/");
		setMovieList(
			state.moviesArr.filter(
				(movie) =>
					movie.title.toLowerCase().includes(inputText.toLowerCase()) ||
					movie.director.toLowerCase().includes(inputText.toLowerCase()) ||
					movie.cast.some((el) =>
						el.toLowerCase().includes(inputText.toLowerCase())
					)
			)
		);
	}
	return (
		<header className="flex gap-2 flex-wrap justify-center sm:justify-between items-center text-white bg-gray-600 p-3 sticky top-0 z-10">
			<Link to="/" className="text-2xl font-bold">
				IMDB
			</Link>
			<span className="w-[40%]">
				<input
					className="w-full px-2 py-1 rounded-md text-black"
					type="search"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					onInput={handleInputSearch}
					placeholder="Search movies by title, cast and director ...."
				/>
			</span>
			<div className="flex gap-4 justify-between items-center">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`${isActive ? "text-red-400 font-bold" : "text-white"}`
					}
				>
					Movies
				</NavLink>
				<NavLink
					to="/watchlater"
					className={({ isActive }) =>
						`${isActive ? "text-red-400 font-bold" : "text-white"}`
					}
				>
					Watch Later
				</NavLink>
				<NavLink
					to="/starred"
					className={({ isActive }) =>
						`${isActive ? "text-red-400 font-bold" : "text-white"}`
					}
				>
					Starred
				</NavLink>
			</div>
		</header>
	);
};

export default Header;

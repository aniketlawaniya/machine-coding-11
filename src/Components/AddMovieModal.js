import React, { useContext, useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useToast,
} from "@chakra-ui/react";
import { MovieContext } from "../Context/MovieContext";

const AddMovieModal = ({
	openMovieModal,
	setOpenMovieModal,
	years,
	ratings,
}) => {
	const { state, dispatch } = useContext(MovieContext);

	const toast = useToast();
	const [formData, setFormData] = useState({
		id: state.moviesArr.length + 1,
		title: "",
		year: 2023,
		genre: [],
		rating: 5,
		director: "",
		writer: "",
		cast: [],
		summary: "",
		imageURL: "",
		addedToWatchLater: false,
		addedToStarred: false,
	});

	const [arrayText, setArrayText] = useState({
		genre: "",
		cast: "",
	});

	function handleFormChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function handleArrChange(e) {
		const { name, value } = e.target;
		setArrayText((prev) => ({
			...prev,
			[name]: value,
		}));

		setFormData((prev) => ({
			...prev,
			[name]: value.split(","),
		}));
	}
	function handleFormSubmit(e) {
		console.log(formData);
		e.preventDefault();
		dispatch({ type: "ADD MOVIE", payload: formData });
		setOpenMovieModal(false);
		setFormData({
			id: state.moviesArr.length + 1,
			title: "",
			year: 2023,
			genre: [],
			rating: 5,
			director: "",
			writer: "",
			cast: [],
			summary: "",
			imageURL: "",
			addedToWatchLater: false,
			addedToStarred: false,
		});
		setArrayText({
			genre: "",
			cast: "",
		});

		toast({
			title: "Movie added",
			description: "We've added your movie to your list.",
			status: "success",
			duration: 1500,
			isClosable: true,
			position: "top-right",
		});
	}
	return (
		<Modal isOpen={openMovieModal} onClose={() => setOpenMovieModal(false)}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add New Movie</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
						<label>
							<p>Title:</p>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleFormChange}
								required
							/>
						</label>
						<label>
							<p>Year:</p>

							<select
								className="w-full"
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										year: e.target.value * 1,
									}))
								}
								defaultValue=""
							>
								<option value="" disabled>
									Release Year
								</option>
								{years.map((year, idx) => (
									<option value={year} key={idx}>
										{year}
									</option>
								))}
							</select>
						</label>
						<label>
							<p>Genre:</p>
							<input
								type="text"
								name="genre"
								value={arrayText.genre}
								onChange={handleArrChange}
								placeholder="Separate multiple genres with ','"
								required
							/>
						</label>
						<label>
							<p>Rating:</p>
							<select
								defaultValue=""
								className="w-full"
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										rating: e.target.value * 1,
									}))
								}
							>
								<option value="" disabled>
									Select Rating
								</option>
								{ratings.map((rating, idx) => (
									<option value={rating} key={idx}>
										{rating}
									</option>
								))}
							</select>
						</label>
						<label>
							<p>Director:</p>
							<input
								type="text"
								name="director"
								value={formData.director}
								onChange={handleFormChange}
								required
							/>
						</label>
						<label>
							<p>Writer:</p>
							<input
								type="text"
								name="writer"
								value={formData.writer}
								onChange={handleFormChange}
								required
							/>
						</label>
						<label>
							<p>Cast:</p>
							<input
								type="text"
								name="cast"
								value={arrayText.cast}
								onChange={handleArrChange}
								placeholder="Separate multiple casts with ','"
								required
							/>
						</label>
						<label>
							<p>Summary:</p>
							<input
								type="text"
								name="summary"
								value={formData.summary}
								onChange={handleFormChange}
								required
							/>
						</label>
						<label>
							<p>Image URL:</p>
							<input
								type="url"
								name="imageURL"
								value={formData.imageURL}
								onChange={handleFormChange}
								required
							/>
						</label>
						<input
							className="text-white bg-red-400 rounded-md p-1 w-full my-3 cursor-pointer"
							type="submit"
							value="Add Movie"
						/>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default AddMovieModal;

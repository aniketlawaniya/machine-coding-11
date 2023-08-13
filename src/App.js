import { ChakraProvider } from "@chakra-ui/react";
import MovieContextProvider from "./Context/MovieContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Pages/Layout";
import MovieList from "./Pages/MovieList";
import WatchLater from "./Pages/WatchLater";
import Starred from "./Pages/Starred";
import ErrorPage from "./Pages/ErrorPage";
import MovieDetail from "./Pages/MovieDetail";

function App() {
	return (
		<ChakraProvider>
			<MovieContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index="true" element={<MovieList />} />
							<Route path="/watchlater" element={<WatchLater />} />
							<Route path="/starred" element={<Starred />} />
							<Route path="/movie/:movieId" element={<MovieDetail />} />
						</Route>
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</BrowserRouter>
			</MovieContextProvider>
		</ChakraProvider>
	);
}

export default App;

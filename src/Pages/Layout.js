import React, { useContext, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;

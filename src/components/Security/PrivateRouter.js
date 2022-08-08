import React from "react";
import { Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Component } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AuthService from "../../services/Auth/Auth.Services";

const PrivateRoute = ({ component, ...rest }) => {
	const [auth, setAuth] = useState(false);
	const [isTokenValidated, setIsTokenValidated] = useState(false);
	const Auth = new AuthService();

	useEffect(() => {
		// send jwt to API to see if it's valid]
		Auth.authorize()
			.then((res) => {
				if (res.data.success) {
					setAuth(true);
				}
			})
			.catch((err) => {
				setAuth(false);
			})
			.finally(() => {
				setIsTokenValidated(true);
			});
	}, []);

	if (!isTokenValidated)
		return (
			<Backdrop open={isTokenValidated} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<CircularProgress color="warning" />
			</Backdrop>
		); // or some kind of loading animation

	return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

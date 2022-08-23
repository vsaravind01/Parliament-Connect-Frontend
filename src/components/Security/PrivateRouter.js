import React from "react";
import { useState, useEffect, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AuthService from "../../services/Auth/Auth.Services";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component }) => {
	// const [auth, setAuth] = useState(false);
	const { authState, setAuthState } = useContext(AuthContext);
	const [isTokenValidated, setIsTokenValidated] = useState(false);
	const Auth = new AuthService();

	useEffect(() => {
		// send jwt to API to see if it's valid
		Auth.authorize()
			.then((res) => {
				console.log(res);
				if (res.data.success) {
					setAuthState({
						name: res.data.username,
						role: res.data.role,
						isAuthenticated: true,
						id: res.data.ref_id,
					});
				}
			})
			.catch((err) => {
				console.log(err);
				setAuthState({ name: "", role: "", isAuthenticated: false });
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
		);

	return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

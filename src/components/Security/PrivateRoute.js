import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthState } from "../../context/auth/authContext";

function PrivateRoute({ Component, path, ...rest }) {
	const { user } = useAuthState();

	return (
		<React.Fragment>
			<Route {...rest} path={path} element={user ? <Component /> : <Navigate to={"/login"} />} />
		</React.Fragment>
	);
}

export default PrivateRoute;

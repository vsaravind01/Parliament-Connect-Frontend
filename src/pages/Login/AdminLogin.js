import React from "react";
import MainLayout from "../MainLayout";
import LoginInput from "../../components/Login/LoginInput";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";

export default function AdminLogin() {
	const { authState } = React.useContext(AuthContext);
	return <MainLayout>{authState.isAuthenticated ? <Navigate to="/" /> : <LoginInput />}</MainLayout>;
}

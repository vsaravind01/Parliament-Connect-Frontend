import React from "react";
import MainLayout from "../MainLayout";
import MpMinistryLogin from "../../components/Login/MpMinistryLogin";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";

export default function AdminLogin() {
	const { authState } = React.useContext(AuthContext);
	return <MainLayout>{authState.isAuthenticated ? <Navigate to="/" /> : <MpMinistryLogin />}</MainLayout>;
}

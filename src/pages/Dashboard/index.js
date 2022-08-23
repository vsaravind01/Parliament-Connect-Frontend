import React from "react";
import Typography from "@mui/material/Typography";
import MainLayout from "../MainLayout";
import authContext from "../../context/auth/authContext";
import AdminDashboard from "./Admin.dashboard";
import MpDashboard from "./MpDashboard";
import MinistryDashboard from "./MinistryDashboard";

export default function Dashboard() {
	const { authState } = React.useContext(authContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<Typography variant="h4" component="h1" sx={{ mb: 3 }} gutterBottom>
				Welcome, {authState.name}!
			</Typography>
			{authState.role.includes("admin") ? (
				<AdminDashboard />
			) : authState.role.includes("MP") ? (
				<MpDashboard />
			) : (
				<MinistryDashboard />
			)}
		</MainLayout>
	);
}

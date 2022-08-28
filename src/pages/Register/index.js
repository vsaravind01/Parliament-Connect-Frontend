import React, { useContext } from "react";
import MainLayout from "../MainLayout";
import RegisterInput from "../../components/RegisterInput";
import authContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Index() {
	const { authState } = useContext(authContext);
	return (
		<MainLayout>
			{authState.role.includes("admin") ? (
				<RegisterInput />
			) : (
				<Container>
					<Typography variant="h3" component="h1" sx={{ mb: 3 }} gutterBottom>
						Oops! You are not authorized. Contact admin.
					</Typography>
				</Container>
			)}
		</MainLayout>
	);
}

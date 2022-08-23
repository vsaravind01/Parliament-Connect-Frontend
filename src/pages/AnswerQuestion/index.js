import React from "react";
import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import UnansweredQuestions from "./UnansweredQuestions";
import AuthContext from "../../context/auth/authContext";
import Typography from "@mui/material/Typography";
import AdminServices from "../../services/Admin/Admin.Services";

const Admin = new AdminServices();

export default function AnswerQuestion() {
	const { authState } = React.useContext(AuthContext);

	return (
		<MainLayout mediumScreenSize={12}>
			{authState.role.includes("Ministry") ? (
				<UnansweredQuestions />
			) : (
				<Container>
					<Typography variant="h3" component="h1" sx={{ mb: 3 }} gutterBottom>
						You are not authorized to answer questions.
					</Typography>
				</Container>
			)}
		</MainLayout>
	);
}

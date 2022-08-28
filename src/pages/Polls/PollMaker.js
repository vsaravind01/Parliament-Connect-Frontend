import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import PollMaker from "../../components/pollMaker";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";

export default function PollMakerPage() {
	return (
		<MainLayout mediumScreenSize={12}>
			<Container maxWidth="lg" sx={{ height: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3, mr: 3 }}>
					<Button variant="outlined" component={Link} to="/polls">
						Poll Dashboard
					</Button>
				</Box>
				<PollMaker />
			</Container>
		</MainLayout>
	);
}

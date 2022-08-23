import React from "react";
import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

export default function PostsPage() {
	return (
		<MainLayout mediumScreenSize={12}>
			<Container maxWidth="lg" sx={{ height: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
					<Card
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							textAlign: "center",
							gap: 2,
						}}
					>
						<CardHeader className="noselect" title="Create Post" subheader="Create a new post" />

						<Button variant="contained" component={Link} to="/posts/create">
							Go
						</Button>
					</Card>
					<Card
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
							textAlign: "center",
							gap: 2,
						}}
					>
						<CardHeader className="noselect" title="Posts Timeline" subheader="View your posts timeline" />
						<Button variant="contained" component={Link} to="/posts/timeline">
							Go
						</Button>
					</Card>
				</Box>
			</Container>
		</MainLayout>
	);
}

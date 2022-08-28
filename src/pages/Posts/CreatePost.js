import React from "react";
import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import PostUpload from "../../components/PostUpload";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Tooltip from "@mui/material/Tooltip";
import authContext from "../../context/auth/authContext";

export default function PostsPage() {
	const { authState } = React.useContext(authContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<Tooltip title="Go to posts dashboard" placement="right" sx={{ mb: 2 }}>
				<IconButton component={Link} to="/posts">
					<ArrowBackRoundedIcon />
				</IconButton>
			</Tooltip>
			<Container maxWidth="lg" sx={{ height: "100%" }}>
				<PostUpload />
			</Container>
		</MainLayout>
	);
}

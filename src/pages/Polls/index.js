import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PollResults from "../../components/PollResults";
import { Link } from "react-router-dom";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import IconButton from "@mui/material/IconButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";

export default function Polls() {
	return (
		<MainLayout mediumScreenSize={12}>
			<Tooltip sx={{ mb: 2 }} title="Go to dashboard" placement="right">
				<IconButton component={Link} to="/dashboard">
					<ArrowBackRoundedIcon />
				</IconButton>
			</Tooltip>
			<Container maxWidth="lg" sx={{ height: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Button fullWidth variant="contained" component={Link} to="/polls/poll-maker">
						Create Poll <AutoAwesomeRoundedIcon sx={{ width: 15 }} />
					</Button>
				</Box>
				<PollResults />
			</Container>
		</MainLayout>
	);
}

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";

export default function MpDashboard() {
	return (
		<Container maxWidth="lg" sx={{ height: "100%" }}>
			<Grid container spacing={3} sx={{ height: "100%" }} columns={{ xs: 4, md: 12 }}>
				<Grid item md={4} sx={{ width: "100%" }}>
					<Card sx={{ height: "100%", width: "100%" }}>
						<CardContent
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
							}}
						>
							<CardHeader
								sx={{ width: "90%" }}
								className="noselect"
								title={`Intelli Tracker`}
								subheader="Track your progress and manage your questions"
							/>
							<Button
								component={Link}
								to="/answer"
								variant="contained"
								color="primary"
								sx={{
									"&& .MuiTouchRipple-rippleVisible": {
										animationDuration: "250ms",
									},
								}}
							>
								Go
							</Button>
						</CardContent>
					</Card>
				</Grid>
				<Grid item md={4} sx={{ width: "100%" }}>
					<Card sx={{ height: "100%", width: "100%" }}>
						<CardContent
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
							}}
						>
							<CardHeader
								className="noselect"
								title="Change Password"
								subheader="Secure your account in one step"
							/>
							<Button
								component={Link}
								to="/reset_password"
								variant="contained"
								color="primary"
								sx={{
									"&& .MuiTouchRipple-rippleVisible": {
										animationDuration: "250ms",
									},
								}}
							>
								Go
							</Button>
						</CardContent>
					</Card>
				</Grid>
				{/*<Grid item md={4} sx={{ width: "100%" }}>*/}
				{/*	<Card sx={{ height: "100%", width: "100%" }}>*/}
				{/*		<CardContent*/}
				{/*			sx={{*/}
				{/*				height: "100%",*/}
				{/*				display: "flex",*/}
				{/*				flexDirection: "column",*/}
				{/*				justifyContent: "space-around",*/}
				{/*			}}*/}
				{/*		>*/}
				{/*			<CardHeader*/}
				{/*				className="noselect"*/}
				{/*				title="Polls Dashboard"*/}
				{/*				subheader="Manage your polls and view poll results"*/}
				{/*			/>*/}
				{/*			<Button*/}
				{/*				component={Link}*/}
				{/*				to="/polls"*/}
				{/*				variant="contained"*/}
				{/*				color="primary"*/}
				{/*				sx={{*/}
				{/*					"&& .MuiTouchRipple-rippleVisible": {*/}
				{/*						animationDuration: "250ms",*/}
				{/*					},*/}
				{/*				}}*/}
				{/*			>*/}
				{/*				Go*/}
				{/*			</Button>*/}
				{/*		</CardContent>*/}
				{/*	</Card>*/}
				{/*</Grid>*/}
				<Grid item md={4} sx={{ width: "100%" }}>
					<Card sx={{ height: "100%", width: "100%" }}>
						<CardContent
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
							}}
						>
							<CardHeader
								className="noselect"
								title="Posts Dashboard"
								subheader="Manage your posts and likes"
							/>
							<Button
								component={Link}
								to="/posts"
								variant="contained"
								color="primary"
								sx={{
									"&& .MuiTouchRipple-rippleVisible": {
										animationDuration: "250ms",
									},
								}}
							>
								Go
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

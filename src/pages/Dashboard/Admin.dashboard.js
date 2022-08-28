import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";

export default function AdminDashboard() {
	return (
		<Container maxWidth="lg">
			<Grid container spacing={3} sx={{ display: "flex" }}>
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
								title={`Upload Question`}
								subheader="Upload your question to our intelligent SearchQ Engine"
							/>
							<Button
								component={Link}
								to="/upload/question"
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
								sx={{ width: "90%" }}
								className="noselect"
								title={`PAID Console`}
								subheader="Manage the PAID credentials of your users"
							/>
							<Button
								component={Link}
								to="/register"
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
								sx={{ width: "90%" }}
								className="noselect"
								title={`Unanswered Questions`}
								subheader="View the unanswered questions"
							/>
							<Button
								component={Link}
								to="/all/unanswered"
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
								title="IM Console"
								subheader="Index Management Console to manage SearchQ Indices"
							/>
							<Button
								component={Link}
								to="/index/admin"
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

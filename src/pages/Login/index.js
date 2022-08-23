import React from "react";
import MainLayout from "../MainLayout";
import Divider from "@mui/material/Divider";
import AuthContext from "../../context/auth/authContext";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Login() {
	const { authState } = React.useContext(AuthContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Stack
					direction="row"
					spacing={5}
					sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
				>
					<Paper variant="outlined" sx={{ width: "50%", height: 200 }}>
						<Container
							sx={{
								height: "100%",
								display: "flex",
								justifyContent: "space-between",
								flexDirection: "column",
								textAlign: "center",
								p: 5,
							}}
						>
							<Typography variant="h5" component="h5" gutterBottom>
								Admin Login
							</Typography>
							<Button variant="contained" component={Link} to="/login/admin">
								Click here
							</Button>
						</Container>
					</Paper>
					<Divider orientation="vertical" flexItem />
					<Paper variant="outlined" sx={{ width: "50%" }}>
						<Container
							sx={{
								height: "100%",
								display: "flex",
								justifyContent: "space-between",
								flexDirection: "column",
								textAlign: "center",
								p: 5,
							}}
						>
							<Typography variant="h5" gutterBottom>
								MP/Ministry Login
							</Typography>
							<Button variant="contained" component={Link} to="/login/mp_ministry">
								Click here
							</Button>
						</Container>
					</Paper>
				</Stack>
			</div>
		</MainLayout>
	);
}

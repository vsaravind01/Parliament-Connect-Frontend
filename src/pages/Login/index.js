import React from "react";
import MainLayout from "../MainLayout";
import Divider from "@mui/material/Divider";
import AuthContext from "../../context/auth/authContext";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthSVG from "../../static/images/authsvg";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Login() {
	const { authState } = React.useContext(AuthContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<Container>
				<Paper variant="outlined" sx={{ p: 5 }}>
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
						<Typography variant="h2" component="h2" gutterBottom>
							Login
						</Typography>
						<Box sx={{ width: "30%" }}>
							<AuthSVG />
						</Box>
					</Box>
					<div
						style={{
							display: "flex",
							marginTop: 25,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Stack
							direction={{ md: "row", xs: "column" }}
							spacing={5}
							sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
						>
							<Paper variant="outlined" sx={{ width: { md: "50%", xs: "100%" }, height: 200 }}>
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
										Admin
									</Typography>
									<Button variant="contained" component={Link} to="/login/admin">
										Click here
									</Button>
								</Container>
							</Paper>
							<Divider orientation="vertical" flexItem />
							<Paper variant="outlined" sx={{ width: { md: "50%", xs: "100%" } }}>
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
										MP/Ministry
									</Typography>
									<Button variant="contained" component={Link} to="/login/mp_ministry">
										Click here
									</Button>
								</Container>
							</Paper>
						</Stack>
					</div>
				</Paper>
			</Container>
		</MainLayout>
	);
}

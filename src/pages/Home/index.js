import React from "react";
import Stack from "@mui/material/Stack";
import LoginInput from "../../components/Login/LoginInput";
import Divider from "@mui/material/Divider";
import MainLayout from "../MainLayout";
import Typography from "@mui/material/Typography";
import SearchImageContentHome from "../../static/images/SeachSVG";
import AuthContext from "../../context/auth/authContext";
import { Link } from "react-router-dom";

export default function Home() {
	const { authState } = React.useContext(AuthContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<Stack
				sx={{ display: "flex", justifyContent: "center", width: "100%", mt: { md: "5vw", sm: "3vw" } }}
				direction={{ xs: "column", md: "row" }}
				divider={<Divider orientation="vertical" flexItem />}
				spacing={{ xs: 5, md: 3 }}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						flex: 1,
					}}
				>
					<h1 style={{ marginBottom: 1 }}>EPACS</h1>
					<Typography className="noselect" variant="subtitle2">
						Effective Parliament Archive Connect System
					</Typography>
					<Link to="/search">
						<SearchImageContentHome primary="#d7508f" width="100%" style={{ marginTop: 60 }} />
					</Link>
				</div>
				{!authState.isAuthenticated && (
					<div style={{ flex: 1, marginLeft: "2vw", marginRight: "2vw" }}>
						<LoginInput />
					</div>
				)}
			</Stack>
		</MainLayout>
	);
}

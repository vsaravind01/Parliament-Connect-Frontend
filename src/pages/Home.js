import React from "react";
import Navpane from "../components/Navpane";
import SearchBar from "../components/searchBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SabhaFilter from "../components/sabhaFilter";
import Typography from "@mui/material/Typography";
import { Component } from "react";

const drawerWidth = 240;
class Home extends Component {
	render() {
		return (
			<Box sx={{ display: "flex" }}>
				<Navpane filters={<SabhaFilter />} />
				<Grid container justifyContent="center" alignItems="center">
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - ${drawerWidth}px)` },
						}}
					>
						<Toolbar />
						<Grid item xs={12}>
							<SearchBar />
						</Grid>
					</Box>
				</Grid>
			</Box>
		);
	}
}

export default Home;

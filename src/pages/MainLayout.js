import React from "react";
import Navpane from "../components/Navpane";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Component } from "react";

const drawerWidth = 275;

class MainLayout extends Component {
	render() {
		return (
			<Box sx={{ display: "flex", mt: 10 }}>
				{this.props.navFilters ? <Navpane filters={this.props.navFilters} /> : <Navpane />}
				<Grid container justifyContent="center" alignItems="center">
					<Box
						component="main"
						sx={{
							display: "flex",
							justifyContent: "center",
							flex: 1,
							p: { md: 4, sm: 1 },
							pt: 10,
							width: `calc(100% - ${drawerWidth}px - 25px)`,
							height: "100%",
						}}
					>
						<Grid
							item
							sx={{ maxWidth: "90%", height: "100%" }}
							xs={this.props.smallScreenSize}
							md={this.props.mediumScreenSize}
						>
							{this.props.children}
						</Grid>
					</Box>
				</Grid>
			</Box>
		);
	}
}

MainLayout.defaultProps = {
	smallScreenSize: 12,
	mediumScreenSize: 6,
	navFilters: null,
};

export default MainLayout;

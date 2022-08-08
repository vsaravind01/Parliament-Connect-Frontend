import React from "react";
import Navpane from "../components/Navpane";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Component } from "react";

const drawerWidth = 240;

class MainLayout extends Component {
	render() {
		return (
			<Box sx={{ display: "flex", mt: 5 }}>
				{this.props.navFilters ? <Navpane filters={this.props.navFilters} /> : <Navpane />}
				<Grid container justifyContent="center" alignItems="center">
					<Box
						component="main"
						sx={{
							display: "flex",
							justifyContent: "center",
							flexGrow: 1,
							p: 3,
							pt: 10,
							width: {
								md: `calc(100% - ${drawerWidth}px - 25px)`,
							},
						}}
					>
						<Grid
							item
							sx={{ maxWidth: "90%" }}
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

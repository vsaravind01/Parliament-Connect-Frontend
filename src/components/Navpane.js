import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { logout } from "../utils/logout";
import AuthContext from "../context/auth/authContext";
import { useLocation } from "react-router-dom";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";

const drawerWidth = 275;

function ResponsiveDrawer(props) {
	const { window, filters } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { authState } = React.useContext(AuthContext);
	const currentPath = useLocation().pathname;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
					}}
				>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
							<img width={25} src="/epacs-logo-without-text.png" alt="logo" />

							<Typography variant="button" color="text.primary">
								EPACS
							</Typography>
						</Box>
					</Link>
					<Typography sx={{ ml: 3, mr: 0, mt: 0, mb: 0 }} variant="caption" color="text.secondary">
						v1
					</Typography>
				</Box>
			</Toolbar>
			<Divider />
			<List disablePadding>
				<ListItem disablePadding>
					<ListItemButton component={Link} to="/search">
						<ListItemIcon>
							<SearchIcon color={currentPath === "/search" ? "primary" : "inherit"} />
						</ListItemIcon>
						<ListItemText primary="Search" />
					</ListItemButton>
				</ListItem>
				<Divider />

				<ListItem disablePadding>
					{authState.isAuthenticated && authState.role ? (
						authState.role.includes("Ministry") ? (
							<ListItemButton component={Link} to="/answer">
								<ListItemIcon>
									<QuestionAnswerRoundedIcon
										color={currentPath === "/answer" ? "primary" : "inherit"}
									/>
								</ListItemIcon>
								<ListItemText primary="Intelli Tracker" />
							</ListItemButton>
						) : (
							<ListItemButton component={Link} to="/upload/question">
								<ListItemIcon>
									<QuestionAnswerRoundedIcon
										color={currentPath === "/upload/question" ? "primary" : "inherit"}
									/>
								</ListItemIcon>
								<ListItemText primary="Upload Question" />
							</ListItemButton>
						)
					) : (
						<ListItemButton component={Link} to="/login">
							<ListItemIcon>
								<QuestionAnswerRoundedIcon color={currentPath === "/login" ? "primary" : "inherit"} />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemButton>
					)}
				</ListItem>
				<Divider />
				<ListItem disablePadding>
					<ListItemButton component={Link} to="/dashboard">
						<ListItemIcon>
							<DashboardCustomizeRoundedIcon
								color={currentPath === "/dashboard" ? "primary" : "inherit"}
							/>
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			{filters ? filters : <></>}
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<CssBaseline />
			<AppBar
				position="fixed"
				elevation={6}
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Parliament Connect
					</Typography>
					{authState.isAuthenticated ? (
						<Button color="inherit" onClick={logout}>
							Logout
						</Button>
					) : (
						<Button color="inherit" component={Link} to={currentPath === "/login" ? "/register" : "/login"}>
							{currentPath === "/login" ? "Register" : "Login"}
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					elevation={6}
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
}

export default ResponsiveDrawer;

import React from "react";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import PrivateRouter from "./components/Security/PrivateRouter";
// import { orange } from "@mui/material/colors";

const App = () => {
	const [darkMode, setDarkMode] = React.useState(false);
	const theme = createTheme({
		palette: {
			type: darkMode ? "dark" : "light",
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path="/" element={<PrivateRouter />}>
					<Route path="search" element={<Search />} />
				</Route>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/register" element={<Register />} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;

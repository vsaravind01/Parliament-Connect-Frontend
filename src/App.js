import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		type: "dark",
		// primary: {
		// 	main: "#F28444",
		// },
		// secondary: {
		// 	main: "#388e3c",
		// },
		special: {
			main: orange[900]
		}
	},
});

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;

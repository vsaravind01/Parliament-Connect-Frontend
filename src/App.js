import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ffc77d",
		},
		secondary: {
			main: "#ee0290",
		},
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

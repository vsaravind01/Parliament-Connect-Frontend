import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core/styles";
import { AuthProvider } from "./context/auth/authContext";
import Routes from "./Routes";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
	const [darkMode, setDarkMode] = React.useState(false);
	const theme = createTheme({
		palette: {
			common: {
				black: "#000",
				white: "#fff",
			},
			background: {
				paper: "#fff",
				default: "hsl(329deg 100% 97%)",
			},
			primary: {
				main: "#d7508f",
				contrastText: "hsl(329deg 100% 97%)",
			},
			secondary: {
				main: "hsl(264deg 76% 39%)",
				contrastText: "hsl(329deg 100% 97%)",
			},
			action: {
				disabled: "rgba(0, 0, 0, 0.38)",
			},
			lightText: {
				main: "hsl(329deg 100% 97%)",
			},
			text: {
				primary: "rgba(0, 0, 0, 0.87)",
				secondary: "rgba(0, 0, 0, 0.54)",
				disabled: "rgba(0, 0, 0, 0.38)",
				hint: "rgba(0, 0, 0, 0.38)",
			},
			type: "light",
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;

import * as React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SearchBar() {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch(
				"http://localhost:5000/api/admin/parliament/question/recent"
			);
			const data = await response.json();
			if (active) {
				setOptions([...data.data]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<Autocomplete
				id="search_bar"
				freeSolo
				sx={{ width: "75%" }}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				isOptionEqualToValue={(option, value) =>
					option.qid === value.qid
				}
				getOptionLabel={(option) => option.question}
				options={options}
				loading={loading}
				renderOption={(props, option) => (
					<Box component="li" {...props} key={option.qid}>
						{option.question}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						color="secondary"
						label="Search"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress
											color="primary"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
									<IconButton color="success">
										<SearchIcon />
									</IconButton>
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</div>
	);
}

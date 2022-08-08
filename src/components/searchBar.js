import * as React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function SearchBar(props) {
	const { searchFunc } = props;

	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const valueRef = React.useRef("");

	const [sabhaVersion, setSabhaVersion] = React.useState({
		lok_sabha: true,
		rajya_sabha: true,
		lok_sabha_version: "",
		rajya_sabha_version: "",
	});

	const loading = open && options.length === 0;

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const alert = (
		<Dialog
			open={dialogOpen}
			onClose={handleDialogOpen}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Connection Error. Please check your internet connection.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} autoFocus>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setOpen(false);
		let data = valueRef.current.value;
		searchFunc(data);
	};

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await fetch("http://192.168.29.246:8080/recents", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					index: "lok_sabha_17_test",
				}),
			});
			const data = await response.json();
			if (active) {
				console.log("load");
				setOptions([...data.hits.hits]);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			console.log("init");
			setOptions([]);
		}
	}, [open]);

	const keypress = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setOpen(false);
			let data = valueRef.current.value;
			searchFunc(data);
		}
	};

	const autoSuggest = async (event, value) => {
		fetch(`http://192.168.29.246:8080/suggest`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				query: value,
				index: "lok_sabha_17_test",
				size: 10,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("autoSuggest");
				setOptions(data.suggest.subject_suggestions[0].options);
				if (options.length === 0) {
					setOpen(false);
				} else {
					setOpen(true);
				}
			})
			.catch((err) => {
				console.log("set");
				setError(true);
			});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			{error ? { alert } : <></>}
			<Autocomplete
				id="search_bar"
				freeSolo
				sx={{ width: "90%" }}
				open={open}
				autoComplete
				onClose={() => {
					setOpen(false);
				}}
				onInputChange={autoSuggest}
				getOptionLabel={(option) =>
					typeof option !== "string"
						? option.text === undefined
							? option._source.subject
							: option.text
						: option
				}
				options={options}
				loading={loading}
				renderOption={(props, option) => (
					<Box component="li" {...props} key={option._id}>
						{option.text ? option.text : option._source.subject}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						color=""
						label="Search"
						inputRef={valueRef}
						onKeyDown={keypress}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? <CircularProgress color="primary" size={20} /> : null}
									{params.InputProps.endAdornment}
									<IconButton
										color="success"
										onClick={handleSubmit}
										sx={{
											"&& .MuiTouchRipple-rippleVisible": {
												animationDuration: "200ms",
											},
										}}
									>
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

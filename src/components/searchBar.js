import * as React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import ErrorDialog from "./ErrorDialog";
import Routes from "../services/Routes/routes.config";
import AdminServices from "../services/Admin/Admin.Services";

const Admin = new AdminServices();

export default function SearchBar(props) {
	const { searchFunc } = props;

	const [open, setOpen] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const valueRef = React.useRef("");

	const searchEngine = Routes.searchEngine;

	const [sabhaVersion, setSabhaVersion] = React.useState({
		lok_sabha: true,
		rajya_sabha: true,
		lok_sabha_version: "",
		rajya_sabha_version: "",
	});

	const [current_lok_sabhaVersion, set_Current_lok_sabhaVersion] = React.useState("");
	const [current_rajya_sabhaVersion, set_Current_rajya_sabhaVersion] = React.useState("");

	React.useEffect(() => {
		(async () => {
			const currentSabha = await Admin.get_current_sabha_version();

			set_Current_lok_sabhaVersion(currentSabha.data.result[0].lok_sabha);
			set_Current_rajya_sabhaVersion(currentSabha.data.result[0].rajya_sabha);
		})();
	}, []);

	const loading = open && options.length === 0;

	const alert = <ErrorDialog title="Connection Error" message="Check your internet connection." />;

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
			const response = await fetch(`${searchEngine}/recents`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					index: `lok_sabha_${current_lok_sabhaVersion},rajya_sabha_${current_rajya_sabhaVersion}`,
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
		fetch(`${searchEngine}/suggest`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				query: value,
				index: "lok_sabha_*,rajya_sabha_*",
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
				console.log(err);
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
			{error && alert}
			<Autocomplete
				id="search_bar"
				freeSolo
				sx={{ width: "100%", borderRadius: 10 }}
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
						autoFocus={true}
						placeholder="Search"
						variant="standard"
						inputRef={valueRef}
						onKeyDown={keypress}
						sx={{
							pl: 3,
							pr: 2,
							height: 55,
							":hover": {
								border: "1px solid #ccc",
								backgroundColor: "#ffffff",
							},
							":focus": {
								backgroundColor: "#ffffff",
							},
							backgroundColor: "#fffbfd",
							borderRadius: "25px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							border: "1px solid #e0e0e0",
						}}
						InputProps={{
							...params.InputProps,
							disableUnderline: true,
							endAdornment: (
								<React.Fragment>
									{loading ? <CircularProgress color="primary" size={20} /> : null}
									{params.InputProps.endAdornment}
									<IconButton
										onClick={handleSubmit}
										sx={{
											color: "blue",
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

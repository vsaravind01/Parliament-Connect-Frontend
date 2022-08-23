import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthManager from "../../services/Auth/Auth.Services";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ErrorDialog from "../ErrorDialog";
import MpSearchBar from "../MpSearchBar";
import MinistrySearchBar from "../MinistrySearchBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

export default function LoginInput() {
	const [values, setValues] = React.useState({
		username: "",
		password: "",
		showPassword: false,
		usernameError: "",
		passwordError: "",
		unknownError: "",
		unknownErrorMessage: "",
	});

	const [ref_id, setRef_id] = React.useState("");
	const [ref_idError, setRef_idError] = React.useState("");

	const [error, setError] = React.useState(true);
	const { setAuthState } = React.useContext(AuthContext);

	const [mode, setMode] = React.useState("MP");

	const navigate = useNavigate();
	const Auth = new AuthManager();

	const setID = (id) => {
		if (id.length === 0) {
			setRef_idError("Reference ID required");
		}
		setRef_id(id);
	};

	const setMP_Ministry = (value) => {
		if (value === "") {
			setValues({ ...values, usernameError: "Username required" });
		} else {
			setValues({ ...values, usernameError: "" });
		}
		setValues({ ...values, username: value });
		console.log(values);
	};

	const handleMode = (event, newValue) => {
		setMode(newValue);
	};

	const handleChange = (prop) => (event) => {
		if (event.target.value.length === 0) {
			setValues({ ...values, [prop]: event.target.value, [prop + "Error"]: `${prop} required` });
			setError(true);
		} else {
			setValues({ ...values, [prop]: event.target.value, [prop + "Error"]: "" });
			if (values.password.length > 0 && values.username.length > 0) {
				setError(false);
			}
		}
	};

	const handleKeyDown = (event) => {
		if (!error && event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();
			handleOnClick(event);
		}
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleOnClick = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		setValues({
			...values,
			usernameError: "",
			passwordError: "",
		});
		Auth.login({ uname: values.username, password: values.password, role: mode, ref_id: ref_id })
			.then((res) => {
				if (res.data.status === "success") {
					setAuthState({ name: res.data.username, isAuthenticated: true });
					navigate("/search");
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.message === "Network Error") {
					setValues({
						...values,
						unknownError: "Network Error",
						unknownErrorMessage: "Check your internet connection.",
					});
				} else if (err.response.data.status === "error") {
					if (err.response.data.message === "User not found") {
						setValues({
							...values,
							usernameError: "User not found",
						});
					} else if (err.response.data.message === "Password incorrect") {
						setValues({
							...values,
							passwordError: "Password incorrect",
						});
					} else {
						setValues({
							...values,
							unknownError: `${err.response.status} - ${err.code}`,
							unknownErrorMessage: "Oops! an unknown error has been occurred.",
						});
					}
				} else {
					setValues({
						...values,
						unknownError: `${err.response.status} - ${err.code}`,
						unknownErrorMessage: "Oops! an unknown error has been occurred.",
					});
				}
			});
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{values.unknownError.length > 0 && (
				<ErrorDialog
					title={values.unknownError}
					message={values.unknownErrorMessage}
					onClose={() => setValues({ ...values, unknownError: "" })}
				/>
			)}
			<Paper
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					mxt: 2,
				}}
				variant="outlined"
			>
				<Tabs
					variant="fullWidth"
					value={mode}
					onChange={handleMode}
					textColor="secondary"
					indicatorColor="primary"
					aria-label="MP-Ministry-login-switcher"
				>
					<Tab value={"MP"} label="MP" />
					<Divider orientation="vertical" flexItem />
					<Tab value={"Ministry"} label="Ministry" />
				</Tabs>
				<Divider />
				<FormControl
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						mxt: 2,
					}}
				>
					<Typography className="noselect" sx={{ pt: 5 }} variant="h4" color="text.primary">
						Sign in
					</Typography>
					<FormLabel>
						<Typography className="noselect" sx={{ pt: 2, pb: 5 }} variant="body2" color="text.secondary">
							Sign in to acquire {mode} privileges
						</Typography>
					</FormLabel>
					<form
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							width: "75%",
						}}
					>
						<FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
							{mode === "MP" ? (
								<MpSearchBar setMp={setMP_Ministry} />
							) : mode === "Ministry" ? (
								<MinistrySearchBar setMinistry={setMP_Ministry} />
							) : (
								<Typography variant="h5" sx={{ display: "flex", textAlign: "center" }}>
									Not a valid mode. Please contact the system administrator.
								</Typography>
							)}
							<FormHelperText disabled={true} error={true}>
								{values.usernameError.length > 0 && values.usernameError}
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
							<InputLabel
								className="noselect"
								color={values.usernameError.length > 0 ? "error" : "primary"}
								htmlFor="ref_id_input"
							>
								{mode} ID
							</InputLabel>
							<OutlinedInput
								required={true}
								color="primary"
								value={ref_id}
								onChange={(e) => setID(e.target.value)}
								onKeyDown={handleKeyDown}
								id="username_input"
								label={mode + "ID"}
								error={ref_id === ""}
							/>
							<FormHelperText disabled={true} error={true}>
								{ref_id === "" && ref_idError}
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
							<InputLabel
								className="noselect"
								color={values.passwordError.length > 0 ? "error" : "primary"}
								htmlFor="password_input"
							>
								Password
							</InputLabel>
							<OutlinedInput
								id="password_input"
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								onKeyDown={handleKeyDown}
								error={values.passwordError.length > 0}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
							<FormHelperText disabled={true} error={true}>
								{values.passwordError.length > 0 && values.passwordError}
							</FormHelperText>
						</FormControl>
						<Stack
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "right",
								mb: 7,
								mt: 3,
							}}
							direction="row"
							spacing={3}
						>
							<FormControl variant="outlined" component={Box}>
								<Button
									type="submit"
									disabled={error}
									color="secondary"
									disableElevation={true}
									variant="contained"
									onClick={handleOnClick}
									sx={{
										"&& .MuiTouchRipple-rippleVisible": {
											animationDuration: "250ms",
										},
									}}
								>
									Sign In
								</Button>
							</FormControl>
						</Stack>
					</form>
				</FormControl>
			</Paper>
		</div>
	);
}

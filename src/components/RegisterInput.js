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
import AuthManager from "../services/Auth/Auth.Services";
import FormHelperText from "@mui/material/FormHelperText";
import ErrorDialog from "./ErrorDialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MpSearchBar from "./MpSearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MinistrySearchBar from "./MinistrySearchBar";

// Component to handle user registration
export default function RegisterInput() {
	const [values, setValues] = React.useState({
		username: "",
		password: "",
		confirmPassword: "",
		showPassword: false,
		usernameError: "",
		passwordError: "",
		confirmPasswordError: "",
		unknownError: "",
	});

	const [alert, setAlert] = React.useState({ open: false, message: "", severity: "success" });
	const [loading, setLoading] = React.useState(false);

	const [ref_id, setRef_id] = React.useState("");

	const setID = (id) => {
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

	// Error state to enable or disable the submit button
	const [error, setError] = React.useState(true);
	const [role, setRole] = React.useState("MP");

	const Auth = new AuthManager();

	// Handle the input change - Username | Password | Confirm Password
	const handleChange = (prop) => (event) => {
		if (event.target.value.length === 0) {
			setValues({
				...values,
				[prop]: event.target.value,
				[prop + "Error"]: `${prop === "confirmPassword" ? "Password confirmation" : prop} required`,
			});
			setError(true);
		} else {
			setValues({ ...values, [prop]: event.target.value, [prop + "Error"]: "" });
			if (values.password.length > 0 && values.username.length > 0 && values.confirmPassword.length > 0) {
				setError(false);
			}
		}
		console.log(values);
	};

	// Handle the show password button click - Show | Hide password
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	// Handle the show password button click - prevents the input being cleared
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleKeyDown = (event) => {
		if (!error && event.key === "Enter") {
			event.preventDefault();
			event.stopPropagation();
			handleOnClick(event);
		}
	};

	// Handle the submit button click - Register the user
	const handleOnClick = async (event) => {
		// Check if the password and confirm password match
		event.preventDefault();
		setValues({
			...values,
			usernameError: "",
			passwordError: "",
		});
		if (values.password !== values.confirmPassword) {
			setValues({
				...values,
				confirmPasswordError: "Password confirmation does not match",
			});
			setError(true);
		} else {
			setLoading(true);
			// Register the user
			Auth.signup({ uname: values.username, password: values.password, role: role, ref_id: ref_id })
				.then((res) => {
					if (res.data.status === "success") {
						setAlert({ open: true, message: "Registration successful", severity: "success" });
					} else {
						setAlert({ open: true, message: res.data.message, severity: "error" });
						// setValues({
						// 	...values,
						// 	unknownError: "Unknown Error",
						// 	unknownErrorMessage: "An unknown error occurred.",
						// });
					}
				})
				.catch((err) => {
					console.log(err);
					if (err.message === "Network Error") {
						// setValues({
						// 	...values,
						// 	unknownError: "Network Error",
						// 	unknownErrorMessage: "Check your internet connection.",
						// });
						setAlert({ open: true, message: "Network Error", severity: "error" });
					} else if (err.response.data.status === "error") {
						// Error registering the user
						if (err.response.data.message === "User already exists") {
							// setValues({
							// 	...values,
							// 	usernameError: "User already exists",
							// });
							setAlert({ open: true, message: "User already registered", severity: "error" });
						} else {
							// setValues({
							// 	...values,
							// 	unknownError: `${err.response.status} - ${err.code}`,
							// 	unknownErrorMessage: "Oops! an unknown error has been occurred.",
							// });
							setAlert({ open: true, message: "Unknown Error", severity: "error" });
						}
					} else {
						// setValues({
						// 	...values,
						// 	unknownError: `${err.response.status} - ${err.code}`,
						// 	unknownErrorMessage: "Oops! an unknown error has been occurred.",
						// });
						setAlert({ open: true, message: "Unknown Error", severity: "error" });
					}
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column", // center horizontally
				alignItems: "center",
				justifyContent: "center",
				gap: "1rem",
			}}
		>
			{values.unknownError.length > 0 && (
				<ErrorDialog
					title={values.unknownError}
					message={values.unknownErrorMessage}
					onClose={() => setValues({ ...values, unknownError: "", unknownErrorMessage: "" })}
				/>
			)}
			{alert.open && (
				<Alert
					sx={{ width: "100%" }}
					severity={alert.severity}
					onClose={() => setAlert({ ...alert, open: false })}
				>
					{alert.message}
				</Alert>
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
					<Typography
						className={"noselect"}
						sx={{ pt: 5, textAlign: "center" }}
						variant="h4"
						color="text.primary"
					>
						Register
					</Typography>
					<FormLabel sx={{ display: "flex", justifyContent: "center", textAlign: "center", width: "75%" }}>
						<Typography className={"noselect"} sx={{ pt: 2, pb: 1 }} variant="body2" color="text.secondary">
							Register to gain access to the application
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
							<InputLabel id="role-select-label">Role</InputLabel>
							<Select
								label="Role"
								value={role}
								displayEmpty={true}
								onChange={(event) => {
									setValues({ ...values, username: "" });
									setRole(event.target.value);
								}}
							>
								<MenuItem value={"Admin"}>Admin</MenuItem>
								<MenuItem value={"MP"}>MP</MenuItem>
								<MenuItem value={"Ministry"}>Ministry</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
							{role === "MP" ? (
								<MpSearchBar setMp={setMP_Ministry} setID={setID} />
							) : role === "Ministry" ? (
								<MinistrySearchBar setMinistry={setMP_Ministry} setID={setID} />
							) : (
								<>
									<InputLabel
										className="noselect"
										color={values.usernameError.length > 0 ? "error" : "primary"}
										htmlFor="username_input"
									>
										Username
									</InputLabel>
									<OutlinedInput
										required={true}
										color="primary"
										value={values.username}
										onChange={handleChange("username")}
										onKeyDown={handleKeyDown}
										id="username_input"
										label="Username"
										error={values.usernameError.length > 0}
									/>
								</>
							)}
							<FormHelperText disabled={true} error={true}>
								{values.usernameError.length > 0 && values.usernameError}
							</FormHelperText>
						</FormControl>

						<FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
							<InputLabel
								className={"noselect"}
								color={values.passwordError.length > 0 ? "error" : "primary"}
								htmlFor="password_input"
							>
								Password
							</InputLabel>
							<OutlinedInput
								required={true}
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
								{/*show password error message on passwordError length > 0*/}
								{values.passwordError.length > 0 && values.passwordError}
							</FormHelperText>
						</FormControl>
						<FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
							<InputLabel
								className={"noselect"}
								color={values.passwordError.length > 0 ? "error" : "primary"}
								htmlFor="confirm_password_input"
							>
								Confirm Password
							</InputLabel>
							<OutlinedInput
								required={true}
								id="confirm_password_input"
								type={values.showPassword ? "text" : "password"}
								value={values.confirmPassword}
								onChange={handleChange("confirmPassword")}
								onKeyDown={handleKeyDown}
								error={values.confirmPasswordError.length > 0}
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
								label="Confirm Password"
							/>
							<FormHelperText disabled={true} error={true}>
								{/*show confirm password error message on confirmPasswordError length > 0*/}
								{values.confirmPasswordError.length > 0 && values.confirmPasswordError}
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
							{/*<FormControl variant="outlined" component={Box}>*/}
							{/*	<Button*/}
							{/*		onClick={redirectToLogin}*/}
							{/*		color="secondary"*/}
							{/*		sx={{*/}
							{/*			"&& .MuiTouchRipple-rippleVisible": {*/}
							{/*				animationDuration: "250ms",*/}
							{/*			},*/}
							{/*		}}*/}
							{/*	>*/}
							{/*		Sign in instead*/}
							{/*	</Button>*/}
							{/*</FormControl>*/}
							<FormControl variant="outlined" component={Box}>
								<Box sx={{ m: 1, position: "relative" }}>
									{loading && (
										<CircularProgress
											size={24}
											sx={{
												position: "absolute",
												top: "50%",
												left: "50%",
												marginTop: "-12px",
												marginLeft: "-12px",
											}}
										/>
									)}
									<Button
										disabled={error || loading}
										type="submit"
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
										Create
									</Button>
								</Box>
							</FormControl>
						</Stack>
					</form>
				</FormControl>
			</Paper>
		</div>
	);
}

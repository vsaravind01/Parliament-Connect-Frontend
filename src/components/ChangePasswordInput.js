import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
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
import AuthContext from "../context/auth/authContext";
import CircularProgress from "@mui/material/CircularProgress";

// Component to handle user registration
export default function RegisterInput() {
	const [values, setValues] = React.useState({
		password: "",
		newPassword: "",
		showPassword: false,
		passwordError: "",
		newPasswordError: "",
		unknownError: "",
	});

	// Error state to enable or disable the submit button
	const [error, setError] = React.useState(true);

	const [loading, setLoading] = React.useState(false);

	// Navigation hook
	const navigate = useNavigate();
	const { setAuthState } = React.useContext(AuthContext);

	const Auth = new AuthManager();

	// Handle the input change -  Password | Confirm Password
	const handleChange = (prop) => (event) => {
		if (event.target.value.length === 0) {
			setValues({
				...values,
				[prop]: event.target.value,
				[prop + "Error"]: `${prop === "newPassword" ? "Password confirmation" : prop} required`,
			});
			setError(true);
		} else {
			setValues({ ...values, [prop]: event.target.value, [prop + "Error"]: "" });
			if (values.password.length > 0 && values.newPassword.length > 0) {
				setError(false);
			}
		}
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
		setValues({
			...values,
			passwordError: "",
			unknownError: "",
		});

		setLoading(true);
		// Register the user
		Auth.changePassword({ password: values.password, newPassword: values.newPassword })
			.then((res) => {
				if (res.data.status === "success") {
					console.log(res.data);
					navigate("/login");
				} else {
					setValues({
						...values,
						unknownError: "Unknown Error",
						unknownErrorMessage: "An unknown error occurred.",
					});
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
					// Error registering the user
					if (err.response.data.message === "User not found") {
						setValues({
							...values,
							unknownError: `${err.response.status} - ${err.code}`,
							unknownErrorMessage: "User Not Found",
						});
					} else if (err.response.data.message === "Password incorrect") {
						setValues({
							...values,
							passwordError: err.response.data.message,
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
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// When "Sign in instead" button is clicked, redirect to the login page
	const redirectToDashBoard = React.useCallback(() => navigate("/dashboard", { replace: true }), [navigate]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row", // center horizontally
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{values.unknownError.length > 0 && (
				<ErrorDialog
					title={values.unknownError}
					message={values.unknownErrorMessage}
					onClose={() => setValues({ ...values, unknownError: "", unknownErrorMessage: "" })}
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
						Reset Password
					</Typography>
					<FormLabel sx={{ display: "flex", justifyContent: "center", width: "75%" }}>
						<Typography
							className={"noselect"}
							sx={{ display: "flex", textAlign: "center", pt: 2, pb: 1 }}
							variant="body2"
							color="text.secondary"
						>
							Reset your password periodically to keep your account secure.
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
						<FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
							<InputLabel
								className={"noselect"}
								color={values.passwordError.length > 0 ? "error" : "primary"}
								htmlFor="password_input"
							>
								Current Password
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
								label="Current Password"
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
								htmlFor="newPassword_input"
							>
								New Password
							</InputLabel>
							<OutlinedInput
								required={true}
								id="newPassword_input"
								type={values.showPassword ? "text" : "password"}
								value={values.newPassword}
								onChange={handleChange("newPassword")}
								onKeyDown={handleKeyDown}
								error={values.newPasswordError.length > 0}
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
								label="New Password"
							/>
							<FormHelperText disabled={true} error={true}>
								{/*show confirm password error message on newPasswordError length > 0*/}
								{values.newPasswordError.length > 0 && values.newPasswordError}
							</FormHelperText>
						</FormControl>
						<Stack
							sx={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								mb: 7,
								mt: 3,
							}}
							direction="row"
							spacing={3}
						>
							<FormControl variant="outlined" component={Box}>
								<Button
									onClick={redirectToDashBoard}
									color="secondary"
									sx={{
										"&& .MuiTouchRipple-rippleVisible": {
											animationDuration: "250ms",
										},
									}}
								>
									Cancel
								</Button>
							</FormControl>
							<FormControl variant="outlined" component={Box} sx={{ m: 1, position: "relative" }}>
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
									Submit
								</Button>
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
							</FormControl>
						</Stack>
					</form>
				</FormControl>
			</Paper>
		</div>
	);
}

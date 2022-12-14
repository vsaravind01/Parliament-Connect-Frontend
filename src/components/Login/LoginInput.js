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
import CircularProgress from "@mui/material/CircularProgress";

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
	const [error, setError] = React.useState(true);
	const [loading, setLoading] = React.useState(false);
	const navigate = useNavigate();
	const { setAuthState } = React.useContext(AuthContext);
	const Auth = new AuthManager();

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
		setLoading(true);
		Auth.login({ uname: values.username, password: values.password, role: "admin" })
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
			})
			.finally(() => {
				setLoading(false);
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
							Sign in to acquire admin privileges
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
						<FormControl sx={{ width: "100%" }} variant="outlined">
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
							<FormHelperText disabled={true} error={true}>
								{values.usernameError.length > 0 && values.usernameError}
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
										Sign in
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

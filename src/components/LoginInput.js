import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function LoginInput() {
	const [values, setValues] = React.useState({
		username: "",
		password: "",
		showPassword: false,
		usernameError: "",
		passwordError: "",
		unknownError: "",
	});
	const [error, setError] = React.useState(true);
	const navigate = useNavigate();
	const redirectToRegister = React.useCallback(() => navigate("/register", { replace: true }), [navigate]);
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
		setValues({
			...values,
			usernameError: "",
			passwordError: "",
		});
		Auth.login({ uname: values.username, password: values.password })
			.then((res) => {
				if (res.data.status === "success") {
					navigate("/search");
				}
			})
			.catch((err) => {
				if (err.response.data.status === "error") {
					if (err.response.data.message === "Username not found") {
						setValues({
							...values,
							usernameError: "Username not found",
						});
					} else if (err.response.data.message === "Password incorrect") {
						setValues({
							...values,
							passwordError: "Password incorrect",
						});
					} else {
						setValues({ ...values, unknownError: `${err.response.status} - ${err.code}` });
					}
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
				<Dialog
					open={true}
					onClose={() => {
						setValues({ ...values, unknownError: "" });
					}}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{values.unknownError}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Oops! An unknown error has occurred. Please refresh the page and try again.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							sx={{
								"&& .MuiTouchRipple-rippleVisible": {
									animationDuration: "250ms",
								},
							}}
							onClick={() => {
								setValues({ ...values, unknownError: "" });
								window.location.reload();
							}}
							autoFocus
						>
							Refresh
						</Button>
					</DialogActions>
				</Dialog>
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
					<FormControl sx={{ m: 1, width: "75%" }} variant="outlined">
						<InputLabel
							className="noselect"
							color={values.usernameError.length > 0 ? "error" : "primary"}
							htmlFor="username_input"
						>
							Username
						</InputLabel>
						<OutlinedInput
							required={true}
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
					<FormControl sx={{ mt: 1, width: "75%" }} variant="outlined">
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
							width: "75%",
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
								onClick={redirectToRegister}
								sx={{
									"&& .MuiTouchRipple-rippleVisible": {
										animationDuration: "250ms",
									},
								}}
							>
								Register
							</Button>
						</FormControl>
						<FormControl variant="outlined" component={Box}>
							<Button
								type="submit"
								disabled={error}
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
				</FormControl>
			</Paper>
		</div>
	);
}

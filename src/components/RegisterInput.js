import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
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

export default function LoginInput() {
	const [values, setValues] = React.useState({
		username: "",
		password: "",
		confirmPassword: "",
		showPassword: false,
		usernameError: "",
		passwordError: "",
		confirmPasswordError: "",
	});
	const [error, setError] = React.useState(true);

	const Auth = new AuthManager();

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

	const navigate = useNavigate();
	const redirectToLogin = React.useCallback(() => navigate("/login", { replace: true }), [navigate]);

	const handleOnClick = async (event) => {
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
			Auth.signup({ uname: values.username, password: values.password })
				.then((res) => {
					if (res.data.status === "success") {
						console.log(res.data);
					}
				})
				.catch((err) => {
					if (err.response.data.status === "error") {
						if (err.response.data.message === "Username already exists") {
							setValues({
								...values,
								usernameError: "Username already exists",
							});
						}
					}
				});
		}
	};

	const testUrl = async (event) => {
		Auth.test({ body: "test" })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
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
					<FormLabel sx={{ display: "flex", textAlign: "center", width: "50%" }}>
						<Typography className={"noselect"} sx={{ pt: 2, pb: 5 }} variant="body2" color="text.secondary">
							Register to access the full features of the application
						</Typography>
					</FormLabel>
					<FormControl sx={{ m: 1, width: "75%" }} variant="outlined">
						<InputLabel
							className={"noselect"}
							color={values.usernameError.length > 0 ? "error" : "primary"}
							htmlFor="username_input"
						>
							Username
						</InputLabel>
						<OutlinedInput
							required={true}
							value={values.username}
							onChange={handleChange("username")}
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
					<FormControl sx={{ mt: 2, width: "75%" }} variant="outlined">
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
							{values.confirmPasswordError.length > 0 && values.confirmPasswordError}
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
								onClick={redirectToLogin}
								sx={{
									"&& .MuiTouchRipple-rippleVisible": {
										animationDuration: "250ms",
									},
								}}
							>
								Sign in instead
							</Button>
						</FormControl>
						<FormControl variant="outlined" component={Box}>
							<Button
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
								Create
							</Button>
							{/*<Button onClick={testUrl}>test</Button>*/}
						</FormControl>
					</Stack>
				</FormControl>
			</Paper>
		</div>
	);
}

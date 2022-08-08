import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import * as React from "react";

export default function SabhaFilter() {
	const [lok_sabha, setLokSabha] = React.useState(true);
	const [lok_sabha_version, setLokSabhaVersion] = React.useState("");
	const [rajya_sabha, setRajyaSabha] = React.useState(true);
	const [rajya_sabha_version, setRajyaSabhaVersion] = React.useState("");

	function isNumeric(value) {
		return /^\d+$/.test(value) || value === "";
	}

	React.useEffect(() => {
		setLokSabhaVersion(localStorage.getItem("lok_sabha_version") || "");
		setLokSabha(localStorage.getItem("lok_sabha_version") !== null);
		setRajyaSabhaVersion(localStorage.getItem("rajya_sabha_version") || "");
		setRajyaSabha(localStorage.getItem("rajya_sabha_version") !== null);
	}, []);

	return (
		<Card sx={{ mx: 2, mt: 2 }} variant="outlined">
			<CardContent>
				<FormControl component="fieldset" color="secondary">
					<FormLabel component="legend" color="primary">
						Sabha
					</FormLabel>
					<FormGroup>
						<Stack
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
							direction="row"
							spacing={1}
						>
							<FormControlLabel
								value="lok_sabha"
								control={
									<Checkbox
										checked={lok_sabha}
										onClick={() => setLokSabha(!lok_sabha)}
										color="secondary"
										sx={{
											"&& .MuiTouchRipple-rippleVisible": {
												animationDuration: "250ms",
											},
										}}
									/>
								}
								label="Lok Sabha"
								labelPlacement="end"
							/>
							<input
								value={lok_sabha_version}
								disabled={!lok_sabha}
								style={{ width: "25px", height: "25px" }}
								onChange={(e) => {
									if (isNumeric(e.target.value) && e.target.value.length < 3) {
										setLokSabhaVersion(e.target.value);
										localStorage.setItem("lok_sabha_version", e.target.value);
									}
								}}
							/>
						</Stack>
						<Stack
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
							direction="row"
							spacing={1}
						>
							<FormControlLabel
								value="rajya_sabha"
								control={
									<Checkbox
										checked={rajya_sabha}
										onClick={() => setRajyaSabha(!rajya_sabha)}
										color="secondary"
										sx={{
											"&& .MuiTouchRipple-rippleVisible": {
												animationDuration: "250ms",
											},
										}}
									/>
								}
								label="Rajya Sabha"
								labelPlacement="end"
							/>
							<input
								value={rajya_sabha_version}
								disabled={!rajya_sabha}
								style={{ width: "25px", height: "25px" }}
								onChange={(e) => {
									if (isNumeric(e.target.value) && e.target.value.length < 3) {
										setRajyaSabhaVersion(e.target.value);
										localStorage.setItem("rajya_sabha_version", e.target.value);
									}
								}}
							/>
						</Stack>
					</FormGroup>
				</FormControl>
			</CardContent>
		</Card>
	);
}

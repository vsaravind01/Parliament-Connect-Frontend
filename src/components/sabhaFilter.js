import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import * as React from "react";
import IndexingServices from "../services/Indexing/Indexing.Services";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function SabhaFilter({
	lok_sabha,
	setLokSabha,
	rajya_sabha,
	setRajyaSabha,
	rajya_sabha_version,
	setRajyaSabhaVersion,
	lok_sabha_version,
	setLokSabhaVersion,
}) {
	const Indexer = new IndexingServices();
	const [lokSabhaVersions, setLokSabhaVersions] = React.useState([]);
	const [rajyaSabhaVersions, setRajyaSabhaVersions] = React.useState([]);
	const [loaded, setLoaded] = React.useState(false);

	function isNumeric(value) {
		return /^\d+$/.test(value) || value === "";
	}

	React.useEffect(() => {
		setLokSabhaVersion(localStorage.getItem("lok_sabha_version") || "*");
		setLokSabha(localStorage.getItem("lok_sabha") === "true");
		setRajyaSabhaVersion(localStorage.getItem("rajya_sabha_version") || "*");
		setRajyaSabha(localStorage.getItem("rajya_sabha") === "true");

		(async () => {
			setLoaded(false);
			const indices = await Indexer.getIndices();
			const splits = indices.data.map((index) => {
				return index.split("_");
			});
			const lok_sabha_versions = splits.filter((tokens) => tokens[0] === "lok");
			const rajya_sabha_versions = splits.filter((tokens) => tokens[0] === "rajya");
			setLokSabhaVersions(lok_sabha_versions);
			setRajyaSabhaVersions(rajya_sabha_versions);
			setLoaded(true);
		})();
	}, []);

	return (
		<Card variant="outlined">
			<CardContent>
				<Typography component="legend" color="primary">
					Sabha
				</Typography>
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
									onClick={() => {
										localStorage.setItem("lok_sabha", (!lok_sabha).toString());
										setLokSabha(!lok_sabha);
									}}
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
						{!loaded && <CircularProgress size={20} />}
						{loaded && (
							<Select
								value={lok_sabha_version}
								disabled={!lok_sabha}
								size="small"
								margin="dense"
								autoWidth={true}
								onChange={(e) => {
									console.log(e.target.value);
									setLokSabhaVersion(e.target.value);
									localStorage.setItem("lok_sabha_version", e.target.value);
								}}
								inputProps={{
									style: {
										height: 10,
									},
								}}
							>
								<MenuItem value="*">All</MenuItem>
								{lokSabhaVersions.map((version) => {
									return (
										<MenuItem key={version[2]} value={version[2]}>
											{version[2]}
										</MenuItem>
									);
								})}
							</Select>
						)}
					</Stack>
				</FormGroup>
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
							value="rajya_sabha"
							control={
								<Checkbox
									checked={rajya_sabha}
									onClick={() => {
										localStorage.setItem("rajya_sabha", (!rajya_sabha).toString());
										setRajyaSabha(!rajya_sabha);
									}}
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
						{!loaded && <CircularProgress size={20} />}
						{loaded && (
							<Select
								value={rajya_sabha_version}
								disabled={!rajya_sabha}
								autoWidth={true}
								size="small"
								onChange={(e) => {
									setRajyaSabhaVersion(e.target.value);
									localStorage.setItem("rajya_sabha_version", e.target.value);
								}}
								inputProps={{
									style: {
										height: 10,
									},
								}}
							>
								<MenuItem value="*">All</MenuItem>
								{rajyaSabhaVersions.map((version) => {
									return (
										<MenuItem key={version[2]} value={version[2]}>
											{version[2]}
										</MenuItem>
									);
								})}
							</Select>
						)}
					</Stack>
				</FormGroup>
			</CardContent>
		</Card>
	);
}

import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import AdminServices from "../services/Admin/Admin.Services";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const Admin = new AdminServices();

export default function PollMaker() {
	const today = new Date();
	const [question, setQuestion] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [expiryDateTime, setExpiryDateTime] = React.useState(new Date().setDate(today.getDate() + 5));
	const [options, setOptions] = React.useState([{ option: "" }, { option: "" }]);
	const [extraOptionsCount, setExtraOptionsCount] = React.useState(0);
	const [loading, setLoading] = React.useState(false);

	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });

	const handleOptionChange = (event) => {
		let newOptions = [...options];
		newOptions[parseInt(event.target.id)].option = event.target.value;
		setOptions(newOptions);
	};

	const addOption = () => {
		setExtraOptionsCount(extraOptionsCount + 1);
		setOptions([...options, { option: "" }]);
	};

	const removeOption = (option) => {
		setOptions(options.filter((item) => item !== option));
	};

	const handleDateTimeChange = (newValue) => {
		setExpiryDateTime(newValue);
	};

	const handleCreatePoll = () => {
		const dateTime = new Date(expiryDateTime);
		const date = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate();
		const time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
		const optionsArray = options.map((item) => item.option);
		console.log(question, description, date, time, optionsArray);
		if (question.length > 0 && description.length > 0 && options.length > 0) {
			setLoading(true);
			Admin.createPoll({ question, description, optionsArray, expiryDate: date, expiryTime: time })
				.then((res) => {
					console.log(res);
					setSetAlert({ open: true, message: "Poll created successfully", severity: "success" });
				})
				.catch((err) => {
					setSetAlert({ open: true, message: err.response.data.message, severity: "error" });
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			const emptyFields = [];
			if (question.length === 0) {
				emptyFields.push("Question");
			}
			if (description.length === 0) {
				emptyFields.push("Description");
			}
			if (options.length === 0) {
				emptyFields.push("Options");
			}
			setSetAlert({ open: true, message: `Please fill ${emptyFields.join(",")}`, severity: "error" });
		}
	};

	return (
		<Container maxWidth="md">
			<Card sx={{ py: 5, px: 3 }} variant="outlined">
				<Container
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
						justifyContent: "center",
					}}
				>
					<Typography className="noselect" variant="h4" component="h1" gutterBottom>
						Create Poll
					</Typography>
					<Typography className="noselect" variant="body2" color="text.secondary" gutterBottom>
						Poll maker made easy.
					</Typography>
					<TextField
						multiline={true}
						fullWidth
						value={question}
						label="Poll Question"
						variant="outlined"
						margin="normal"
						onChange={(event) => setQuestion(event.target.value)}
						inputProps={{ maxLength: 250 }}
						helperText={question.length + "/250"}
					/>
					<TextField
						multiline={true}
						fullWidth
						value={description}
						label="Poll Description"
						variant="outlined"
						margin="normal"
						onChange={(event) => setDescription(event.target.value)}
						inputProps={{ maxLength: 250 }}
						helperText={description.length + "/250"}
					/>
					{options.map((option, index) => (
						<Stack key={index} direction="row" spacing={2} sx={{ display: "flex", alignItems: "center" }}>
							<TextField
								fullWidth
								multiline={true}
								value={option.option}
								id={index.toString()}
								label={`Option ${index + 1}`}
								variant="outlined"
								margin="normal"
								onChange={(event) => handleOptionChange(event)}
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									maxLength: 150,
								}}
								helperText={option.option.length + "/150"}
							/>
							{index > 1 && (
								<IconButton sx={{ height: "100%" }} onClick={() => removeOption(option)}>
									<CloseRoundedIcon />
								</IconButton>
							)}
						</Stack>
					))}
					<Button
						fullWidth={true}
						sx={{ my: 3 }}
						variant="outlined"
						color="primary"
						onClick={() => addOption()}
					>
						Add Option
					</Button>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MobileDateTimePicker
							required
							label="Expiration Date"
							value={expiryDateTime}
							ampm={false}
							onChange={handleDateTimeChange}
							minDateTime={new Date().setTime(new Date().getTime() + 1)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
					<Stack sx={{ mt: 4, alignItems: "center" }} direction="row" spacing={2}>
						{loading && <CircularProgress size={24} />}
						{alert.open && (
							<Alert
								sx={{ width: "100%" }}
								severity={alert.severity}
								onClose={() => setSetAlert({ ...alert, open: false })}
							>
								{alert.message}
							</Alert>
						)}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							type="submit"
							onClick={handleCreatePoll}
						>
							Create Poll
						</Button>
					</Stack>
				</Container>
			</Card>
		</Container>
	);
}

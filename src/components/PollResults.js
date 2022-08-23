import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdminServices from "../services/Admin/Admin.Services";
import TextField from "@mui/material/TextField";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { DateFormatter } from "../utils/Formatter";
import Slide from "@mui/material/Slide";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

const Admin = new AdminServices();

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EditDialog = ({ close, poll_data }) => {
	const optionsArray = poll_data.options.map((item) => {
		return { option: item.option };
	});

	console.log(DateFormatter(poll_data.expiryDate, poll_data.expiryTime));

	console.log(optionsArray);

	const [question, setQuestion] = React.useState(poll_data.question);
	const [description, setDescription] = React.useState(poll_data.description);
	const [expiryDateTime, setExpiryDateTime] = React.useState(new Date(poll_data.expiryDate));
	const [options, setOptions] = React.useState(optionsArray);
	const [loading, setLoading] = React.useState(false);
	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });

	const addOption = () => {
		setOptions([...options, { option: "" }]);
	};

	const removeOption = (option) => {
		setOptions(options.filter((item) => item !== option));
	};

	const handleOptionChange = (event) => {
		let newOptions = [...options];
		newOptions[parseInt(event.target.id)].option = event.target.value;
		setOptions(newOptions);
	};

	const handleDateTimeChange = (newValue) => {
		setExpiryDateTime(newValue);
		console.log(newValue);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const dateTime = new Date(expiryDateTime);
		const date = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate();
		const time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
		const optionsArray = options.map((item) => item.option);
		const poll = {
			id: poll_data.id,
			question: question,
			description: description,
			expiryDate: date,
			expiryTime: time,
			optionsArray: optionsArray,
		};
		console.log(poll);
		Admin.updatePoll(poll)
			.then((response) => {
				setSetAlert({ open: true, message: "Poll updated successfully", severity: "success" });
			})
			.catch((error) => {
				console.log(error);
				setSetAlert({ open: true, message: "Error updating poll", severity: "error" });
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Dialog fullScreen={true} open={true} TransitionComponent={Transition}>
			<AppBar sx={{ position: "relative" }} color={alert.open ? alert.severity : "primary"}>
				<Toolbar>
					<Tooltip title="Close">
						<IconButton edge="start" color="inherit" onClick={close} aria-label="close">
							<CloseIcon />
						</IconButton>
					</Tooltip>
					<Typography sx={{ ml: 2, width: "100%" }} variant="h6" component="div">
						Poll Editor
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
						<Button autoFocus color="inherit" onClick={handleSubmit}>
							save
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<Container>
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
									Edit Poll
								</Typography>
								<Typography className="noselect" variant="body2" color="text.secondary" gutterBottom>
									Editing the poll will reset the its results.
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
									<Stack
										key={index}
										direction="row"
										spacing={2}
										sx={{ display: "flex", alignItems: "center" }}
									>
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
											<Tooltip title={`Remove Option ${index + 1}`}>
												<IconButton
													sx={{ height: "100%" }}
													onClick={() => removeOption(option)}
												>
													<CloseRoundedIcon />
												</IconButton>
											</Tooltip>
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
								</Stack>
							</Container>
						</Card>
					</Container>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit} color="primary">
					Save
				</Button>
				<Button onClick={close} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[300],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#1683ee" : "#e461fc",
	},
}));

export default function PollResults() {
	const [pollResults, setPollResults] = React.useState([]);

	const [editPoll, setEditPoll] = React.useState(false);
	const [modifyPollData, setModifyPollData] = React.useState({});

	const [loading, setLoading] = React.useState(false);
	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });

	const [deleteOpen, setDeleteOpen] = React.useState(false);

	const handleDialogClose = () => {
		setEditPoll(false);
		window.location.reload();
	};

	const handleDeletePoll = async (pollId) => {
		setLoading(true);
		console.log(pollId);
		Admin.deletePoll({ id: pollId })
			.then(() => {
				setLoading(false);
				window.location.reload();
			})
			.catch((error) => {
				setSetAlert({ open: true, severity: "error", message: error.message });
			})
			.finally(() => {
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			const pollResults = await Admin.getAllUserPolls();
			setPollResults(pollResults.data.polls);
			setLoading(false);
		})();
	}, []);

	return (
		<Box>
			{editPoll && <EditDialog poll_data={modifyPollData} close={handleDialogClose} />}
			{deleteOpen && (
				<Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
					<DialogTitle>Delete Poll</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this poll? This action cannot be undone.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleDeletePoll(modifyPollData.id)} color="primary">
							Delete
						</Button>
						<Button variant="contained" onClick={() => setDeleteOpen(false)} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			)}
			<Paper sx={{ mt: 5, borderRadius: 3, p: 4 }} elevation={6}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						mt: 2,
					}}
				>
					<Paper
						elevation={0}
						sx={{
							mt: 1,
							display: "flex",
							justifyContent: "center",
							width: "95%",
							backgroundColor: "#fff0f8",
							borderRadius: 3,
							height: 50,
							alignItems: "center",
						}}
					>
						<Typography variant="h4">Poll Results</Typography>
					</Paper>
					{alert.open && (
						<Alert
							sx={{ width: "95%" }}
							severity={alert.severity}
							onClose={() => setSetAlert({ ...alert, open: false })}
						>
							{alert.message}
						</Alert>
					)}
				</Box>
				<CardContent>
					<Box>
						{loading && <CircularProgress />}
						{pollResults.length === 0 && !loading && (
							<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
								<Typography className="noselect" variant="overline" component="h2">
									No Polls Found
								</Typography>
							</Box>
						)}
						{pollResults.map((poll, index) => (
							<Box key={index}>
								<Card variant="outlined" sx={{ mb: 3 }}>
									<CardHeader
										title={poll.question}
										action={
											<React.Fragment>
												<Tooltip title="Edit">
													<IconButton
														onClick={() => {
															setEditPoll(true);
															setModifyPollData(poll);
															console.log(poll.id);
														}}
													>
														<EditTwoToneIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Delete">
													<IconButton
														onClick={() => {
															setModifyPollData(poll);
															setDeleteOpen(true);
														}}
													>
														<DeleteSweepTwoToneIcon />
													</IconButton>
												</Tooltip>
											</React.Fragment>
										}
									/>
									<CardContent>
										{poll.options.map((option, index) => (
											<Card variant="outlined" key={index} sx={{ px: 3, py: 1, mb: 2 }}>
												<Typography variant="subtitle2">{option.option}</Typography>
												<Box sx={{ display: "flex", alignItems: "center" }}>
													<Box sx={{ width: "100%", mr: 1 }}>
														<BorderLinearProgress
															variant="determinate"
															value={option.votes}
														/>
													</Box>
													<Box sx={{ minWidth: 35 }}>
														<Typography
															variant="body2"
															color="text.secondary"
														>{`${Math.round(option.votes)}%`}</Typography>
													</Box>
												</Box>
											</Card>
										))}
									</CardContent>
								</Card>
							</Box>
						))}
					</Box>
				</CardContent>
			</Paper>
		</Box>
	);
}

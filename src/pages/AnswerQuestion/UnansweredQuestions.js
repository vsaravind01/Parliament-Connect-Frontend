import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import AdminServices from "../../services/Admin/Admin.Services";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import AnswerPortal from "../../components/AnswerPortal";

const Admin = new AdminServices();

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EditPostDialog = ({ close, question }) => {
	const [answer, setAnswer] = React.useState("");
	const [styled_answer, setStyledAnswer] = React.useState("");

	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (answer.length > 0) {
			setLoading(true);
			Admin.uploadAnswer({ id: question._id, index: question._index, answer, styled_answer })
				.then((res) => {
					setSetAlert({ open: true, message: "Answered uploaded successfully", severity: "success" });
				})
				.catch((err) => {
					setSetAlert({ open: true, message: err.message, severity: "error" });
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setSetAlert({ open: true, message: "Title and Content are required fields", severity: "error" });
		}
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
						Answer Editor
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
						<Card variant="outlined">
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
									textAlign: "center",
									mt: 3,
								}}
							>
								<Typography className="noselect" variant="h4" component="h1" gutterBottom>
									Question
								</Typography>

								<Typography className="noselect" variant="body2" color="text.primary" gutterBottom>
									{question._source.question}
								</Typography>
								{alert.open && (
									<Box sx={{ width: "100%" }}>
										<Alert
											sx={{ width: "50%", margin: "auto" }}
											severity={alert.severity}
											onClose={() => setSetAlert({ ...alert, open: false })}
										>
											{alert.message}
										</Alert>
									</Box>
								)}
							</Box>
							<CardContent>
								<Container sx={{ width: "80%", display: "flex", flexDirection: "column", gap: 2 }}>
									<AnswerPortal setAnswer={setAnswer} setStyledAnswer={setStyledAnswer} />
								</Container>
							</CardContent>
						</Card>
					</Container>
				</Container>
			</DialogContent>
			<DialogActions>
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
						disabled={loading}
						type="submit"
						color="secondary"
						disableElevation={true}
						variant="contained"
						onClick={handleSubmit}
						sx={{
							"&& .MuiTouchRipple-rippleVisible": {
								animationDuration: "250ms",
							},
						}}
					>
						Create
					</Button>
				</Box>
				<Button onClick={close} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function UnansweredQuestionsPanel() {
	const [expanded, setExpanded] = React.useState([]);
	const [questions, setQuestions] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const [editDialogOpen, setEditDialogOpen] = React.useState(false);
	const [answerQuestionData, setAnswerQuestionData] = React.useState({});

	const SearchEngineDatePattern = /(\d{2})\.(\d{2})\.(\d{4})/;

	const handleExpandClick = (index) => {
		console.log(index);
		console.log(expanded);
		const newExpanded = [...expanded];
		newExpanded[index] = !expanded[index];
		setExpanded(newExpanded);
	};

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			const currentSabha = await Admin.get_current_sabha_version();
			const lokSabhaVersion = currentSabha.data.result[0].lok_sabha;
			const rajyaSabhaVersion = currentSabha.data.result[0].lok_sabha;
			const index = "lok_sabha_" + lokSabhaVersion + ",rajya_sabha_" + rajyaSabhaVersion;

			const unansweredQuestions = await Admin.getUserUnansweredQuestions({ index });
			setQuestions(unansweredQuestions.data.questions.hits.hits);
			setLoading(false);
		})();
	}, []);

	return (
		<React.Fragment>
			<Tooltip title="Go to dashboard" placement="right">
				<IconButton component={Link} to="/dashboard">
					<ArrowBackRoundedIcon />
				</IconButton>
			</Tooltip>
			{editDialogOpen && (
				<EditPostDialog
					close={() => {
						setEditDialogOpen(false);
						window.location.reload();
					}}
					question={answerQuestionData}
				/>
			)}

			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 5,
				}}
			>
				{loading ? (
					<CircularProgress />
				) : questions.length === 0 ? (
					<Typography variant="h5">No posts found</Typography>
				) : (
					questions.map((question, index) => {
						const avatar_color = question._index[0] === "l" ? green[500] : red[500];
						const date = new Date(
							question._source.asked_on.replace(SearchEngineDatePattern, "$3-$2-$1")
						).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						});
						return (
							<Paper elevation={24} key={index} sx={{ width: { md: 600, borderRadius: 15 } }}>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: avatar_color }} aria-label="recipe">
											{question._source.mp[0]}
										</Avatar>
									}
									action={
										question._source["starred/unstarred"] === "STARRED" && (
											<Typography variant="h6" color="primary">
												<LocalActivityRoundedIcon color="error" />
											</Typography>
										)
									}
									title={question._source.mp}
									subheader={date}
								/>

								<CardContent>
									<Typography variant="h5" color="text.primary">
										{question._source.subject.charAt(0).toUpperCase() +
											question._source.subject.slice(1)}
									</Typography>
									<Paper
										variant="outlined"
										sx={{
											mt: 1,
											backgroundColor: "#ebebeb",
											textAlign: "center",
											width: "fit-content",
											borderRadius: 5,
										}}
									>
										<Typography sx={{ px: 1 }} variant="subtitle2" color="text.secondary">
											Question
										</Typography>
									</Paper>
									<Typography sx={{ pt: 1, pl: 1.5 }} variant="body2" color="text.primary">
										{question._source.question.charAt(0).toUpperCase() +
											question._source.question.slice(1)}
									</Typography>
								</CardContent>
								<CardActions sx={{ display: "flex", justifyContent: "flex-end", mx: 1 }} disableSpacing>
									<Tooltip title="Answer" placement="right">
										<IconButton
											aria-label={`edit post ${index}`}
											onClick={() => {
												setAnswerQuestionData(question);
												setEditDialogOpen(true);
											}}
										>
											<EditRoundedIcon />
										</IconButton>
									</Tooltip>
								</CardActions>
							</Paper>
						);
					})
				)}
			</Container>
		</React.Fragment>
	);
}

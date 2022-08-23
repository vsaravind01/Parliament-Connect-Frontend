import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import CardContent from "@mui/material/CardContent";
import AdminServices from "../../services/Admin/Admin.Services";
import MainLayout from "../MainLayout";
import Box from "@mui/material/Box";

const Admin = new AdminServices();

export default function UnansweredQuestionsPanel() {
	const [expanded, setExpanded] = React.useState([]);
	const [questions, setQuestions] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

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
		<MainLayout mediumScreenSize={12}>
			<Tooltip title="Go to dashboard" placement="right">
				<IconButton component={Link} to="/dashboard">
					<ArrowBackRoundedIcon />
				</IconButton>
			</Tooltip>
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
									<Paper
										sx={{ display: "flex", verticalAlign: "center", py: 0.5, borderRadius: 5 }}
										variant="outlined"
									>
										<Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
											<Paper
												variant="outlined"
												sx={{
													backgroundColor: "#ebebeb",
													textAlign: "center",
													width: "fit-content",
													borderRadius: 5,
												}}
											>
												<Typography sx={{ px: 1 }} variant="subtitle2" color="text.secondary">
													Ministry
												</Typography>
											</Paper>
											<Typography
												sx={{ pl: 1, textAlign: "center" }}
												variant="body2"
												color="text.primary"
											>
												{question._source.ministry}
											</Typography>
										</Box>
									</Paper>
									<Typography variant="subtitle2" sx={{ fontSize: "1.5rem" }} color="primary">
										{question._source.subject.charAt(0).toUpperCase() +
											question._source.subject.slice(1)}
									</Typography>
									<Paper
										sx={{ display: "flex", verticalAlign: "center", py: 1, borderRadius: 5 }}
										variant="outlined"
									>
										<Box
											sx={{
												display: "flex",
												flexDirection: "column",
												ml: 1,
											}}
										>
											<Paper
												variant="outlined"
												sx={{
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
										</Box>
									</Paper>
								</CardContent>
							</Paper>
						);
					})
				)}
			</Container>
		</MainLayout>
	);
}

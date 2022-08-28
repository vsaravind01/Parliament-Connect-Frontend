import * as React from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { green, red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

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

const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

export default function Results(props) {
	const [expanded, setExpanded] = React.useState(false);
	let score = props.score;
	score = score * 100;
	score = Math.round(score);
	const { subject, question, answer, qid, mp, ministry, answered_on, type, sabha } = props;
	const date = answered_on
		? new Date(answered_on.replace(pattern, "$3-$2-$1")).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
		  })
		: "Not yet answered";
	const avatar_color = sabha[0] === "l" ? green[500] : red[500];
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Paper
			sx={{ marginLeft: "auto", marginRight: "auto", mb: 3, width: "100%", borderRadius: 5 }}
			variant="elevation"
			elevation={24}
		>
			<Grid item md={12}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: avatar_color }} aria-label="recipe">
							{mp[0]}
						</Avatar>
					}
					style={{ display: "flex" }}
					action={
						<Stack direction="row" sx={{ alignItems: "center" }}>
							<Paper
								variant="outlined"
								sx={{
									backgroundColor: "#ebebeb",
									textAlign: "center",
									width: "fit-content",
									borderRadius: 5,
									height: "fit-content",
								}}
							>
								<Typography
									sx={{ px: 1 }}
									style={{ textTransform: "capitalize" }}
									variant="subtitle2"
									color="text.secondary"
								>
									{score}%
								</Typography>
							</Paper>
							{type === "STARRED" && (
								<Box>
									<Tooltip title="Starred Question">
										<Typography sx={{ pr: 2, pt: 1, pl: 1 }} variant="h6" color="primary">
											<LocalActivityRoundedIcon color="error" />
										</Typography>
									</Tooltip>
								</Box>
							)}
						</Stack>
					}
					title={mp}
					subheader={date}
				/>
				<CardContent sx={{ width: "100%" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: { md: "row", xs: "column" },
							justifyContent: "space-between",
						}}
					>
						<Stack direction="row" spacing={1}>
							<Typography variant="h6" color="secondary">
								{subject}
							</Typography>
						</Stack>
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
								<Typography
									sx={{ px: 1 }}
									style={{ textTransform: "capitalize" }}
									variant="subtitle2"
									color="text.secondary"
								>
									{sabha}
								</Typography>
							</Paper>
						</Box>
					</Box>
					<Paper
						sx={{ mt: 1, display: "flex", verticalAlign: "center", py: 0.5, borderRadius: 5 }}
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
							<Typography sx={{ pl: 1, textAlign: "center" }} variant="body2" color="text.primary">
								{ministry}
							</Typography>
						</Box>
					</Paper>
				</CardContent>
			</Grid>
			<CardActions disableSpacing>
				<IconButton
					target="_blank"
					href={`http://0.0.0.0:8080/generate_pdf/${props.index}/${props.doc}`}
					rel="noopener noreferrer"
					aria-label="share"
					sx={{
						"&& .MuiTouchRipple-rippleVisible": {
							animationDuration: "200ms",
						},
					}}
				>
					<Tooltip title="Share" placement="bottom-end">
						<ShareIcon />
					</Tooltip>
				</IconButton>

				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
					sx={{
						"&& .MuiTouchRipple-rippleVisible": {
							animationDuration: "200ms",
						},
					}}
				>
					<Tooltip title="View Answer">
						<ExpandMoreIcon />
					</Tooltip>
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Divider />
					<Typography color="secondary" variant="h6" paragraph sx={{ mt: 2 }}>
						Question:
					</Typography>
					<Typography display="inline-block" paragraph>
						{question}
					</Typography>
					{date !== "Not yet answered" && (
						<Typography color="secondary" variant="h6" paragraph sx={{ mt: 2 }}>
							Answer:
						</Typography>
					)}
					<Typography paragraph>{answer}</Typography>
				</CardContent>
			</Collapse>
		</Paper>
	);
}

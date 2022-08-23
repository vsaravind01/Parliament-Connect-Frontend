import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
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
	const { subject, question, answer, qid, mp, ministry, answered_on, type, sabha } = props;
	const date = answered_on
		? new Date(answered_on.replace(pattern, "$3-$2-$1")).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
		  })
		: "Not yet answered";
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ marginLeft: "auto", marginRight: "auto", mb: 6, width: "100%" }} variant="outlined">
			<Grid item md={12}>
				<CardHeader title={qid} subheader={date} />
				<CardContent sx={{ width: "100%" }}>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Stack direction="row" spacing={1}>
							<Typography variant="h6" color="secondary">
								{subject}
							</Typography>
							{type === "STARRED" && (
								<Typography variant="h6" color="primary">
									<LocalActivityRoundedIcon sx={{ mt: "18%" }} color="error" />
								</Typography>
							)}
						</Stack>
						<Box>
							<Typography style={{ textTransform: "capitalize" }} variant="body1" color="textSecondary">
								{sabha}
							</Typography>
						</Box>
					</Box>
					<Stack sx={{ mt: 2 }} direction={{ md: "row", sm: "column" }} spacing={2}>
						<Button
							variant="outlined"
							sx={{
								display: "flex",
								justifyContent: "flex-start",
								width: "100%",
								height: "100%",
								"&& .MuiTouchRipple-rippleVisible": {
									animationDuration: "250ms",
								},
							}}
						>
							<Typography variant="button" color="text.primary">
								MP
							</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ ml: "5px " }}>
								{mp}
							</Typography>
						</Button>

						<Button
							variant="outlined"
							sx={{
								display: "flex",
								mt: 1,
								justifyContent: "flex-start",
								width: "100%",
								height: "100%",
								"&& .MuiTouchRipple-rippleVisible": {
									animationDuration: "250ms",
								},
							}}
						>
							<Typography variant="button" color="text.primary">
								Ministry
							</Typography>
							<Typography variant="body1" color="text.secondary" sx={{ ml: "5px " }}>
								{ministry}
							</Typography>
						</Button>
					</Stack>
				</CardContent>
			</Grid>
			<CardActions disableSpacing>
				<IconButton
					aria-label="share"
					sx={{
						"&& .MuiTouchRipple-rippleVisible": {
							animationDuration: "200ms",
						},
					}}
				>
					<ShareIcon />
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
					<ExpandMoreIcon />
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
		</Card>
	);
}

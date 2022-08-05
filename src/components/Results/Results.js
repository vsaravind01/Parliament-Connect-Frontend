import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import { orange } from "@mui/material/colors";

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

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	display: "flex",
	gap: 5,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

export default function Results(props) {
	const [expanded, setExpanded] = React.useState(false);
	const {subject, question, answer, qid, mp, ministry, answered_on, type} = props;
	const date = new Date(answered_on.replace(pattern,"$3-$2-$1")).toLocaleDateString("en-US", {'month': 'short', 'day': 'numeric', 'year':'numeric'})
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Paper sx={{my: 4, width:"auto"}} variant="outlined">
			<Stack spacing={2}>
				<Stack direction="row" spacing={4}>
					<CardHeader
						title={qid}
						subheader={date}
					/>
					<CardContent>
						<Stack direction="row" spacing={1}>
							<Typography variant="h6" color="primary">
								{subject}
							</Typography>
							{type === 'STARRED' && (
								<Typography variant="h6" color="secondary">
									<LocalActivityRoundedIcon sx={{mt:"18%"}} color="special"/>
								</Typography>
							)}
						</Stack>
						<Box sx={{mt:2, height:"100%"}}>
							<Grid container spacing={1}>
								<Grid item md={6} xs={12}>
									<Button variant="outlined" sx={{width: "100%", height: "100%"}}>
										<Typography variant="button" color="text.primary">MP</Typography>
										<Typography variant="body2" color="text.secondary" sx={{ml:"5px"}}>
											{mp}
										</Typography>
									</Button>
								</Grid>
								<Grid item md={6} xs={12}>
									<Button variant="outlined" sx={{width: "100%", height: "100%"}}>
										<Typography variant="button" color="text.primary">Ministry</Typography>
										<Typography variant="body1" color="text.secondary" sx={{ml:"5px "}}>
											{ministry}
										</Typography>
									</Button>
								</Grid>
							</Grid>
						</Box>
					</CardContent>
				</Stack>
				<Stack direction="row" spacing={4}>
				</Stack>
			</Stack>
			<CardActions disableSpacing>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Divider/>
					<Typography color="primary" variant="h6" paragraph sx={{mt:2}}>Question:</Typography>
					<Typography paragraph>
						{question}
					</Typography>
					<Typography color="primary" variant="h6" paragraph sx={{mt:2}}>Answer:</Typography>
					<Typography paragraph>
						{answer}
					</Typography>
				</CardContent>
			</Collapse>
		</Paper>
	);
}

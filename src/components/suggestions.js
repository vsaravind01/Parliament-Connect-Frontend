import React from "react";
import Stack from "@mui/material/Stack";
import Results from "./Results/Results";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Routes from "../services/Routes/routes.config";
import Card from "@mui/material/Card";
import { formatSabha } from "../utils/Formatter";

export default function Suggestions({
	query,
	title,
	backAction,
	skipAction,
	currentLokSabhaVersion,
	currentRajyaSabhaVersion,
}) {
	const [results, setResults] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		async function getQuestions(query) {
			setLoading(true);
			let data = "";
			if (query !== "" && typeof query === "string") {
				const response = await fetch(`${Routes.searchEngine}/search`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify({
						question: query,
						index: `lok_sabha_${currentLokSabhaVersion},rajya_sabha_${currentRajyaSabhaVersion}`,
						size: 10,
						min_score: 0.3,
					}),
				});
				data = await response.json();
				setLoading(false);
				return data;
			}
		}
		getQuestions(query).then((data) => {
			console.log(data);
			setResults(data.hits.hits);
		});
		console.log(results);
	}, []);

	return (
		<React.Fragment>
			<Box sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "center" }}>{title}</Box>
			<Box sx={{ display: "flex", justifyContent: "space-between", mx: 4 }}>
				<Button
					variant="outlined"
					onClick={backAction}
					color="inherit"
					sx={{ mb: 2 }}
					startIcon={<UndoRoundedIcon />}
				>
					Back
				</Button>
				<Button
					variant="outlined"
					color="inherit"
					onClick={skipAction}
					sx={{ mb: 2 }}
					endIcon={<RedoRoundedIcon />}
				>
					Skip
				</Button>
			</Box>

			<Stack
				sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}
				direction="column"
			>
				{loading ? (
					<Card
						variant="outlined"
						sx={{
							height: 100,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<CircularProgress color="secondary" />
					</Card>
				) : (
					results &&
					results.map((hit, index) => {
						if (hit._score > 0.4) {
							return (
								<Results
									key={index}
									subject={hit._source.subject}
									question={hit._source.question}
									sabha={formatSabha(hit._index)}
									answer={hit._source.answer}
									mp={hit._source.mp}
									ministry={hit._source.ministry}
									qid={hit._source.qno}
									answered_on={hit._source.answered_on}
									type={hit._source["starred/unstarred"]}
								/>
							);
						} else {
							return <></>;
						}
					})
				)}
			</Stack>
		</React.Fragment>
	);
}

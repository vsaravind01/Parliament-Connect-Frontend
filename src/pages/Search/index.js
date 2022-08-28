import React from "react";
import SearchBar from "../../components/searchBar";
import Stack from "@mui/material/Stack";
import SabhaFilter from "../../components/sabhaFilter";
import Results from "../../components/Results/Results";
import MainLayout from "../MainLayout";
import Container from "@mui/material/Container";
import Routes from "../../services/Routes/routes.config";
import MpSearchBar from "../../components/MpSearchBar";
import MinistrySearchBar from "../../components/MinistrySearchBar";
import DateRange from "../../components/DateRange";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { formatSabha } from "../../utils/Formatter";
import Paper from "@mui/material/Paper";

export default function Search() {
	const [lok_sabha, setLokSabha] = React.useState(true);
	const [lok_sabha_version, setLokSabhaVersion] = React.useState("*");
	const [rajya_sabha, setRajyaSabha] = React.useState(true);
	const [rajya_sabha_version, setRajyaSabhaVersion] = React.useState("*");

	const [loading, setLoading] = React.useState(false);

	const [questions, setQuestions] = React.useState([]);

	const [isDateRange, setIsDateRange] = React.useState(false);

	const [startDate, setStartDate] = React.useState("");
	const [endDate, setEndDate] = React.useState("");

	const [mp, setMp] = React.useState("");
	const [Mps, setMps] = React.useState([]);
	const [ministry, setMinistry] = React.useState("");

	const resetFilters = () => {
		setLokSabha(true);
		setLokSabhaVersion("*");
		setRajyaSabha(true);
		setRajyaSabhaVersion("*");
		setMp("");
		setMinistry("");
		setStartDate("");
		setEndDate("");
		setIsDateRange(false);
	};

	const getQuestions = async (value) => {
		let data = "";
		let indices = "";

		if (lok_sabha) {
			indices += "lok_sabha_" + lok_sabha_version;
		}
		if (rajya_sabha) {
			if (lok_sabha) {
				indices += ",";
			}
			indices += "rajya_sabha_" + rajya_sabha_version + "*";
		}

		if (indices === "") {
			indices = "lok_sabha_*,rajya_sabha_*";
		}

		const body = {
			question: value,
			size: 50,
			min_score: 0.5,
			index: indices,
			...(startDate !== "" && isDateRange && { from_date: startDate }),
			...(endDate !== "" && isDateRange && { to_date: endDate }),
			...(mp !== "" && { mp }),
			...(ministry !== "" && { ministry }),
		};
		if (typeof value === "string") {
			setLoading(true);
			const response = await fetch(`${Routes.searchEngine}/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(body),
			});
			data = await response.json();
			console.log(data);
			setQuestions(data.hits.hits);
			setLoading(false);
		}
	};

	const navFilters = (
		<Stack direction="column" sx={{ mx: 2, mt: 2 }} spacing={2}>
			<SabhaFilter
				lok_sabha={lok_sabha}
				setLokSabha={setLokSabha}
				lok_sabha_version={lok_sabha_version}
				setLokSabhaVersion={setLokSabhaVersion}
				rajya_sabha={rajya_sabha}
				setRajyaSabha={setRajyaSabha}
				rajya_sabha_version={rajya_sabha_version}
				setRajyaSabhaVersion={setRajyaSabhaVersion}
			/>
			<Paper variant="outlined">
				<Stack direction="column" sx={{ mx: 2, mt: 2, mb: 2 }} spacing={2}>
					<MpSearchBar setMp={setMp} />
					<MinistrySearchBar setMinistry={setMinistry} />
					<DateRange
						isDateRange={isDateRange}
						setIsDateRange={setIsDateRange}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
					/>
				</Stack>
			</Paper>
			<Paper sx={{ p: 1 }} variant="outlined">
				<Stack direction="row" spacing={2}>
					<Button fullWidth onClick={() => resetFilters()}>
						Reset
					</Button>
					<Button fullWidth onClick={() => getQuestions(valueRef.current.value)} variant="contained">
						Apply
					</Button>
				</Stack>
			</Paper>
		</Stack>
	);

	const valueRef = React.useRef("");

	return (
		<MainLayout mediumScreenSize={12} navFilters={navFilters}>
			<Container sx={{ width: "100%" }}>
				<SearchBar valueRef={valueRef} searchFunc={getQuestions} />
			</Container>
			<Stack
				sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", mt: 5 }}
				direction="column"
			>
				<Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
					{loading && <CircularProgress sx={{ mb: 2 }} />}
					{questions.map((hit, index) => {
						if (hit._score > 0.4) {
							return (
								<Results
									key={index}
									sabha={formatSabha(hit._index)}
									index={hit._index}
									score={hit._score}
									doc={hit._id}
									subject={hit._source.subject}
									question={hit._source.question}
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
					})}
				</Container>
			</Stack>
		</MainLayout>
	);
}

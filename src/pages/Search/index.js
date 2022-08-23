import React from "react";
import SearchBar from "../../components/searchBar";
import Stack from "@mui/material/Stack";
import SabhaFilter from "../../components/sabhaFilter";
import Results from "../../components/Results/Results";
import MainLayout from "../MainLayout";
import AuthContext from "../../context/auth/authContext";
import Container from "@mui/material/Container";
import Routes from "../../services/Routes/routes.config";
import MpSearchBar from "../../components/MpSearchBar";
import MinistrySearchBar from "../../components/MinistrySearchBar";
import DateRange from "../../components/DateRange";
import { formatSabha } from "../../utils/Formatter";

export default function Search() {
	const [lok_sabha, setLokSabha] = React.useState(true);
	const [lok_sabha_version, setLokSabhaVersion] = React.useState("");
	const [rajya_sabha, setRajyaSabha] = React.useState(true);
	const [rajya_sabha_version, setRajyaSabhaVersion] = React.useState("");

	const [questions, setQuestions] = React.useState([]);
	const [startDate, setStartDate] = React.useState("");
	const [endDate, setEndDate] = React.useState("");

	const [mp, setMp] = React.useState("");
	const [ministry, setMinistry] = React.useState("");

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
			<MpSearchBar setMp={setMp} />
			<MinistrySearchBar setMinistry={setMinistry} />
			<DateRange setStartDate={setStartDate} setEndDate={setEndDate} />
		</Stack>
	);

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
			...(startDate !== "" && { from_date: startDate }),
			...(endDate !== "" && { to_date: endDate }),
			...(mp !== "" && { mp }),
			...(ministry !== "" && { ministry }),
		};
		console.log(startDate, endDate, mp, ministry, indices);
		if (typeof value === "string") {
			const response = await fetch(`${Routes.searchEngine}/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(body),
			});
			data = await response.json();
			setQuestions(data.hits.hits);
		}
	};

	return (
		<MainLayout mediumScreenSize={12} navFilters={navFilters}>
			<Container sx={{ width: "100%" }}>
				<SearchBar searchFunc={getQuestions} />
			</Container>
			<Stack
				sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", mt: 5 }}
				direction="column"
			>
				<Container sx={{ width: "100%" }}>
					{questions.map((hit, index) => {
						console.log(hit);
						if (hit._score > 0.4) {
							return (
								<Results
									key={index}
									sabha={formatSabha(hit._index)}
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

import React from "react";
import SearchBar from "../../components/searchBar";
import Grid from "@mui/material/Grid";
import SabhaFilter from "../../components/sabhaFilter";
import Results from "../../components/Results/Results";
import MainLayout from "../MainLayout";

export default class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
		};
		this.getQuestions = this.getQuestions.bind(this);
	}

	async getQuestions(value) {
		let data = "";
		if (value !== "" && typeof value === "string") {
			const response = await fetch(`http://192.168.29.246:8080/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					question: value,
					lok_sabha: "17",
					size: 10,
					min_score: 0.3,
				}),
			});
			data = await response.json();
			this.setState({
				questions: data.hits.hits,
			});
		}
	}
	render() {
		return (
			<MainLayout mediumScreenSize={12} navFilters={<SabhaFilter />}>
				<SearchBar searchFunc={this.getQuestions} />
				<Grid item xs={12}>
					{this.state.questions.map((hit, index) => {
						console.log(hit);
						if (hit._score > 0.4) {
							return (
								<Results
									key={index}
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
				</Grid>
			</MainLayout>
		);
	}
}

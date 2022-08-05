import React from "react";
import Navpane from "../components/Navpane";
import SearchBar from "../components/searchBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SabhaFilter from "../components/sabhaFilter";
import { Component } from "react";
import Results from "../components/Results/Results";

const drawerWidth = 240;

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: []
		};
		this.getQuestions = this.getQuestions.bind(this);
	}

	async getQuestions(value) {
		let data = "";
		if (value !== "" && typeof value === "string") {
			const response = await fetch(`http://localhost:8080/search`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
				body: JSON.stringify({
					question: value,
					index: "lok_sabha_17",
					size: 10,
					min_score: 0.3
				})
			});
			data = await response.json();
			this.setState({
				questions: data.hits.hits
			});
		}
	}

	render() {
		return (
			<Box sx={{ display: "flex", mt: 5 }}>
				<Navpane filters={<SabhaFilter />} />
				<Grid container justifyContent="center" alignItems="center">
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - ${drawerWidth}px)` }
						}}
					>
						<Toolbar />
						<Grid item xs={12}>
							<SearchBar searchFunc={this.getQuestions} />
						</Grid>
						<Grid item xs={12}>
							{
								this.state.questions.map((hit, index) => {
									console.log(hit);
									if (hit._score > 0.4) {
										return <Results key={index}
														subject={hit._source.subject}
														question={hit._source.question}
														answer={hit._source.answer}
														mp={hit._source.mp}
														ministry={hit._source.ministry}
														qid={hit._source.qno}
														answered_on={hit._source.answered_on}
														type={hit._source['starred/unstarred']}
										/>;
									}
								})
							}
						</Grid>
					</Box>
				</Grid>
			</Box>
		);
	}
}

export default Home;

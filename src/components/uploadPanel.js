import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { MenuItem } from "@mui/material";
import MpSearchBar from "./MpSearchBar";
import MinistrySearchBar from "./MinistrySearchBar";
import Box from "@mui/material/Box";
import AuthContext from "../context/auth/authContext";

export default function UploadPanel({
	questionRef,
	setMp,
	setMpId,
	setMinistry,
	setMinistryId,
	subjectRef,
	starredRef,
	title,
}) {
	const [question, setQuestion] = React.useState("");
	const [subject, setSubject] = React.useState("");
	const [starred, setStarred] = React.useState("Unstarred");

	const { authState } = React.useContext(AuthContext);

	const handleQuestion = (e) => {
		setQuestion(e.target.value);
	};

	const starred_unstarred_options = [{ label: "Starred" }, { label: "Unstarred" }];

	return (
		<Box sx={{ mb: 5 }}>
			<Container sx={{ pt: 5 }}>
				<Box sx={{ mb: 2, width: "100%", display: "flex", justifyContent: "center" }}>{title}</Box>
				<Stack direction="column" spacing={2}>
					<Stack direction="row" sx={{ width: "100%" }} spacing={2}>
						{!authState.role.includes("MP") && <MpSearchBar setMp={setMp} setID={setMpId} />}
						<MinistrySearchBar setMinistry={setMinistry} setID={setMinistryId} />
					</Stack>
					<TextField
						value={subject}
						inputRef={subjectRef}
						onChange={(e) => setSubject(e.target.value)}
						label="Subject"
						sx={{ paddingLeft: "auto", paddingRight: "auto", width: "100%" }}
					/>
					<TextField
						value={question}
						inputRef={questionRef}
						onChange={handleQuestion}
						label="Question"
						multiline={true}
						rows={6}
						sx={{ paddingLeft: "auto", paddingRight: "auto", width: "100%" }}
					/>
					<TextField
						select
						label="Starred/Unstarred"
						inputRef={starredRef}
						value={starred}
						onChange={(event) => setStarred(event.target.value)}
					>
						{starred_unstarred_options.map((option) => (
							<MenuItem key={option.label} value={option.label}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Stack>
			</Container>
		</Box>
	);
}

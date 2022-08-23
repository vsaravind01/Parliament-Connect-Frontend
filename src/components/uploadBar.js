import * as React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export default function HorizontalLinearStepper({ title, brief, setBrief }) {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				maxWidth: "85%",
				marginTop: 5,
				marginBottom: 10,
				height: 250,
			}}
		>
			{title}
			<TextField
				value={brief}
				multiline={true}
				rows={6}
				placeholder="Type here"
				sx={{ paddingLeft: "auto", paddingRight: "auto", width: "100%" }}
				onChange={(e) => setBrief(e.target.value)}
			/>
		</Container>
	);
}

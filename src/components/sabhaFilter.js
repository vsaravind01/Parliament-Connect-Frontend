import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import * as React from "react";

export default function SabhaFilter() {
	return (
		<Card sx={{ mx: 2, mt: 2 }} variant="outlined">
			<CardContent>
				<FormControl component="fieldset" color="secondary">
					<FormLabel component="legend" color="primary">Sabha</FormLabel>
					<FormGroup>
						<FormControlLabel
							value="lok_sabha"
							control={
								<Checkbox color="secondary" />
							}
							label="Lok Sabha"
							labelPlacement="end"
						/>
						<FormControlLabel
							value="rajya_sabha"
							control={
								<Checkbox color="secondary" />
							}
							label="Rajya Sabha"
							labelPlacement="end"
						/>
					</FormGroup>
				</FormControl>
			</CardContent>
		</Card>
	);
}

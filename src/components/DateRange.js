import { DateRangePicker } from "react-date-range";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { useState } from "react";

export default function DateRange({ setStartDate, setEndDate }) {
	const [state, setState] = useState([
		{
			startDate: addDays(new Date(), -7),
			endDate: new Date(),
			key: "selection",
		},
	]);

	const formatDM = (DM) => {
		if (DM < 10) {
			return "0" + DM;
		} else {
			return DM.toString();
		}
	};

	const formatYEAR = (YEAR) => {
		return YEAR.toString();
	};

	const formatDate = (date, month, year) => {
		return formatDM(date) + "." + formatDM(month) + "." + formatYEAR(year);
	};

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const setDate = (e) => {
		const startDate = formatDate(
			state[0].startDate.getDate(),
			state[0].startDate.getMonth() + 1,
			state[0].startDate.getFullYear()
		);
		const endDate = formatDate(
			state[0].endDate.getDate(),
			state[0].endDate.getMonth() + 1,
			state[0].endDate.getFullYear()
		);
		setStartDate(startDate);
		setEndDate(endDate);
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Date Range
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Set Date Range</DialogTitle>
				<DialogContent>
					<DialogContentText>Select the date range for the search.</DialogContentText>

					<DateRangePicker
						onChange={(item) => setState([item.selection])}
						showSelectionPreview={true}
						moveRangeOnFirstSelection={false}
						maxDate={new Date()}
						months={2}
						ranges={state}
						direction="horizontal"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
					<Button onClick={setDate}>Apply</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

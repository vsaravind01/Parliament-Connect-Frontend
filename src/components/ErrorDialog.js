import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as React from "react";

export default function ErrorDialog({ title, message }) {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{message} Please refresh the page and try again.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					color="inherit"
					variant="contained"
					sx={{
						"&& .MuiTouchRipple-rippleVisible": {
							animationDuration: "250ms",
						},
					}}
					onClick={() => {
						setOpen(false);
						window.location.reload();
					}}
					autoFocus
				>
					Refresh
				</Button>
			</DialogActions>
		</Dialog>
	);
}

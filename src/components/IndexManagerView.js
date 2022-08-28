import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IndexingServices from "../services/Indexing/Indexing.Services";
import AdminServices from "../services/Admin/Admin.Services";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

const Indexing = new IndexingServices();
const Admin = new AdminServices();

const CreateIndexDialog = (props) => {
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>New {props.sabha} Version</DialogTitle>
			<DialogContent>
				<DialogContentText>Set the version for the new index.</DialogContentText>
				<TextField
					value={props.newVersion}
					onChange={(e) => {
						props.setNewVersion(e.target.value);
					}}
					autoFocus
					margin="dense"
					id="version"
					label="Version"
					fullWidth
					variant="outlined"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>Cancel</Button>
				<Button onClick={() => props.ChangeVersion(props.sabha, props.handleClose)}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
};

const DeleteIndexDialog = (props) => {
	return (
		<Dialog open={props.open} onClose={props.handleClose}>
			<DialogTitle>
				Delete {props.sabha} {props.version} Index
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete the
					<Typography component="span" color="error">{` ${props.sabha} ${props.version} `}</Typography>
					index? This action cannot be undone.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose}>Cancel</Button>
				<Button onClick={() => props.DeleteIndex(props.handleClose)}>Delete</Button>
			</DialogActions>
		</Dialog>
	);
};

export default function IndexManagerView() {
	const [newVersion, setNewVersion] = React.useState("");
	const [deleteVersion, setDeleteVersion] = React.useState("");
	const [sabha, setSabha] = React.useState("");

	const [lok_sabhaVersions, set_lok_sabhaVersions] = React.useState([]);
	const [rajya_sabhaVersions, set_rajya_sabhaVersions] = React.useState([]);
	const [current_lok_sabhaVersion, set_Current_lok_sabhaVersion] = React.useState("");
	const [current_rajya_sabhaVersion, set_Current_rajya_sabhaVersion] = React.useState("");

	const [dialog, setDialog] = React.useState(<></>);

	const [open, setOpen] = React.useState({ lok_sabha: false, rajya_sabha: false });
	const [deleteOpen, setDeleteOpen] = React.useState({ lok_sabha: false, rajya_sabha: false });

	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });

	const [loading, setLoading] = React.useState(false);

	const handleClose = () => {
		console.log("handleClose", sabha);
		setOpen({ lok_sabha: false, rajya_sabha: false });
		setDeleteOpen({ lok_sabha: false, rajya_sabha: false });
	};

	const ChangeVersion = async () => {
		try {
			console.log(sabha, newVersion);
			const result = await Admin.createIndex({ sabha: sabha, version: newVersion });
			if (result.data.status === "success") {
				handleClose();
				setSetAlert({ open: true, message: "Index created successfully", severity: "success" });
				window.location.reload(false);
			} else {
				setSetAlert({ open: true, message: "Error creating index", severity: "error" });
			}
		} catch (error) {
			console.log(error);
			setSetAlert({ open: true, message: "Error creating index", severity: "error" });
		}
		handleClose();
	};

	const DeleteIndex = async (sabha, version) => {
		try {
			const result = await Admin.deleteIndex({ sabha, version });
			if (result.data.status === "success") {
				setSetAlert({ open: true, message: "Index deleted successfully", severity: "success" });
				window.location.reload(false);
			} else {
				setSetAlert({ open: true, message: "Error deleting index", severity: "error" });
			}
		} catch (error) {
			console.log(error);
			setSetAlert({ open: true, message: "Error deleting index", severity: "error" });
		}
		handleClose();
	};

	const setDefaultVersion = async (sabha, version) => {
		await Admin.set_current_sabha_version({ sabha, version });
		if (sabha === "lok_sabha") {
			set_Current_lok_sabhaVersion(version);
		} else {
			set_Current_rajya_sabhaVersion(version);
		}
	};
	React.useEffect(() => {
		(async () => {
			setLoading(true);
			const indices = await Indexing.getIndicesWithCount();
			const currentSabha = await Admin.get_current_sabha_version();

			set_Current_lok_sabhaVersion(currentSabha.data.result[0].lok_sabha);
			set_Current_rajya_sabhaVersion(currentSabha.data.result[0].rajya_sabha);

			console.log(currentSabha);
			set_lok_sabhaVersions(indices.data.lok_sabha);
			set_rajya_sabhaVersions(indices.data.rajya_sabha);
			setLoading(false);
		})();
	}, []);
	return (
		<Container>
			<Typography className="noselect" variant="h2" component="div">
				Index Manager
			</Typography>
			<Typography className="noselect" variant="body2" color="text.secondary" component="p">
				Manage the indices in the system.
			</Typography>

			{open.rajya_sabha && (
				<CreateIndexDialog
					open={open.rajya_sabha}
					sabha="Rajya Sabha"
					handleClose={handleClose}
					setNewVersion={setNewVersion}
					ChangeVersion={() => ChangeVersion()}
				/>
			)}

			{open.lok_sabha && (
				<CreateIndexDialog
					open={open.lok_sabha}
					sabha="Lok Sabha"
					handleClose={handleClose}
					setNewVersion={setNewVersion}
					ChangeVersion={() => ChangeVersion()}
				/>
			)}

			{deleteOpen.lok_sabha && (
				<DeleteIndexDialog
					open={deleteOpen.lok_sabha}
					sabha="Lok Sabha"
					version={deleteVersion}
					handleClose={handleClose}
					DeleteIndex={() => DeleteIndex("lok_sabha", deleteVersion)}
				/>
			)}

			{deleteOpen.rajya_sabha && (
				<DeleteIndexDialog
					open={deleteOpen.rajya_sabha}
					sabha="Rajya Sabha"
					version={deleteVersion}
					handleClose={handleClose}
					DeleteIndex={() => DeleteIndex("rajya_sabha", deleteVersion)}
				/>
			)}
			{alert.open && (
				<Alert severity={alert.severity} onClose={() => setSetAlert({ ...alert, open: false })}>
					{alert.message}
				</Alert>
			)}
			<Box sx={{ py: 1, mt: 5 }}>
				<Stack direction="row" spacing={1}>
					<IconButton
						sx={{ height: "100%" }}
						onClick={() => {
							setSabha("rajya_sabha");
							setOpen({ ...open, rajya_sabha: true });
						}}
					>
						<AddCircleOutlineRoundedIcon />
					</IconButton>
					<Typography variant="h4" component="div" gutterBottom>
						Rajya Sabha
					</Typography>
				</Stack>
				<Stack direction="column">
					<Card key="rajya_sabah" variant="outlined">
						<CardContent sx={{ display: "flex", textAlign: "center", justifyContent: "space-around" }}>
							<Typography sx={{ width: "100%" }} variant="h5" component="div" gutterBottom>
								Version
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Count
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Default
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Delete
							</Typography>
						</CardContent>
					</Card>
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
					) : rajya_sabhaVersions.length === 0 ? (
						<Card
							variant="outlined"
							sx={{
								height: 125,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography variant="h5" component="div" gutterBottom>
								No Index Found
							</Typography>
							{/*Button to create index*/}
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									setSabha("rajya_sabha");
									setOpen({ ...open, rajya_sabha: true });
								}}
							>
								Create Index
							</Button>
						</Card>
					) : (
						rajya_sabhaVersions.map((index) => (
							<Card key={index.version} variant="outlined">
								<CardContent
									sx={{ display: "flex", textAlign: "center", justifyContent: "space-around" }}
								>
									<Typography sx={{ width: "100%" }} variant="h5" component="div" gutterBottom>
										{index.version}
									</Typography>
									<Typography sx={{ width: "100%" }} variant="h5" component="p">
										{index.count}
									</Typography>
									{current_rajya_sabhaVersion.toString() === index.version ? (
										<Typography sx={{ width: "100%" }} variant="h5" component="div">
											<SpaRoundedIcon sx={{ width: "100%" }} color="primary" />
										</Typography>
									) : (
										<Button
											sx={{ width: "100%" }}
											onClick={() => setDefaultVersion("rajya_sabha", index.version)}
										>
											Set Default
										</Button>
									)}
									<Box sx={{ width: "100%" }}>
										<IconButton
											sx={{ width: "auto" }}
											onClick={() => {
												setSabha("rajya_sabha");
												setDeleteVersion(index.version);
												setDeleteOpen({ ...deleteOpen, rajya_sabha: true });
											}}
										>
											<DeleteSweepRoundedIcon />
										</IconButton>
									</Box>
								</CardContent>
							</Card>
						))
					)}
				</Stack>
			</Box>
			<Box sx={{ py: 1, mt: 5 }}>
				<Stack direction="row" spacing={1}>
					<IconButton
						sx={{ height: "100%" }}
						onClick={() => {
							setSabha("lok_sabha");
							setOpen({ ...open, lok_sabha: true });
						}}
					>
						<AddCircleOutlineRoundedIcon />
					</IconButton>
					<Typography variant="h4" component="div" gutterBottom>
						Lok Sabha
					</Typography>
				</Stack>
				<Stack direction="column">
					<Card key="lok_sabah" variant="outlined">
						<CardContent sx={{ display: "flex", textAlign: "center", justifyContent: "space-around" }}>
							<Typography sx={{ width: "100%" }} variant="h5" component="div" gutterBottom>
								Version
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Count
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Default
							</Typography>
							<Typography sx={{ width: "100%" }} variant="h5" component="div">
								Delete
							</Typography>
						</CardContent>
					</Card>
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
					) : lok_sabhaVersions.length === 0 ? (
						<Card
							variant="outlined"
							sx={{
								height: 125,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography variant="h5" component="div" gutterBottom>
								No Index Found
							</Typography>
							{/*Button to create index*/}
							<Button
								variant="contained"
								color="primary"
								onClick={() => {
									setSabha("lok_sabha");
									setOpen({ ...open, lok_sabha: true });
								}}
							>
								Create Index
							</Button>
						</Card>
					) : (
						lok_sabhaVersions.map((index) => (
							<Card key={index.version} variant="outlined">
								<CardContent
									sx={{ display: "flex", textAlign: "center", justifyContent: "space-between" }}
								>
									<Typography sx={{ width: "100%" }} variant="h5" component="div" gutterBottom>
										{index.version}
									</Typography>
									<Typography sx={{ width: "100%" }} variant="h5" component="p">
										{index.count}
									</Typography>
									{current_lok_sabhaVersion.toString() === index.version ? (
										<Typography sx={{ width: "100%" }} variant="h5" component="div">
											<SpaRoundedIcon sx={{ width: "100%" }} color="primary" />
										</Typography>
									) : (
										<Button
											sx={{ width: "100%" }}
											onClick={() => setDefaultVersion("lok_sabha", index.version)}
										>
											Set Default
										</Button>
									)}
									<Box sx={{ width: "100%" }}>
										<IconButton
											sx={{ width: "auto" }}
											onClick={() => {
												setSabha("lok_sabha");
												setDeleteVersion(index.version);
												setDeleteOpen({ ...deleteOpen, lok_sabha: true });
											}}
										>
											<DeleteSweepRoundedIcon />
										</IconButton>
									</Box>
								</CardContent>
							</Card>
						))
					)}
				</Stack>
			</Box>
		</Container>
	);
}

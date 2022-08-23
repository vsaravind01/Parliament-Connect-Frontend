import React from "react";
import MainLayout from "../MainLayout";
import Button from "@mui/material/Button";
import UploadBar from "../../components/uploadBar";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Container from "@mui/material/Container";
import Suggestions from "../../components/suggestions";
import UploadPanel from "../../components/uploadPanel";
import IndexingServices from "../../services/Indexing/Indexing.Services";
import SuccessDialogue from "../../components/SuccessDialogue";
import ErrorDialog from "../../components/ErrorDialog";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AdminServices from "../../services/Admin/Admin.Services";
import CircularProgress from "@mui/material/CircularProgress";
import FormLabel from "@mui/material/FormLabel";
import AuthContext from "../../context/auth/authContext";

const steps = ["Brief loop up", "Suggestions", "Upload your question"];

const Admin = new AdminServices();

export default function QuestionUpload() {
	const { authState } = React.useContext(AuthContext);

	const [loading, setLoading] = React.useState(false);

	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const [brief, setBrief] = React.useState("");
	const [sabha, setSabha] = React.useState("lok_sabha");

	const [uploadStatus, setUploadStatus] = React.useState("");
	const [error, setError] = React.useState(false);

	const [mp, setMp] = React.useState("");
	const [ministry, setMinistry] = React.useState("");

	const [mpId, setMpId] = React.useState("");
	const [ministryId, setMinistryId] = React.useState("");

	const subject = React.useRef("");
	const question = React.useRef("");
	const starred = React.useRef("Unstarred");

	const [current_lok_sabhaVersion, set_Current_lok_sabhaVersion] = React.useState("");
	const [current_rajya_sabhaVersion, set_Current_rajya_sabhaVersion] = React.useState("");

	React.useEffect(() => {
		(async () => {
			const currentSabha = await Admin.get_current_sabha_version();
			if (authState.role.includes("MP")) {
				const mp_by_id = await Admin.get_mp_by_id(authState.id);
				const tokens = mp_by_id.data.result.sabha.split("_");
				const sabha = tokens[0] + "_" + tokens[1];
				const version = tokens[2];
				setMp(mp_by_id.data.result.name);
				setMpId(mp_by_id.data.result.mp_id);
				setSabha(sabha);
				if (sabha === "lok_sabha") {
					set_Current_lok_sabhaVersion(version);
				} else if (sabha === "rajya_sabha") {
					set_Current_rajya_sabhaVersion(version);
				}
			}
			set_Current_lok_sabhaVersion(currentSabha.data.result[0].lok_sabha);
			set_Current_rajya_sabhaVersion(currentSabha.data.result[0].rajya_sabha);
		})();
	}, []);

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = (e) => {
		e.preventDefault();
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		if (activeStep === 2) {
			const current_version = sabha === "lok_sabha" ? current_lok_sabhaVersion : current_rajya_sabhaVersion;
			const data = {
				question: question.current.value,
				subject: subject.current.value,
				"starred/unstarred": starred.current.value.toUpperCase(),
				mp: mp,
				mp_id: mpId,
				ministry: ministry.toUpperCase(),
				ministry_id: ministryId,
				sabha: sabha,
				version: current_version,
			};
			console.log(data);
			setLoading(true);
			Admin.uploadQuestion(data)
				.then((res) => {
					console.log(res);
					setUploadStatus(`Question uploaded successfully.`);
					setLoading(false);
				})
				.catch((err) => {
					setError(true);
					setLoading(false);
				});
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	return (
		<MainLayout mediumScreenSize={12}>
			{uploadStatus.length !== 0 && <SuccessDialogue title="Success" message={uploadStatus} />}
			{error && <ErrorDialog title="Error" message="Something went wrong." />}
			<Container sx={{ width: "75%" }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepOptional(index)) {
							labelProps.optional = <Typography variant="caption">Optional</Typography>;
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</Container>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 4, height: "100%" }}>
				<Card variant="outlined" sx={{ width: { md: "80%", xs: "95%" }, mb: 5 }}>
					{activeStep === 0 && (
						<React.Fragment>
							<UploadBar
								title={
									<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
										<Typography
											className="noselect"
											sx={{ typography: { sm: "h6", md: "h4" }, mt: 2, mb: 2 }}
										>
											Enter your question in brief
										</Typography>
										{!authState.role.includes("MP") && (
											<Box sx={{ display: "flex", justifyContent: "center" }}>
												<FormControlLabel
													value="lok_sabha"
													control={
														<Radio
															checked={sabha === "lok_sabha"}
															onClick={() => {
																setSabha("lok_sabha");
															}}
														/>
													}
													label="Lok Sabha"
												/>
												<FormControlLabel
													value="rajya_sabha"
													control={
														<Radio
															checked={sabha === "rajya_sabha"}
															onClick={() => {
																setSabha("rajya_sabha");
															}}
														/>
													}
													label="Rajya Sabha"
												/>
											</Box>
										)}
									</Box>
								}
								brief={brief}
								setBrief={setBrief}
							/>
						</React.Fragment>
					)}
					{activeStep === 1 && (
						<Container>
							<Suggestions
								backAction={handleBack}
								skipAction={handleSkip}
								currentLokSabhaVersion={current_lok_sabhaVersion}
								currentRajyaSabhaVersion={current_rajya_sabhaVersion}
								title={
									<Typography className="noselect" sx={{ typography: { sm: "h6", md: "h4" }, mb: 2 }}>
										Answers related to your question
									</Typography>
								}
								query={brief}
							/>
						</Container>
					)}
					{activeStep === 2 && (
						<UploadPanel
							questionRef={question}
							setMinistry={setMinistry}
							setMinistryId={setMinistryId}
							setMp={setMp}
							setMpId={setMpId}
							starredRef={starred}
							subjectRef={subject}
							title={
								<Typography className="noselect" sx={{ typography: { sm: "h6", md: "h4" }, mb: 2 }}>
									Upload your question
								</Typography>
							}
						/>
					)}
					{activeStep === 3 && loading && (
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
							<Typography sx={{ my: 5 }}>
								Do not close this window. Your question is being uploaded.
							</Typography>
							<CircularProgress />
						</Box>
					)}
					<Box sx={{ width: "75%", marginRight: "auto", marginLeft: "auto", mt: "auto" }}>
						<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
							<Button onClick={handleBack} color="inherit" disabled={activeStep === 0}>
								Back
							</Button>

							<Button
								variant="contained"
								disabled={brief.length === 0 || activeStep > 2}
								disableElevation={true}
								onClick={handleNext}
							>
								{activeStep === 2 ? "Finish" : "Next"}
							</Button>
						</Box>
					</Box>
				</Card>
			</Box>
		</MainLayout>
	);
}

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TagsInput from "./TagsInput";
import Typography from "@mui/material/Typography";
import AdminServices from "../services/Admin/Admin.Services";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const Admin = new AdminServices();

export default function PostUpload() {
	const [title, setTitle] = React.useState("");
	const [image, setImage] = React.useState("");
	const [content, setContent] = React.useState("");
	const [tags, setTags] = React.useState("");

	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(title, image, content, tags);
		if (title.length > 0 && content.length > 0) {
			Admin.createPost({ title, image, content, tags })
				.then((res) => {
					setSetAlert({ open: true, message: "Post created successfully", severity: "success" });
				})
				.catch((err) => {
					setSetAlert({ open: true, message: err.message, severity: "error" });
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setSetAlert({ open: true, message: "Title and Content are required fields", severity: "error" });
		}
	};

	function handleSelected(items) {
		setTags(items);
	}

	return (
		<Card variant="outlined">
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					textAlign: "center",
					mt: 3,
				}}
			>
				<Typography className="noselect" variant="h4" component="h1" gutterBottom>
					Create a new post
				</Typography>
				<Typography className="noselect" variant="body2" color="text.secondary" gutterBottom>
					Quickest way to share your message to people
				</Typography>
			</Box>
			<CardContent>
				<Container sx={{ width: "80%", display: "flex", flexDirection: "column", gap: 2 }}>
					<TextField
						label="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						fullWidth
						multiline={true}
						inputProps={{
							maxLength: 150,
						}}
						helperText={`${title.length} / 150`}
					/>
					<TextField
						label="Image"
						value={image}
						aria-label="image-upload"
						onChange={(e) => setImage(e.target.value)}
						fullWidth
					/>
					<TextField
						multiline={true}
						minRows={4}
						maxRows={6}
						label="Content"
						value={content}
						aria-label="post-content"
						onChange={(e) => setContent(e.target.value)}
						fullWidth
						inputProps={{
							maxLength: 2000,
						}}
						helperText={`${content.length} / 2000`}
					/>
					<TagsInput
						selectedTags={handleSelected}
						fullWidth
						variant="outlined"
						id="tags"
						name="tags"
						label="Tags"
					/>
					<Stack sx={{ my: 3, alignItems: "center" }} direction="row" spacing={2}>
						{loading && <CircularProgress size={24} />}
						{alert.open && (
							<Alert
								sx={{ width: "100%" }}
								severity={alert.severity}
								onClose={() => setSetAlert({ ...alert, open: false })}
							>
								{alert.message}
							</Alert>
						)}
						<Button fullWidth={true} variant="contained" color="primary" onClick={handleSubmit}>
							Create
						</Button>
					</Stack>
				</Container>
			</CardContent>
		</Card>
	);
}

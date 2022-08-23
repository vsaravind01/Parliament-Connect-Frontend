import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import MainLayout from "../MainLayout";
import AdminServices from "../../services/Admin/Admin.Services";
import ThumbUpOffAltTwoToneIcon from "@mui/icons-material/ThumbUpOffAltTwoTone";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import TagsInput from "../../components/TagsInput";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";

const Admin = new AdminServices();

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EditPostDialog = ({ close, post }) => {
	const [title, setTitle] = React.useState(post.title);
	const [image, setImage] = React.useState(post.image_path);
	const [content, setContent] = React.useState(post.content);
	const [tags, setTags] = React.useState([]);

	const [alert, setSetAlert] = React.useState({ open: false, message: "", severity: "success" });
	const [loading, setLoading] = React.useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(title, image, content, tags);
		if (title.length > 0 && content.length > 0) {
			Admin.updatePost({ id: post.id, title, image, content, tags })
				.then((res) => {
					setSetAlert({ open: true, message: "Post updated successfully", severity: "success" });
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
		<Dialog fullScreen={true} open={true} TransitionComponent={Transition}>
			<AppBar sx={{ position: "relative" }} color={alert.open ? alert.severity : "primary"}>
				<Toolbar>
					<Tooltip title="Close">
						<IconButton edge="start" color="inherit" onClick={close} aria-label="close">
							<CloseIcon />
						</IconButton>
					</Tooltip>
					<Typography sx={{ ml: 2, width: "100%" }} variant="h6" component="div">
						Post Editor
					</Typography>
					<Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
						<Button autoFocus color="inherit" onClick={handleSubmit}>
							save
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<Container>
					<Container maxWidth="md">
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
									Update Post
								</Typography>

								<Typography className="noselect" variant="body2" color="text.secondary" gutterBottom>
									Quickest way to share your message to people
								</Typography>
								{alert.open && (
									<Box sx={{ width: "100%" }}>
										<Alert
											sx={{ width: "50%", margin: "auto" }}
											severity={alert.severity}
											onClose={() => setSetAlert({ ...alert, open: false })}
										>
											{alert.message}
										</Alert>
									</Box>
								)}
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
									{post.tags ? (
										<TagsInput
											selectedTags={handleSelected}
											tags={post.tags}
											fullWidth
											variant="outlined"
											id="tags"
											name="tags"
											placeholder="Add tags"
											label="Tags"
										/>
									) : (
										<TagsInput
											selectedTags={handleSelected}
											fullWidth
											variant="outlined"
											id="tags"
											name="tags"
											placeholder="Add tags"
											label="Tags"
										/>
									)}

									<Stack sx={{ my: 3, alignItems: "center" }} direction="row" spacing={2}>
										{loading && <CircularProgress size={24} />}
									</Stack>
								</Container>
							</CardContent>
						</Card>
					</Container>
				</Container>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit} color="primary">
					Save
				</Button>
				<Button onClick={close} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function PollMakerPage() {
	const [expanded, setExpanded] = React.useState([]);
	const [posts, setPosts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const [editDialogOpen, setEditDialogOpen] = React.useState(false);
	const [modifyPostData, setModifyPostData] = React.useState({});

	const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

	const handleExpandClick = (index) => {
		console.log(index);
		console.log(expanded);
		const newExpanded = [...expanded];
		newExpanded[index] = !expanded[index];
		setExpanded(newExpanded);
	};

	const handleDelete = (id) => {
		setLoading(true);
		Admin.deletePost({ id })
			.then((res) => {
				setDeleteDialogOpen(false);
				setEditDialogOpen(false);
				setPosts(posts.filter((post) => post.id !== id));
			})
			.catch((err) => {
				setDeleteDialogOpen(false);
				setEditDialogOpen(false);
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	React.useEffect(() => {
		setLoading(true);
		(async () => {
			const res = await Admin.getAllUserPosts();
			setPosts(res.data.posts);
			setExpanded(res.data.posts.map((_) => false));
			setLoading(false);
			console.log(res);
		})();
	}, []);

	return (
		<MainLayout mediumScreenSize={12}>
			<Tooltip title="Go to posts dashboard" placement="right">
				<IconButton component={Link} to="/posts">
					<ArrowBackRoundedIcon />
				</IconButton>
			</Tooltip>
			{editDialogOpen && <EditPostDialog close={() => setEditDialogOpen(false)} post={modifyPostData} />}
			{deleteDialogOpen && (
				<Dialog open={deleteDialogOpen} onClose={() => setEditDialogOpen(false)}>
					<DialogTitle>Delete Poll</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this post? This action cannot be undone.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => handleDelete(modifyPostData.id)} color="primary">
							Delete
						</Button>
						<Button variant="contained" onClick={() => setDeleteDialogOpen(false)} color="primary">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			)}
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 5,
				}}
			>
				{loading ? (
					<CircularProgress />
				) : posts.length === 0 ? (
					<Typography variant="h5">No posts found</Typography>
				) : (
					posts.map((post, index) => {
						return (
							<Paper elevation={24} key={index} sx={{ width: { md: 600, borderRadius: 15 } }}>
								<CardHeader
									avatar={
										<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
											{post.parliament_auth.uname[0]}
										</Avatar>
									}
									action={
										<React.Fragment>
											<IconButton
												aria-label={`edit post ${index}`}
												onClick={() => {
													setModifyPostData(post);
													setEditDialogOpen(true);
												}}
											>
												<EditRoundedIcon />
											</IconButton>
											<IconButton
												onClick={() => {
													setModifyPostData(post);
													setDeleteDialogOpen(true);
												}}
												aria-label={`delete post ${index}`}
											>
												<DeleteSweepRoundedIcon />
											</IconButton>
										</React.Fragment>
									}
									title={post.parliament_auth.uname}
									subheader={new Date(post.createdAt).toLocaleDateString("en-us", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								/>
								{post.image_path && (
									<CardMedia
										component="img"
										height="250"
										image={post.image_path}
										alt="Unable to load the image"
									/>
								)}

								<CardContent>
									<Typography variant="subtitle2" color="text.primary">
										{post.title}
									</Typography>
									{post.tags && (
										<React.Fragment>
											<Typography sx={{ my: 1 }} variant="body2" color="text.secondary">
												Tags
											</Typography>
											<Stack direction="row" spacing={0.5}>
												{post.tags.map((tag, index) => (
													<Chip key={index} label={tag} />
												))}
											</Stack>
										</React.Fragment>
									)}
								</CardContent>
								<CardActions sx={{ mx: 1 }} disableSpacing>
									<Box>{post.likes}</Box>
									<Box>
										<IconButton aria-label="add to favorites">
											<ThumbUpOffAltTwoToneIcon />
										</IconButton>
									</Box>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<ExpandMore
										expand={expanded[index]}
										onClick={() => handleExpandClick(index)}
										aria-expanded={expanded[index]}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</ExpandMore>
								</CardActions>
								<Collapse in={expanded[index]} timeout="auto" unmountOnExit>
									<CardContent>
										<Typography paragraph>{post.content}</Typography>
									</CardContent>
								</Collapse>
							</Paper>
						);
					})
				)}
			</Container>
		</MainLayout>
	);
}

import React from "react";
import Search from "./pages/Search";
import Login from "./pages/Login";
import AdminLogin from "./pages/Login/AdminLogin";
import MpMinistryLogin from "./pages/Login/MpMinistryLogin";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import QuestionUpload from "./pages/QuestionUpload";
import Dashboard from "./pages/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRouter from "./components/Security/PrivateRouter";
import ChangePassword from "./pages/ChangePassword";
import IndexManagementConsole from "./pages/IndexManagementConsole";
import Polls from "./pages/Polls";
import PollMakerPage from "./pages/Polls/PollMaker";
import PostsPage from "./pages/Posts";
import CreatePost from "./pages/Posts/CreatePost";
import PostsTimeline from "./pages/Posts/PreviousPosts";
import AnswerQuestion from "./pages/AnswerQuestion";
import UnansweredQuestionsPanel from "./pages/MpQuestions/UnansweredQuestions";
import AuthContext from "./context/auth/authProvider";

export default function Router() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/home" element={<Navigate to="/" />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/login/admin" element={<AdminLogin />} />
			<Route exact path="/login/mp_ministry" element={<MpMinistryLogin />} />
			<Route path="/" element={<PrivateRouter />}>
				<Route path="register" element={<Register />} />
				<Route path="search" element={<Search />} />
				<Route path="upload/question" element={<QuestionUpload />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="reset_password" element={<ChangePassword />} />
				<Route path="index/admin" element={<IndexManagementConsole />} />
				<Route path="polls" element={<Polls />} />
				<Route path="polls/poll-maker" element={<PollMakerPage />} />
				<Route path="posts" element={<PostsPage />} />
				<Route path="posts/create" element={<CreatePost />} />
				<Route path="posts/timeline" element={<PostsTimeline />} />
				<Route path="answer" element={<AnswerQuestion />} />
				<Route path="unanswered" element={<UnansweredQuestionsPanel />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

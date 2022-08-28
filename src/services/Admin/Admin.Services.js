import axios from "axios";
import Routes from "../Routes/routes.config";

const API_URL = `${Routes.backend}/api/admin/`;

let axiosConfig = {
	withCredentials: true,
};

export default class AdminServices {
	async get_all_ministries() {
		return await axios.get(API_URL + "parliament/ministry/all/name", axiosConfig);
	}

	async get_mp_by_id(id) {
		return await axios.get(API_URL + "parliament/mp/id/" + id, axiosConfig);
	}

	async get_all_mps() {
		return await axios.get(API_URL + "parliament/mp/all/name", axiosConfig);
	}

	async get_searched_mps(data) {
		return await axios.post(API_URL + "v2/parliament/mp", data, axiosConfig);
	}

	async get_current_sabha_version() {
		return await axios.get(API_URL + "parliament/sabha/get_version", axiosConfig);
	}

	async set_current_sabha_version(data) {
		return await axios.put(API_URL + "parliament/sabha/set_version", data, axiosConfig);
	}

	async createIndex(data) {
		return await axios.post(API_URL + "v2/parliament/index/create", data, axiosConfig);
	}

	async deleteIndex(data) {
		return await axios.post(API_URL + "v2/parliament/index/delete", data, axiosConfig);
	}

	async uploadQuestion(data) {
		return await axios.post(API_URL + "v2/parliament/question/upload", data, axiosConfig);
	}

	async createPoll(data) {
		return await axios.post(API_URL + "features/polls/create", data, axiosConfig);
	}

	async getAllUserPolls(data) {
		return await axios.post(API_URL + "features/polls/all", data, axiosConfig);
	}

	async getPoll(data) {
		return await axios.post(API_URL + "features/polls/get", data, axiosConfig);
	}

	async updatePoll(data) {
		return await axios.post(API_URL + "features/polls/update", data, axiosConfig);
	}

	async deletePoll(data) {
		return await axios.post(API_URL + "features/polls/delete", data, axiosConfig);
	}

	async createPost(data) {
		return await axios.post(API_URL + "features/posts/create", data, axiosConfig);
	}

	async updatePost(data) {
		return await axios.post(API_URL + "features/posts/update", data, axiosConfig);
	}

	async deletePost(data) {
		return await axios.post(API_URL + "features/posts/delete", data, axiosConfig);
	}

	async getAllUserPosts(data) {
		return await axios.post(API_URL + "features/posts/all", data, axiosConfig);
	}

	async getUserUnansweredQuestions(data) {
		return await axios.post(API_URL + "v2/parliament/unanswered", data, axiosConfig);
	}

	async uploadAnswer(data) {
		return await axios.post(API_URL + "v2/parliament/answer", data, axiosConfig);
	}

	async deleteQuestion(data) {
		return await axios.post(API_URL + "v2/parliament/question/delete", data, axiosConfig);
	}
}

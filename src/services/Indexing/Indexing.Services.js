import axios from "axios";
import Routes from "../Routes/routes.config";

const API_URL = `${Routes.searchEngine}`;

let axiosConfig = {
	withCredentials: true,
};

export default class SearchServices {
	async search(data) {
		return await axios.post(API_URL + "/search", data, axiosConfig);
	}

	async getSuggestions(data) {
		return await axios.post(API_URL + "/suggest", data, axiosConfig);
	}

	async getIndices(data) {
		return await axios.get(API_URL + "/get/indices");
	}

	async getIndicesWithCount(data) {
		return await axios.get(API_URL + "/get/indices_with_count");
	}
}

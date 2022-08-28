import axios from "axios";
import Routes from "../Routes/routes.config";

const API_URL = `${Routes.backend}/api/auth/`;

let axiosConfig = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
};

class AuthService {
	async signup(data) {
		return await axios.post(API_URL + "signup", data, axiosConfig);
	}
	async login(data) {
		return await axios.post(API_URL + "login", data, axiosConfig);
	}
	async logout(data) {
		return await axios.post(API_URL + "logout", data, axiosConfig);
	}
	async authorize() {
		return await axios.get(API_URL + "authorize", axiosConfig);
	}
	async changePassword(data) {
		return await axios.post(API_URL + "change_password", data, axiosConfig);
	}
	async test(data) {
		return await axios.post("http://localhost:5500/api/admin/test", data, axiosConfig);
	}
}

export default AuthService;

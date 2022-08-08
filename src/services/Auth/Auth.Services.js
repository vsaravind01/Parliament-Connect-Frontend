import axios from "axios";
const API_URL = "http://192.168.29.246:5500/api/auth/";

let axiosConfig = {
	withCredentials: true,
};

class AuthService {
	async signup(data) {
		return await axios.post(API_URL + "register", data, axiosConfig);
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
	async test(data) {
		return await axios.post("http://localhost:5500/api/admin/test", data, axiosConfig);
	}
}

export default AuthService;

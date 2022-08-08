const axios = require("axios");
const API_URL = "http://localhost:5500/api/auth/";

class AuthService {
	async admin_signup(data) {
		return await axios.post(API_URL + "signup", data);
	}
	async admin_login(data) {
		return await axios.post(API_URL + "login", data);
	}
	async admin_logout(data) {
		return await axios.post(API_URL + "logout", data);
	}
}

const service = new AuthService();

service
	.admin_login({ uname: "admin", password: "admin" })
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => {
		console.log(err.response.data);
	});

import AuthServices from "../services/Auth/Auth.Services";

// Logout trigger function
export function logout(event) {
	const Auth = new AuthServices();
	event.preventDefault();

	Auth.logout()
		.then(() => {
			window.location.href = "/";
		})
		.catch((err) => {
			alert("Error logging out");
			window.location.href = "/";
		});
}

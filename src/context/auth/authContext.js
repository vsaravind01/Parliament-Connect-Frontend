import * as React from "react";
import AuthService from "../../services/Auth/Auth.Services";

const AuthContext = React.createContext();

export default AuthContext;

const initialState = { name: "", role: null, isAuthenticated: false };
const Auth = new AuthService();

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = React.useState(initialState);
	const [authIsLoading, setAuthIsLoading] = React.useState(true);

	React.useEffect(() => {
		checkLogin();
	}, []);

	const checkLogin = () => {
		Auth.authorize()
			.then((res) => {
				if (res.data.success) {
					setAuthState({
						name: res.data.username,
						role: res.data.role,
						isAuthenticated: true,
						id: res.data.ref_id,
					});
				} else {
					setAuthState(initialState);
				}
			})
			.catch((err) => {
				setAuthState(initialState);
			})
			.finally(() => {
				setAuthIsLoading(false);
			});
	};

	const handleLogout = () => {
		Auth.logout()
			.then((res) => {
				if (res.data.success) {
					setAuthState(initialState);
				}
			})
			.catch((err) => {
				setAuthState(initialState);
			})
			.finally(() => {
				setAuthIsLoading(false);
			});
	};

	const stateValues = { authState, setAuthState, checkLogin, handleLogout, authIsLoading, setAuthIsLoading };

	return <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>;
};

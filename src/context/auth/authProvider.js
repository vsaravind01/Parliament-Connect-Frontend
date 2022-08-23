import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [authState, setAuthState] = useState({ name: "", isAuthenticated: false });
	return <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>;
};

import React from "react";
import MainLayout from "../MainLayout";
import IndexManagerView from "../../components/IndexManagerView";
import authContext from "../../context/auth/authContext";

export default function IndexManagementConsole() {
	const { authState } = React.useContext(authContext);
	return (
		<MainLayout mediumScreenSize={12}>
			<IndexManagerView />
		</MainLayout>
	);
}

import React from "react";
import MainLayout from "../MainLayout";
import IndexManagerView from "../../components/IndexManagerView";

export default function IndexManagementConsole() {
	return (
		<MainLayout mediumScreenSize={12}>
			<IndexManagerView />
		</MainLayout>
	);
}

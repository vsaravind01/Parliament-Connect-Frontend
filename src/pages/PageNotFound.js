import MainLayout from "./MainLayout";
import PageNotFound404 from "../static/images/pageNotFound.svg";
import React from "react";

export default function PageNotFound() {
	return (
		<MainLayout>
			<div>
				<img className="noselect" style={{ width: "75%" }} src={PageNotFound404} alt="Page not found" />
			</div>
		</MainLayout>
	);
}

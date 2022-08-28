import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AdminServices from "../services/Admin/Admin.Services";
import { useLocation } from "react-router-dom";

export default function MpSearchBar({ setMinistry, setID }) {
	const [ministries, setMinisties] = React.useState([]);
	const [ministryOpen, setMinistryOpen] = React.useState(false);

	const currentPath = useLocation().pathname;

	const Admin = new AdminServices();
	React.useEffect(() => {
		let active = true;

		(async () => {
			const mps = await Admin.get_all_ministries();

			if (active) {
				setMinisties(mps.data.message);
			}
		})();

		return () => {
			active = false;
		};
	}, []);

	return (
		<Autocomplete
			sx={{ paddingLeft: "auto", paddingRight: "auto", width: "100%" }}
			options={ministries}
			open={ministryOpen}
			onOpen={() => {
				setMinistryOpen(true);
			}}
			onClose={() => {
				setMinistryOpen(false);
			}}
			onInputChange={(e, value) => {
				setMinistry(value.toUpperCase());
			}}
			onChange={(e, value) => {
				if ((currentPath === "/register" || currentPath === "/upload/question") && value !== null) {
					setID(value.mid);
				}
			}}
			isOptionEqualToValue={(option, value) => option.mid === value.mid}
			getOptionLabel={(option) => option.name}
			renderInput={(params) => <TextField {...params} variant="outlined" label="Ministry" fullWidth />}
		/>
	);
}

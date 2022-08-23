import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AdminServices from "../services/Admin/Admin.Services";
import { useLocation } from "react-router-dom";

export default function MpSearchBar({ setMp, setID }) {
	const [mps, setMps] = React.useState([]);
	const [mpOpen, setMpOpen] = React.useState(false);

	const textRef = React.useRef("");

	const currentPath = useLocation().pathname;

	const Admin = new AdminServices();

	React.useEffect(() => {
		let active = true;

		(async () => {
			if (
				currentPath === "/upload/question" ||
				currentPath === "/register" ||
				currentPath === "/login/mp_ministry"
			) {
				const mps = await Admin.get_all_mps();
				if (active) {
					setMps(mps.data.result);
				}
			} else if (currentPath === "/search") {
				const mps = await Admin.get_searched_mps({ index: "lok_sabha_*,rajya_sabha_*" });
				if (active) {
					setMps(mps.data.mps);
				}
			}
		})();

		return () => {
			active = false;
		};
	}, []);

	return (
		<Autocomplete
			sx={{ paddingLeft: "auto", paddingRight: "auto", width: "100%" }}
			options={mps}
			open={mpOpen}
			onOpen={() => {
				setMpOpen(true);
			}}
			onClose={() => {
				setMpOpen(false);
			}}
			onInputChange={(e, value) => {
				setMp(value);
			}}
			onChange={(e, value) => {
				if ((currentPath === "/register" || currentPath === "/upload/question") && value !== null) {
					setID(value.mp_id);
				}
			}}
			isOptionEqualToValue={(option, value) =>
				currentPath === "/search" ? option.name === value.name : option.mp_id === value.mp_id
			}
			getOptionLabel={(option) => (currentPath === "/search" ? option.key : option.name)}
			renderInput={(params) => (
				<TextField {...params} inputRef={textRef} variant="outlined" label="MP" fullWidth />
			)}
		/>
	);
}

export function formatSabha(term) {
	const terms = term.split("_");
	return terms[0] + " " + terms[1] + " " + terms[2];
}

export function DateFormatter(dateTime, time) {
	const date = new Date(dateTime);
	let day = date.getDate();
	let month = date.getMonth() + 1;
	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}
	const year = date.getFullYear();
	const formattedDate = year + "-" + month + "-" + date;
	const formattedTime = time + ".000Z";
	return formattedDate + "T" + formattedTime;
}

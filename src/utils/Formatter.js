export function formatSabha(term) {
	const terms = term.split("_");
	return terms[0] + " " + terms[1] + " " + terms[2];
}

/* Formats date and time to universal datetime format
 * -@params : datetime:string, time:string
 * -@returns : <formatted datetime>:string
 *
 * sample datetime : 2022-08-24T12:33:02.052Z
 * time : HH:DD:SS
 * formatted datetime - date part of datetime + time + ".000Z"*/
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
	const formattedDate = year + "-" + month + "-" + day;
	const formattedTime = time + ".000Z";
	return formattedDate + "T" + formattedTime;
}

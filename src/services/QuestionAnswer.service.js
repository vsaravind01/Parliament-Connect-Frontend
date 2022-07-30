export async function getRecentQuestions() {
	try {
		const response = await fetch(
			"http://localhost:5000/api/admin/parliament/question/recent"
		);
		return await response.json();
	} catch (err) {
		return [];
	}
}

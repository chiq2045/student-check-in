import { api, datesAreEqual } from '$lib/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { students, attendance } = await api.getAllStudents();
	return {
		students,
		attendance: attendance.filter((v) => datesAreEqual(new Date(v.date), new Date()))
	};
};

export const actions: Actions = {
	checkIn: async ({ request }) => {
		const data = await request.formData();
		const studentId = data.get('student-id') as string;

		return await api.checkStudentIn(studentId);
	}
};

import { INSTANT_APP_ADMIN_TOKEN, INSTANT_APP_ID } from '$env/static/private';
import { id, init } from '@instantdb/admin';
import schema from '../../instant.schema';
// import type { Entity, EntityWithoutId } from '$lib';

const db = init({
	appId: INSTANT_APP_ID,
	adminToken: INSTANT_APP_ADMIN_TOKEN,
	schema
});

const getDateString = (date: Date) =>
	date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

export const datesAreEqual = (date1: Date, date2: Date) =>
	getDateString(date1) === getDateString(date2);

export const api = {
	getAllStudents: async () =>
		await db.query({
			students: {
				attendance: {}
			},
			attendance: {
				students: {}
			}
		}),
	checkStudentIn: async (studentId: string) => {
		const today = new Date();
		const { attendance } = await db.query({ attendance: {} });
		const currentAttendance = attendance.find((v) => datesAreEqual(new Date(v.date), today));

		return await db.transact([
			...(currentAttendance
				? [
						db.tx.attendance[currentAttendance.id]
							.update({ date: currentAttendance.date })
							.link({ students: [studentId] })
					]
				: [db.tx.attendance[id()].update({ date: new Date() }).link({ students: [studentId] })])
		]);
	}
};

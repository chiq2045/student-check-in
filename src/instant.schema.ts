// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from '@instantdb/admin';

const _schema = i.schema({
	entities: {
		$files: i.entity({
			path: i.string().unique().indexed(),
			url: i.string()
		}),
		$users: i.entity({
			email: i.string().unique().indexed().optional()
		}),
		assignments: i.entity({
			description: i.string().optional(),
			max_points: i.number().optional(),
			name: i.string().optional(),
			standard: i.string().optional()
		}),
		attendance: i.entity({
			date: i.date().indexed()
		}),
		classes: i.entity({
			description: i.string().optional(),
			name: i.string().optional()
		}),
		classGradeOptions: i.entity({
			name: i.string().optional(),
			value: i.string().indexed().optional()
		}),
		grades: i.entity({
			comments: i.string().optional(),
			score: i.number().optional(),
			standard_score: i.any().optional()
		}),
		homerooms: i.entity({
			grade: i.string().optional(),
			name: i.string().optional()
		}),
		instruments: i.entity({
			category: i.string().optional(),
			created_date: i.date().indexed().optional(),
			description: i.string().optional(),
			instrument_type: i.string().optional(),
			inventory_number: i.string().unique().optional(),
			name: i.string().optional(),
			notes: i.string().optional(),
			number_of_instruments: i.number().optional(),
			score: i.number().optional(),
			serial_number: i.string().unique().optional(),
			updated_date: i.date().indexed().optional()
		}),
		options: i.entity({
			categories: i.any().optional(),
			instrument_types: i.any().optional()
		}),
		students: i.entity({
			name: i.string().optional()
		}),
		teachers: i.entity({
			name: i.string().optional()
		})
	},
	links: {
		assignmentsGrades: {
			forward: {
				on: 'assignments',
				has: 'many',
				label: 'grades'
			},
			reverse: {
				on: 'grades',
				has: 'one',
				label: 'assignment',
				onDelete: 'cascade'
			}
		},
		attendanceStudents: {
			forward: {
				on: 'attendance',
				has: 'many',
				label: 'students'
			},
			reverse: {
				on: 'students',
				has: 'many',
				label: 'attendance'
			}
		},
		classesAssignments: {
			forward: {
				on: 'classes',
				has: 'many',
				label: 'assignments'
			},
			reverse: {
				on: 'assignments',
				has: 'one',
				label: 'class',
				onDelete: 'cascade'
			}
		},
		studentsAssignments: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'assignments'
			},
			reverse: {
				on: 'assignments',
				has: 'many',
				label: 'students'
			}
		},
		studentsClasses: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'classes'
			},
			reverse: {
				on: 'classes',
				has: 'many',
				label: 'students'
			}
		},
		studentsGrades: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'grades'
			},
			reverse: {
				on: 'grades',
				has: 'one',
				label: 'student',
				onDelete: 'cascade'
			}
		},
		studentsHomeroom: {
			forward: {
				on: 'students',
				has: 'one',
				label: 'homeroom'
			},
			reverse: {
				on: 'homerooms',
				has: 'many',
				label: 'students'
			}
		},
		studentsTeachers: {
			forward: {
				on: 'students',
				has: 'many',
				label: 'teachers'
			},
			reverse: {
				on: 'teachers',
				has: 'many',
				label: 'students'
			}
		},
		teachersClasses: {
			forward: {
				on: 'teachers',
				has: 'many',
				label: 'classes'
			},
			reverse: {
				on: 'classes',
				has: 'many',
				label: 'teachers'
			}
		},
		teachersHomerooms: {
			forward: {
				on: 'teachers',
				has: 'many',
				label: 'homerooms'
			},
			reverse: {
				on: 'homerooms',
				has: 'many',
				label: 'teachers'
			}
		}
	},
	rooms: {}
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;

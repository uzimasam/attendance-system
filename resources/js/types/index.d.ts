export interface Attendance {
    id: number;
    cohort_student_id: number;
    unit_id: number;
    attendance_date: string;
    attendance_status: string;
}

export interface Cohort {
    id: number;
    name: string;
    code: string;
    program_id: number;
    status: string;
}

export interface CohortStudent {
    id: number;
    cohort_id: number;
    student_id: number;
}

export interface CohortUnit {
    id: number;
    cohort_id: number;
    unit_id: number;
}

export interface Program {
    id: number;
    name: string;
    code: string;
    slug: string;
    school_id: number;
    status: string;
}

export interface Schedule {
    id: number;
    attendance_link: string;
    unit_id: number;
    cohort_id: number;
    day: string;
    start_time: string;
    end_time: string;
    venue: string;
    status: string;
    unit: Unit;
    cohort: Cohort;
}

export interface School {
    id: number;
    name: string;
    code: string;
}

export interface Student {
    id: number;
    registration_number: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    status: string;
}

export interface Unit {
    id: number;
    name: string;
    code: string;
    slug: string;
    program_id: number;
    status: string;
}

export interface UnitLecturer {
    id: number;
    unit_id: number;
    lecturer_id: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    staff_number: string;
    role: string;
    email_verified_at?: string;
}

export interface UserSchool {
    id: number;
    user_id: number;
    school_id: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

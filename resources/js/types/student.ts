export interface Student {
    id: string;
    regNo: string;
    name: string;
    email: string;
    cohortId: string;
    [key: string]: string; // For any additional columns in CSV
}

export interface StudentUploadFormData {
    data: Student[];
}

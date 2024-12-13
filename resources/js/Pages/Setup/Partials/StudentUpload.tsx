import React, { useState, useRef, FormEventHandler } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { Student, StudentUploadFormData } from '@/types/student';

interface StudentUploadProps {
    readonly onSubmit: (data: Student[]) => void;
    readonly cohortId: string;
}

export default function StudentUpload({ onSubmit, cohortId }: StudentUploadProps) {
    const { data, setData, post, processing, errors, reset } = useForm<StudentUploadFormData>({
        data: [],
    });
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<Student[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateStudent = (student: Partial<Student>): string | null => {
        if (!student.regNo?.trim()) return 'Registration number is required';
        if (!student.name?.trim()) return 'Name is required';
        if (!student.email?.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) return 'Invalid email format';
        return null;
    };

    const processFile = async (file: File) => {
        try {
            const text = await file.text();
            const rows = text.split('\n');
            const headers = rows[0].split(',').map(header => header.trim().toLowerCase());

            if (!headers.includes('regno') || !headers.includes('name') || !headers.includes('email')) {
                setError('CSV must include "regNo", "name", and "email" columns');
                return;
            }

            const students: Student[] = [];
            const errors: string[] = [];

            rows.slice(1)
                .filter(row => row.trim())
                .forEach((row, index) => {
                    const values = row.split(',');
                    const student = headers.reduce((obj, header, i) => ({
                        ...obj,
                        [header === 'regno' ? 'regNo' : header]: values[i]?.trim() || '',
                    }), {} as Partial<Student>);

                    const validationError = validateStudent(student);
                    if (validationError) {
                        errors.push(`Row ${index + 2}: ${validationError}`);
                    } else {
                        students.push({
                            ...student,
                            id: crypto.randomUUID(),
                            cohortId,
                        } as Student);
                    }
                });

            if (errors.length > 0) {
                setError(`Validation errors:\n${errors.join('\n')}`);
                return;
            }

            setPreview(students);
            setData('data', students);
            setError(null);
        } catch (err) {
            setError('Failed to process CSV file. Please check the file format.');
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file?.type === 'text/csv') {
            await processFile(file);
        } else {
            setError('Please upload a CSV file');
        }
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await processFile(file);
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!preview.length) {
            setError('No valid students to upload');
            return;
        }

        try {
            await post(route('students.store'), {
                onSuccess: () => {
                    onSubmit(preview);
                    setPreview([]);
                    reset();
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                },
                onError: (errors) => {
                    setError(Object.values(errors).join('\n'));
                },
            });
        } catch (err) {
            setError('Failed to upload students. Please try again.');
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Upload Students</h2>
            </div>

            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileInput}
                    className="hidden"
                />

                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your CSV file here, or{' '}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700"
                    >
                        browse
                    </button>
                </p>
                <p className="text-xs text-gray-500">
                    CSV should include columns: regNo, name, and email
                </p>
            </div>

            {error && (
                <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm whitespace-pre-line">{error}</div>
                </div>
            )}

            {preview.length > 0 && (
                <div className="border border-gray-200 rounded-lg">
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900">Preview</h3>
                            <p className="text-sm text-gray-600">{preview.length} students</p>
                        </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Reg No
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {preview.slice(0, 5).map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-4 py-2 text-sm text-gray-900">{student.regNo}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{student.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{student.email}</td>
                                    </tr>
                                ))}
                                {preview.length > 5 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-2 text-sm text-gray-500 text-center">
                                            And {preview.length - 5} more students...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {preview.length > 0 && (
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Uploading...' : `Upload ${preview.length} Students`}
                </button>
            )}
        </form>
    );
}

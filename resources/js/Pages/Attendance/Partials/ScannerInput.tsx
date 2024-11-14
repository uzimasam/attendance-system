import React, { useEffect, useRef } from 'react';
import { ScanLine } from 'lucide-react';

interface ScannerInputProps {
    onScanComplete: (regNo: string) => void;
}

export default function ScannerInput({ onScanComplete }: ScannerInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Focus the input when component mounts
        inputRef.current?.focus();

        // Cleanup timeout on unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to process the input
        timeoutRef.current = setTimeout(() => {
            if (value) {
                onScanComplete(value);
                e.target.value = ''; // Clear input after processing
            }
        }, 100); // Small delay to ensure we get the complete scan
    };

    return (
        <div className="p-4 border-b border-gray-100">
            <div className="relative">
                <ScanLine className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Scan student ID or registration number..."
                    onChange={handleInput}
                    autoComplete="off"
                />
            </div>
            <p className="mt-2 text-sm text-gray-600">
                Place cursor here and scan student ID to mark attendance automatically
            </p>
        </div>
    );
}

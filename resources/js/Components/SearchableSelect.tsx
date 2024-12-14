import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Option {
    id: number;
    label: string;
    sublabel?: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: number;
    onChange: (value: number) => void;
    placeholder: string;
    label: string;
    required?: boolean;
}

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder,
    label,
    required = false,
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.sublabel?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedOption = options.find(option => option.id === value);

    const handleSelect = (optionId: number) => {
        onChange(optionId);
        setIsOpen(false);
        setSearchQuery('');
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div
                className="relative cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 0);
                }}
            >
                <div
                    className={`w-full rounded-lg border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'
                        } shadow-sm px-3 py-2 text-gray-900`}
                >
                    {selectedOption ? (
                        <div>
                            <div className="font-medium">{selectedOption.label}</div>
                            {selectedOption.sublabel && (
                                <div className="text-sm text-gray-600">{selectedOption.sublabel}</div>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-3 text-sm text-gray-600">No results found</div>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`px-3 py-2 hover:bg-gray-50 cursor-pointer ${option.id === value ? 'bg-blue-50' : ''
                                        }`}
                                    onClick={() => handleSelect(option.id)}
                                >
                                    <div className="font-medium">{option.label}</div>
                                    {option.sublabel && (
                                        <div className="text-sm text-gray-600">{option.sublabel}</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Hidden input for form validation */}
            <input
                type="text"
                required={required}
                value={value}
                onChange={() => { }}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
            />
        </div>
    );
}

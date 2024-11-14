import React, { useState } from 'react';
import { School, BookOpen, Users, Upload, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import SchoolForm from './SchoolForm';
import ProgramForm from './ProgramForm';
import CohortForm from './CohortForm';
import StudentUpload from './StudentUpload';

type Step = 'school' | 'program' | 'unit' | 'cohort' | 'students';

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('school');
  const [formData, setFormData] = useState<{
    school: { id: string } | null;
    program: { id: string } | null;
    units: any[];
    cohort: { id: string } | null;
  }>({
    school: null,
    program: null,
    units: [],
    cohort: null,
  });

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'school', label: 'School Details', icon: <School className="w-5 h-5" /> },
    { id: 'program', label: 'Program', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'unit', label: 'Units', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'cohort', label: 'Cohort', icon: <Users className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <Upload className="w-5 h-5" /> },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleSchoolSubmit = (schoolData: any) => {
    setFormData(prev => ({ ...prev, school: schoolData }));
    handleNext();
  };

  const handleProgramSubmit = (programData: any) => {
    setFormData(prev => ({ ...prev, program: programData }));
    handleNext();
  };

  const handleCohortSubmit = (cohortData: any) => {
    setFormData(prev => ({ ...prev, cohort: cohortData }));
    handleNext();
  };

  const handleStudentsSubmit = (studentsData: any[]) => {
    console.log('Students uploaded:', studentsData);
    // Here you would typically make an API call to save all the data
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : steps.findIndex(s => s.id === currentStep) > index
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      currentStep === step.id ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-full h-1 bg-gray-200 flex-1 mx-4">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{
                        width: steps.findIndex(s => s.id === currentStep) > index ? '100%' : '0%',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {currentStep === 'school' && <SchoolForm onSubmit={handleSchoolSubmit} />}
          {currentStep === 'program' && (
            <ProgramForm onSubmit={handleProgramSubmit} schoolId={formData.school?.id ?? ''} />
          )}
          {currentStep === 'cohort' && (
            <CohortForm
              onSubmit={handleCohortSubmit}
              programId={formData.program?.id ?? ''}
              units={formData.units}
            />
          )}
          {currentStep === 'students' && (
            <StudentUpload
              onSubmit={handleStudentsSubmit}
              cohortId={formData.cohort?.id ?? ''}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors ${
                currentStep === 'school' ? 'invisible' : ''
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            {currentStep !== 'students' && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

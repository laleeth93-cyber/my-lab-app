// FILE: app/page.tsx
"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import NewRegistration from './components/NewRegistration';
import CustomizeRegistrationModal from './components/CustomizeRegistrationModal';
// BLOCK IMPORTS CLOSE

// BLOCK TYPES DEFINITION OPEN
export interface FieldData {
  id: number;
  label: string;
  category: string;
  isVisible: boolean;
  order: number | null;
  width: string;
  required: boolean;
  placeholder?: string;
  inputType: 'text' | 'select' | 'date' | 'textarea' | 'file' | 'age' | 'phone';
  options?: string[];
}

// Updated Age to 80px to utilize the new column option
const initialFieldsData: FieldData[] = [
  // Basic Info
  { id: 1, label: "Patient ID", category: "Basic Info", isVisible: true, order: 1, width: '180px', required: true, inputType: 'text', placeholder: 'Auto-generated' },
  { id: 2, label: "Designation", category: "Basic Info", isVisible: true, order: 2, width: '120px', required: false, inputType: 'select', options: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Baby', 'Master'] },
  { id: 3, label: "First Name", category: "Basic Info", isVisible: true, order: 3, width: '230px', required: true, inputType: 'text', placeholder: 'First name' },
  { id: 4, label: "Last Name", category: "Basic Info", isVisible: true, order: 4, width: '230px', required: true, inputType: 'text', placeholder: 'Last name' },
  { id: 5, label: "Age", category: "Basic Info", isVisible: true, order: 5, width: '80px', required: true, inputType: 'age' },
  { id: 6, label: "Gender", category: "Basic Info", isVisible: true, order: 6, width: '120px', required: true, inputType: 'select', options: ['Male', 'Female', 'Other'] },
  
  // Vitals
  { id: 7, label: "Weight (kg)", category: "Vitals", isVisible: true, order: 7, width: '120px', required: false, inputType: 'text', placeholder: 'Weight' },
  { id: 8, label: "Height (cm)", category: "Vitals", isVisible: true, order: 8, width: '120px', required: false, inputType: 'text', placeholder: 'Height' },
  
  // Contact Info
  { id: 9, label: "Phone Number", category: "Contact Info", isVisible: true, order: 9, width: '230px', required: true, inputType: 'phone' },
  { id: 10, label: "Email", category: "Contact Info", isVisible: true, order: 10, width: '300px', required: false, inputType: 'text', placeholder: 'Email' },
  { id: 11, label: "Address", category: "Contact Info", isVisible: true, order: 11, width: '100%', required: false, inputType: 'textarea', placeholder: 'Address' },
  
  // Identification
  { id: 12, label: "Aadhaar Number", category: "Identification", isVisible: false, order: null, width: '230px', required: false, inputType: 'text', placeholder: 'Aadhaar number' },
  { id: 13, label: "Insurance Number", category: "Identification", isVisible: false, order: null, width: '230px', required: false, inputType: 'text', placeholder: 'Insurance number' },
  { id: 14, label: "UHID", category: "Identification", isVisible: false, order: null, width: '180px', required: false, inputType: 'text', placeholder: 'UHID' },
  { id: 15, label: "Barcode", category: "Identification", isVisible: false, order: null, width: '180px', required: false, inputType: 'text', placeholder: 'Barcode' },
  { id: 16, label: "Passport Number", category: "Identification", isVisible: false, order: null, width: '230px', required: false, inputType: 'text', placeholder: 'Passport number' },
  { id: 17, label: "Owner Name", category: "Identification", isVisible: false, order: null, width: '230px', required: false, inputType: 'text', placeholder: 'Owner name' },
  { id: 18, label: "Breed", category: "Identification", isVisible: false, order: null, width: '180px', required: false, inputType: 'text', placeholder: 'Breed' },

  // Patient Info
  { id: 19, label: "Category", category: "Patient Info", isVisible: false, order: null, width: '180px', required: false, inputType: 'select', options: ['General', 'VIP', 'Staff', 'Emergency'] },

  // Medical Info
  { id: 20, label: "Clinical History", category: "Medical Info", isVisible: false, order: null, width: '100%', required: false, inputType: 'textarea', placeholder: 'Clinical history' },
  { id: 21, label: "Documents", category: "Medical Info", isVisible: false, order: null, width: '100%', required: false, inputType: 'file' },

  // Billing
  { id: 22, label: "Payment", category: "Billing", isVisible: false, order: null, width: '180px', required: true, inputType: 'select', options: ['Cash', 'Card', 'UPI', 'Insurance'] },
  { id: 23, label: "Rate List Type", category: "Billing", isVisible: false, order: null, width: '180px', required: true, inputType: 'select', options: ['Standard', 'Corporate', 'Camp'] },

  // Referral
  { id: 24, label: "Referring Doctor", category: "Referral", isVisible: false, order: null, width: '230px', required: false, inputType: 'select', options: ['Dr. Smith', 'Dr. Jones', 'Self'] },
  { id: 25, label: "Referring Hospital", category: "Referral", isVisible: false, order: null, width: '230px', required: false, inputType: 'select', options: ['City Hospital', 'General Hospital'] },
  { id: 26, label: "Company", category: "Referral", isVisible: false, order: null, width: '230px', required: false, inputType: 'select', options: ['Corp A', 'Corp B'] },

  // Collection
  { id: 27, label: "Collected At", category: "Collection", isVisible: false, order: null, width: '180px', required: false, inputType: 'select', options: ['Home', 'Lab', 'Center A'] },
  { id: 28, label: "Collection Date & Time", category: "Collection", isVisible: false, order: null, width: '230px', required: false, inputType: 'date' },
  { id: 29, label: "Dispatch Methods", category: "Collection", isVisible: false, order: null, width: '230px', required: false, inputType: 'select', options: ['Email', 'SMS', 'Hard Copy'] },
];
// BLOCK TYPES DEFINITION CLOSE

export default function Dashboard() {
  
  // BLOCK STATE SETUP OPEN
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  
  // Master state for registration fields
  const [registrationFields, setRegistrationFields] = useState<FieldData[]>(initialFieldsData);
  // BLOCK STATE SETUP CLOSE

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#eceff1]">
      
      {/* BLOCK HEADER OPEN */}
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1 overflow-hidden"> 
        
        {/* BLOCK SIDEBAR OPEN */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          activeView={activeView} 
          setActiveView={setActiveView} 
        />
        {/* BLOCK SIDEBAR CLOSE */}

        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-hidden h-full bg-[#eceff1]">
          {/* Updates:
              1. Removed 'pb-20' which was causing the extra gray space/scroll.
              2. Added 'h-full flex flex-col' so children can fill the height perfectly.
          */}
          <div className="w-full h-full flex flex-col mx-auto">
            
            {/* BLOCK DASHBOARD VIEW OPEN */}
            {activeView === 'dashboard' && <DashboardOverview />}
            {/* BLOCK DASHBOARD VIEW CLOSE */}

            {/* BLOCK REGISTRATION VIEW OPEN */}
            {activeView === 'registration' && (
              <NewRegistration 
                fields={registrationFields}
                onCustomizeClick={() => setIsCustomizeModalOpen(true)} 
              />
            )}
            {/* BLOCK REGISTRATION VIEW CLOSE */}

            {/* BLOCK CUSTOMIZE MODAL OPEN */}
            <CustomizeRegistrationModal 
              isOpen={isCustomizeModalOpen} 
              onClose={() => setIsCustomizeModalOpen(false)} 
              fields={registrationFields}
              setFields={setRegistrationFields}
            />
            {/* BLOCK CUSTOMIZE MODAL CLOSE */}

            {/* BLOCK CATCH ALL VIEW OPEN */}
            {!['dashboard', 'registration'].includes(activeView) && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 bg-white rounded-3xl shadow-lg border border-purple-100">
                   <h2 className="text-xl font-bold text-[#9575cd] uppercase mb-2">{activeView.replace(/_/g, ' ')}</h2>
                   <p className="text-slate-400">This module is currently under development.</p>
                </div>
              </div>
            )}
            {/* BLOCK CATCH ALL VIEW CLOSE */}

          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}
      </div>
    </div>
  );
}
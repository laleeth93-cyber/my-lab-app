"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import { SlidersHorizontal, X, Search, Settings } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK TYPES OPEN
interface FieldData {
  id: number;
  label: string;
  category: string;
  isVisible: boolean;
  order: number | null;
  width: 'full' | 'half' | 'one-third';
  required: boolean;
  placeholder?: string;
}
// BLOCK TYPES CLOSE

// BLOCK INITIAL DATA OPEN
const initialFieldsData: FieldData[] = [
  // Basic Info
  { id: 1, label: "Patient ID", category: "Basic Info", isVisible: true, order: 1, width: 'half', required: true },
  { id: 2, label: "Designation", category: "Basic Info", isVisible: true, order: 2, width: 'half', required: false },
  { id: 3, label: "First Name", category: "Basic Info", isVisible: true, order: 3, width: 'half', required: true },
  { id: 4, label: "Last Name", category: "Basic Info", isVisible: true, order: 4, width: 'half', required: true },
  { id: 5, label: "Age", category: "Basic Info", isVisible: true, order: 5, width: 'half', required: true },
  { id: 6, label: "Gender", category: "Basic Info", isVisible: true, order: 6, width: 'half', required: true },
  
  // Vitals
  { id: 7, label: "Weight", category: "Vitals", isVisible: true, order: 7, width: 'half', required: false },
  { id: 8, label: "Height", category: "Vitals", isVisible: true, order: 8, width: 'half', required: false },
  
  // Contact Info
  { id: 9, label: "Phone Number", category: "Contact Info", isVisible: true, order: 9, width: 'half', required: true },
  { id: 10, label: "Email", category: "Contact Info", isVisible: true, order: 10, width: 'half', required: false },
  { id: 11, label: "Address", category: "Contact Info", isVisible: true, order: 11, width: 'full', required: false },
  
  // Identification
  { id: 12, label: "Aadhaar Number", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 13, label: "Insurance Number", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 14, label: "UHID", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 15, label: "Barcode", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 16, label: "Passport Number", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 17, label: "Owner Name", category: "Identification", isVisible: false, order: null, width: 'half', required: false },
  { id: 18, label: "Breed", category: "Identification", isVisible: false, order: null, width: 'half', required: false },

  // Patient Info
  { id: 19, label: "Category", category: "Patient Info", isVisible: false, order: null, width: 'half', required: false },

  // Medical Info
  { id: 20, label: "Clinical History", category: "Medical Info", isVisible: false, order: null, width: 'full', required: false },
  { id: 21, label: "Documents", category: "Medical Info", isVisible: false, order: null, width: 'full', required: false },

  // Billing
  { id: 22, label: "Payment", category: "Billing", isVisible: false, order: null, width: 'half', required: true },
  { id: 23, label: "Rate List Type", category: "Billing", isVisible: false, order: null, width: 'half', required: true },

  // Referral
  { id: 24, label: "Referring Doctor", category: "Referral", isVisible: false, order: null, width: 'half', required: false },
  { id: 25, label: "Referring Hospital", category: "Referral", isVisible: false, order: null, width: 'half', required: false },
  { id: 26, label: "Company", category: "Referral", isVisible: false, order: null, width: 'half', required: false },

  // Collection
  { id: 27, label: "Collected At", category: "Collection", isVisible: false, order: null, width: 'half', required: false },
  { id: 28, label: "Collection Date & Time", category: "Collection", isVisible: false, order: null, width: 'half', required: false },
  { id: 29, label: "Dispatch Methods", category: "Collection", isVisible: false, order: null, width: 'half', required: false },
];

const categories = [
  "Basic Info", "Vitals", "Contact Info", "Identification", 
  "Patient Info", "Medical Info", "Billing", "Referral", "Collection"
];
// BLOCK INITIAL DATA CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface CustomizeRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeRegistrationModal({ isOpen, onClose }: CustomizeRegistrationModalProps) {
  const [fields, setFields] = useState<FieldData[]>(initialFieldsData);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const toggleField = (id: number) => {
    setFields(prevFields => {
      const targetField = prevFields.find(f => f.id === id);
      if (!targetField) return prevFields;

      if (targetField.isVisible) {
        const removedOrder = targetField.order;
        return prevFields.map(f => {
          if (f.id === id) {
            return { ...f, isVisible: false, order: null };
          }
          if (f.isVisible && f.order !== null && removedOrder !== null && f.order > removedOrder) {
            return { ...f, order: f.order - 1 };
          }
          return f;
        });
      } else {
        const currentMaxOrder = prevFields.reduce((max, f) => (f.order && f.order > max ? f.order : max), 0);
        return prevFields.map(f => {
          if (f.id === id) {
            return { ...f, isVisible: true, order: currentMaxOrder + 1 };
          }
          return f;
        });
      }
    });
  };

  const handleSelectAll = () => {
    const allVisible = fields.every(f => f.isVisible);
    if (allVisible) {
      setFields(fields.map(f => ({ ...f, isVisible: false, order: null })));
    } else {
      let counter = 1;
      setFields(fields.map(f => ({ ...f, isVisible: true, order: counter++ })));
    }
  };

  const filteredCategories = categories.filter(cat => {
    const catMatches = cat.toLowerCase().includes(searchQuery.toLowerCase());
    const hasFieldMatches = fields.some(f => 
      f.category === cat && f.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return catMatches || hasFieldMatches;
  });

  const getFieldsNc = (category: string) => {
    return fields.filter(f => 
      f.category === category && 
      f.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b border-purple-100 shrink-0"
          style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }}
        >
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-[#9575cd]" />
            <h3 className="font-bold text-slate-700">Customize Registration Fields</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/40 text-slate-600 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 pb-2 space-y-4 shrink-0 bg-white">
          <p className="text-xs text-slate-500">Select which fields to display in the registration form. Unchecked fields will be hidden.</p>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search fields..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#9575cd]/20 text-sm"
            />
            <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              checked={fields.every(f => f.isVisible)}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border-slate-300 text-[#4dd0e1] focus:ring-[#4dd0e1]" 
            />
            <span className="text-sm font-medium text-slate-600">Select All Fields</span>
          </div>
        </div>

        {/* Field Grid */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 min-h-[200px]">
           {filteredCategories.map((category) => {
             const categoryFields = getFieldsNc(category);
             if (categoryFields.length === 0) return null;

             return (
               <div key={category} className="mb-6">
                 <h4 className="text-xs font-bold text-[#9575cd] mb-2 uppercase tracking-wider">{category}</h4>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                   {categoryFields.map((field) => (
                     <div 
                       key={field.id} 
                       className={`
                         bg-white border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:shadow-md transition-all
                         ${field.isVisible ? 'border-cyan-200' : 'border-slate-200'}
                       `}
                     >
                        <div className="flex items-center gap-2.5">
                          <input 
                            type="checkbox" 
                            checked={field.isVisible}
                            onChange={() => toggleField(field.id)}
                            className="w-4 h-4 rounded border-slate-300 text-[#4dd0e1] focus:ring-[#4dd0e1] cursor-pointer" 
                          />
                          
                          {/* Number Badge */}
                          {field.isVisible && (
                            <div className="w-5 h-5 rounded-full bg-[#4dd0e1] text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-in zoom-in-50 duration-200">
                              {field.order}
                            </div>
                          )}
                          
                          <span className={`text-[11px] font-medium transition-colors ${field.isVisible ? 'text-slate-700' : 'text-slate-500'}`}>
                            {field.label}
                          </span>
                        </div>

                        {/* Settings Icon: Centered and Unfilled to show the gear 'hole' */}
                        <button className="p-1 rounded-full bg-cyan-50 text-slate-500 hover:bg-cyan-100 hover:text-slate-600 transition-colors flex items-center justify-center">
                          <Settings size={12} />
                        </button>
                     </div>
                   ))}
                 </div>
               </div>
             );
           })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white font-medium text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #ab47bc, #f06292)' }}
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white font-medium text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #4dd0e1, #29b6f6)' }}
          >
            Apply Changes
          </button>
        </div>

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
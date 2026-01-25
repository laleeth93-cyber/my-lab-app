// FILE: app/components/NewRegistration.tsx
"use client";

// BLOCK IMPORTS OPEN
import React, { useState, useRef, useEffect } from 'react';
import { Users, ReceiptText, SlidersHorizontal, CreditCard, Paperclip, Calendar, X, ChevronDown } from 'lucide-react';
import { FieldData } from '../page';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface NewRegistrationProps {
  onCustomizeClick: () => void;
  onQuotationClick: () => void;
  // Updated prop to accept data
  onBillingClick: (patientDetails: any) => void;
  fields: FieldData[];
}

export default function NewRegistration({ onCustomizeClick, onQuotationClick, onBillingClick, fields }: NewRegistrationProps) {
  
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  
  const [multiSelectValues, setMultiSelectValues] = useState<Record<number, string[]>>({
    29: ['Hard Copy'] 
  });

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (fieldId: number, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleAgeChange = (fieldId: number, part: 'Y' | 'M' | 'D', value: string) => {
    setFormValues(prev => {
      const currentAge = prev[fieldId] || { Y: '', M: '', D: '' };
      return { ...prev, [fieldId]: { ...currentAge, [part]: value } };
    });
  };

  const toggleOption = (fieldId: number, option: string) => {
    setMultiSelectValues(prev => {
      const current = prev[fieldId] || [];
      const newValues = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
      handleInputChange(fieldId, newValues);
      return { ...prev, [fieldId]: newValues };
    });
  };

  const removeOption = (e: React.MouseEvent, fieldId: number, option: string) => {
    e.stopPropagation(); 
    setMultiSelectValues(prev => {
      const newValues = (prev[fieldId] || []).filter(item => item !== option);
      handleInputChange(fieldId, newValues);
      return { ...prev, [fieldId]: newValues };
    });
  };

  // VALIDATION & DATA MAPPING LOGIC
  const handleGoToBilling = () => {
    const visibleFields = fields.filter(f => f.isVisible);
    const missingFields: string[] = [];

    // 1. Validate Required Fields
    visibleFields.forEach(field => {
      if (field.required) {
        if (field.label === 'Patient ID') return; // Skip read-only

        const val = formValues[field.id];
        
        if (field.inputType === 'multi-select') {
           const selected = multiSelectValues[field.id] || [];
           if (selected.length === 0) missingFields.push(field.label);
           return;
        }

        if (field.inputType === 'age') {
          if (!val || (!val.Y && !val.M && !val.D)) missingFields.push(field.label);
          return;
        }

        if (!val || val.toString().trim() === '' || val === 'Select') {
          missingFields.push(field.label);
        }
      }
    });

    if (missingFields.length > 0) {
      alert(`Please fill the following required fields:\n- ${missingFields.join('\n- ')}`);
    } else {
      // 2. Map Data for Billing Modal
      // We map based on fixed IDs from page.tsx (3=First Name, 4=Last Name, etc.)
      const patientDetails = {
        firstName: formValues[3] || '',
        lastName: formValues[4] || '',
        age: formValues[5] || { Y: '', M: '', D: '' },
        gender: formValues[6] || 'Not specified',
        phone: formValues[9] || 'Not specified',
        email: formValues[10] || 'Not specified',
        address: formValues[11] || 'Not specified',
      };
      
      onBillingClick(patientDetails);
    }
  };

  const visibleFields = fields.filter(f => f.isVisible).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-500 h-full flex flex-col">
      <div className="bg-white rounded-[10px] shadow-xl shadow-slate-200/50 h-full w-full mx-auto flex flex-col overflow-hidden border border-slate-100">
        
        {/* Top Action Bar */}
        <div className="p-8 pb-4 bg-white shrink-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-cyan-50 text-[#4dd0e1] shadow-sm">
                <Users size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-700 tracking-tight">New Registration</h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={onQuotationClick}
                className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}
              >
                <ReceiptText size={16} className="opacity-60" />
                Quotation
              </button>

              <button 
                onClick={onCustomizeClick}
                className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(to right, #9d7df0, #f062a4)' }}>
                <SlidersHorizontal size={16} className="opacity-60" />
                Customize registration
              </button>

              <button 
                onClick={handleGoToBilling}
                className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                <CreditCard size={16} className="opacity-60" />
                Go to billing
              </button>
            </div>
          </div>
          <div className="h-[0.5px] w-full" style={{ backgroundColor: 'rgba(77, 208, 225, 0.2)' }}></div>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="w-full min-h-full border-2 border-dashed rounded-lg p-4" style={{ borderColor: 'rgba(77, 208, 225, 0.4)' }}>
             <div className="flex flex-wrap gap-x-4 gap-y-3 items-end pb-24"> 
                {visibleFields.map((field) => (
                  <div key={field.id} className="flex-none relative" style={{ width: field.width }}>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1 truncate" title={field.label}>
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>

                    {field.label === 'Patient ID' ? (
                       <div className="py-0.5"><span className="text-lg font-bold text-[#e65100] tracking-wide">260125003</span></div>
                    ) : (
                      <>
                        {field.inputType === 'text' && (
                          <input type="text" placeholder={field.placeholder} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full px-3 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-700 placeholder:text-slate-400" />
                        )}
                        {field.inputType === 'select' && (
                           <div className="relative w-full">
                             <select onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full px-3 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-700 appearance-none bg-white">
                               <option value="">Select</option>
                               {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                             </select>
                             <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"><ChevronDown size={10} /></div>
                           </div>
                        )}
                        {field.inputType === 'multi-select' && (
                           <div className="relative w-full" ref={dropdownRef}>
                             <div onClick={() => setOpenDropdownId(openDropdownId === field.id ? null : field.id)} className="w-full px-1 py-0.5 min-h-[26px] rounded border border-slate-400 bg-white flex items-center flex-wrap gap-1 cursor-pointer focus-within:ring-2 focus-within:ring-[#4dd0e1]">
                               {(multiSelectValues[field.id] || []).length === 0 && <span className="text-slate-400 text-xs px-2">Select options...</span>}
                               {(multiSelectValues[field.id] || []).map(tag => (
                                 <div key={tag} className="flex items-center gap-1 bg-slate-100 text-slate-700 px-1.5 rounded border border-slate-300 text-[10px] font-medium">
                                   <span>{tag}</span>
                                   <div onClick={(e) => removeOption(e, field.id, tag)} className="cursor-pointer hover:text-red-500 rounded-full p-0.5"><X size={10} /></div>
                                 </div>
                               ))}
                             </div>
                             <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"><ChevronDown size={10} /></div>
                             {openDropdownId === field.id && (
                               <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto animate-in zoom-in-95 duration-100">
                                  {field.options?.map(opt => {
                                    const isSelected = (multiSelectValues[field.id] || []).includes(opt);
                                    return (
                                      <div key={opt} onClick={() => toggleOption(field.id, opt)} className={`px-3 py-2 text-xs cursor-pointer flex items-center justify-between ${isSelected ? 'bg-cyan-50 text-cyan-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                                        <span>{opt}</span>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#4dd0e1]"></div>}
                                      </div>
                                    );
                                  })}
                               </div>
                             )}
                           </div>
                        )}
                        {field.inputType === 'age' && (
                          <div className="flex gap-1">
                            <div className="flex-1 min-w-0"><input type="text" placeholder="Y" onChange={(e) => handleAgeChange(field.id, 'Y', e.target.value)} className="w-full px-1 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" /></div>
                            <div className="flex-1 min-w-0"><input type="text" placeholder="M" onChange={(e) => handleAgeChange(field.id, 'M', e.target.value)} className="w-full px-1 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" /></div>
                            <div className="flex-1 min-w-0"><input type="text" placeholder="D" onChange={(e) => handleAgeChange(field.id, 'D', e.target.value)} className="w-full px-1 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" /></div>
                          </div>
                        )}
                        {field.inputType === 'phone' && (
                           <div className="flex w-full">
                             <select className="w-14 px-1 py-0.5 rounded-l border border-r-0 border-slate-400 text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]"><option>+91</option><option>+1</option></select>
                             <input type="text" placeholder="Number" onChange={(e) => handleInputChange(field.id, e.target.value)} className="flex-1 w-full px-3 py-0.5 rounded-r border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-slate-700 min-w-0" />
                           </div>
                        )}
                        {field.inputType === 'textarea' && (
                           <textarea rows={2} placeholder={field.placeholder} onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full px-3 py-1 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-700 resize-none"></textarea>
                        )}
                        {field.inputType === 'date' && (
                           <div className="relative w-full">
                             <input type="text" placeholder="Select date" defaultValue="24-Jan-2026" onChange={(e) => handleInputChange(field.id, e.target.value)} className="w-full px-3 py-0.5 rounded border border-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-slate-700" />
                             <Calendar size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                           </div>
                        )}
                        {field.inputType === 'file' && (
                          <div className="flex items-center gap-2 w-full">
                            <div className="relative flex-1 min-w-0">
                               <input type="file" className="hidden" id="file-upload" onChange={(e) => handleInputChange(field.id, e.target.files?.[0]?.name)} />
                               <label htmlFor="file-upload" className="w-full flex items-center justify-between px-3 py-0.5 rounded border border-slate-400 text-xs text-slate-700 bg-white cursor-pointer hover:bg-slate-50 transition-all border-dashed whitespace-nowrap overflow-hidden">
                                 <span className="font-medium truncate">{formValues[field.id] ? formValues[field.id] : 'Choose'}</span>
                                 <Paperclip size={14} className="text-[#4dd0e1] shrink-0 ml-2" />
                               </label>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
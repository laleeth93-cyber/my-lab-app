// FILE: app/components/NewRegistration.tsx
"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
import { Users, ReceiptText, SlidersHorizontal, CreditCard, Paperclip, Calendar, Plus } from 'lucide-react';
import { FieldData } from '../page';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface NewRegistrationProps {
  onCustomizeClick: () => void;
  fields: FieldData[];
}

export default function NewRegistration({ onCustomizeClick, fields }: NewRegistrationProps) {
  
  // Sort fields by their 'order' property
  const visibleFields = fields
    .filter(f => f.isVisible)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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
              <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
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

              <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
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
          <div 
            className="w-full min-h-full border-2 border-dashed rounded-lg p-4"
            style={{ borderColor: 'rgba(77, 208, 225, 0.4)' }}
          >
             {/* UPDATED LAYOUT: Flexbox with Wrap
                This allows us to strictly respect fixed pixel widths (70px, 100px, etc.)
                Use gap-4 for consistent spacing between fixed elements.
             */}
             <div className="flex flex-wrap gap-4 items-end">
                {visibleFields.map((field) => (
                  <div 
                    key={field.id} 
                    className="flex-none relative" 
                    style={{ width: field.width }}
                  >
                    
                    {/* Label */}
                    <label className="block text-[13px] font-bold text-slate-700 mb-2 truncate" title={field.label}>
                      {field.label} {field.required && <span className="text-red-400">*</span>}
                    </label>

                    {/* Inputs based on type */}
                    {field.inputType === 'text' && (
                      <input 
                        type="text" 
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-600 placeholder:text-slate-400"
                      />
                    )}

                    {field.inputType === 'select' && (
                       <div className="relative w-full">
                         <select className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-600 appearance-none bg-white">
                           <option>Select</option>
                           {field.options?.map(opt => <option key={opt}>{opt}</option>)}
                         </select>
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                         </div>
                       </div>
                    )}

                    {field.inputType === 'age' && (
                      <div className="flex gap-2">
                        <div className="flex-1 min-w-0">
                          <input type="text" placeholder="Y" className="w-full px-2 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <input type="text" placeholder="M" className="w-full px-2 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <input type="text" placeholder="D" className="w-full px-2 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-center" />
                        </div>
                      </div>
                    )}

                    {field.inputType === 'phone' && (
                       <div className="flex w-full">
                         <select className="w-16 px-1 py-2 rounded-l-lg border border-r-0 border-slate-200 text-sm bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]">
                           <option>+91</option>
                           <option>+1</option>
                         </select>
                         <input 
                           type="text" 
                           placeholder="Number" 
                           className="flex-1 w-full px-3 py-2 rounded-r-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-slate-600 min-w-0"
                         />
                       </div>
                    )}

                    {field.inputType === 'textarea' && (
                       <textarea 
                         rows={3}
                         placeholder={field.placeholder}
                         className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all text-slate-600 resize-none"
                       ></textarea>
                    )}

                    {field.inputType === 'date' && (
                       <div className="relative w-full">
                         <input 
                           type="text" 
                           placeholder="Select date" 
                           defaultValue="24-Jan-2026"
                           className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] text-slate-600"
                         />
                         <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                    )}

                    {field.inputType === 'file' && (
                      <div className="flex items-center gap-2 w-full">
                        <div className="relative flex-1 min-w-0">
                           <input type="file" className="hidden" id="file-upload" />
                           <label htmlFor="file-upload" className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white cursor-pointer hover:bg-slate-50 transition-all border-dashed whitespace-nowrap overflow-hidden">
                             <span className="font-medium truncate">Choose</span>
                             <Paperclip size={16} className="text-[#4dd0e1] shrink-0 ml-2" />
                           </label>
                        </div>
                      </div>
                    )}

                    {/* Add Plus Button for specific select fields */}
                    {(field.label.includes('Doctor') || field.label.includes('Hospital') || field.label.includes('Company') || field.label.includes('Collected At')) && (
                      <div className="absolute -top-1 right-0">
                        <button className="p-0.5 bg-[#4dd0e1] text-white rounded hover:bg-[#26c6da] transition-colors">
                           <Plus size={10} />
                        </button>
                      </div>
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
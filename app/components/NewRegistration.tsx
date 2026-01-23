"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
import { Users, ReceiptText, SlidersHorizontal, CreditCard } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface NewRegistrationProps {
  onCustomizeClick: () => void;
}

export default function NewRegistration({ onCustomizeClick }: NewRegistrationProps) {
  return (
    <div className="animate-in slide-in-from-bottom-2 duration-500 h-full flex flex-col">
      {/* Updates:
          1. Changed 'min-h-[...]' to 'h-full'.
          2. This allows the card to fit exactly into the screen space provided by page.tsx.
      */}
      <div className="bg-white rounded-[10px] shadow-xl shadow-slate-200/50 h-full w-full mx-auto flex flex-col overflow-hidden border border-slate-100">
        
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

        {/* Content Area - Now set to overflow-y-auto to scroll INSIDE the card if needed */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div 
            className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center min-h-[200px]"
            style={{ borderColor: 'rgba(77, 208, 225, 0.4)' }}
          >
            <p className="text-slate-300 italic text-[13px] font-medium capitalize">
              Dash-bordered container ready for form elements...
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
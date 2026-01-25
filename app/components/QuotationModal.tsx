// FILE: app/components/QuotationModal.tsx
"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
import { X, User, TestTube, Search, ShoppingCart, Tag, Send, Calculator } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuotationModal({ isOpen, onClose }: QuotationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Changes:
         1. max-w-lg -> max-w-md (Further reduced width to ~448px)
      */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden flex flex-col m-4 max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div 
          className="px-4 py-3 flex items-center justify-between border-b border-purple-100 shrink-0"
          style={{ background: 'linear-gradient(to right, #e3f2fd, #f3e5f5)' }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1 bg-purple-100 rounded text-[#9575cd]">
               <Calculator size={16} />
            </div>
            <h3 className="font-bold text-slate-700 text-sm">Quotation</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/40 text-slate-600 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content 
            Changes: p-4 -> p-3 (Tighter padding for narrower width)
        */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          
          {/* Section: Patient Information */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-700">
              <User size={16} className="text-[#4dd0e1]" />
              <h4 className="font-bold text-xs">Patient Information</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Patient Name</label>
                <input type="text" placeholder="Name" className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Gender</label>
                <select className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] bg-white">
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Age</label>
                <input type="text" placeholder="Age" className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
              </div>
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Phone</label>
                <input type="text" placeholder="Phone" className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Section: Tests & Packages */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-700">
              <TestTube size={16} className="text-[#4dd0e1]" />
              <h4 className="font-bold text-xs">Tests & Packages</h4>
            </div>

            <div className="flex gap-1.5 mb-3">
               <div className="relative flex-1">
                 <input type="text" placeholder="Search..." className="w-full pl-7 pr-2 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                 <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
               </div>
               <select className="w-20 px-1 py-1 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] bg-white">
                  <option>Tests</option>
                  <option>Pkg</option>
               </select>
               <button className="flex items-center gap-1 px-2.5 py-1 bg-[#66bb6a] text-white text-[10px] font-bold rounded hover:bg-[#4caf50] transition-colors shadow-sm">
                 <ShoppingCart size={12} />
                 Add
               </button>
            </div>

            {/* Cart Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden mb-2">
              <div className="bg-cyan-50/50 flex text-[10px] font-bold text-slate-600 py-1.5 border-b border-slate-200">
                <div className="w-8 px-1 text-center">#</div>
                <div className="flex-1 px-2">Test / Package</div>
                <div className="w-14 px-1 text-right">Price</div>
                <div className="w-10 px-1 text-center">Act</div>
              </div>
              <div className="p-4 text-center text-slate-400 text-[10px] bg-slate-50/20 italic">
                No tests added
              </div>
            </div>
            
            <div className="flex justify-between items-center px-1">
               <span className="text-[11px] font-bold text-slate-600">Total:</span>
               <span className="text-xs font-bold text-slate-800">₹ 0</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Section: Discount */}
          <div className="grid grid-cols-2 gap-2">
             <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Discount (%)</label>
                <div className="flex">
                   <input type="number" placeholder="0" className="w-full px-2 py-1 rounded-l border border-r-0 border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                   <div className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-r text-[10px] text-slate-600 font-medium flex items-center">%</div>
                </div>
             </div>
             <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-500">Discount (₹)</label>
                 <div className="flex">
                   <input type="number" placeholder="0" className="w-full px-2 py-1 rounded-l border border-r-0 border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                   <div className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-r text-[10px] text-slate-600 font-medium flex items-center">₹</div>
                </div>
             </div>
          </div>

          {/* Orange Header/Button Bar */}
          <div className="bg-[#ff9800] text-white px-3 py-1.5 rounded flex items-center gap-2 shadow-sm mt-3 cursor-pointer hover:bg-[#f57c00] transition-colors w-fit">
             <Tag size={12} />
             <span className="text-[10px] font-bold">Apply Discount</span>
          </div>

          {/* Summary */}
          <div className="bg-cyan-50/50 rounded p-3 space-y-1.5 border border-cyan-100">
             <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-bold text-slate-700">₹ 0</span>
             </div>
             <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">Discount:</span>
                <span className="font-bold text-slate-700">₹ 0</span>
             </div>
             <div className="h-px bg-cyan-200/50 my-1"></div>
             <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">Total Amount:</span>
                <span className="font-bold text-slate-800">₹ 0</span>
             </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-0.5">
             <div className="flex items-center gap-1.5 mb-1">
               <div className="w-1 h-2.5 bg-[#4dd0e1] rounded-full"></div>
               <label className="text-[11px] font-bold text-slate-600">Additional Notes</label>
             </div>
             <textarea 
               rows={2}
               placeholder="Notes..."
               className="w-full px-2 py-1.5 rounded border border-slate-300 text-[11px] focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] resize-none"
             ></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 px-4 border-t border-slate-100 bg-white flex justify-end gap-2 shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 rounded text-white font-bold text-[11px] shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #ba68c8, #f06292)' }}
          >
            Close
          </button>
          <button 
            className="flex items-center gap-1.5 px-5 py-1.5 rounded text-white font-bold text-[11px] shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}
          >
            <Send size={12} />
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
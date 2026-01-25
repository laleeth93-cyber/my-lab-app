// FILE: app/components/BillingModal.tsx
"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
// Import our custom RichTextEditor (No more ReactQuill)
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false });

import { X, Calendar, TestTube, Search, ShoppingCart, Tag, CreditCard, Wallet, FileText, Hash, Check, Type } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK TYPES DEFINITION OPEN
interface SimpleFieldData {
  id: number;
  label: string;
  required: boolean;
  isVisible: boolean;
}
// BLOCK TYPES DEFINITION CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData?: {
    firstName: string;
    lastName: string;
    age: { Y: string; M: string; D: string };
    gender: string;
    phone: string;
    email: string;
    address: string;
  };
  fields?: SimpleFieldData[]; 
}

export default function BillingModal({ isOpen, onClose, patientData, fields = [] }: BillingModalProps) {
  if (!isOpen) return null;

  // Payment & Transaction States
  const [paymentModes, setPaymentModes] = useState<string[]>(['Cash']);
  const [transactionIds, setTransactionIds] = useState<Record<string, string>>({});

  // Rich Text Editor States
  const [isNotesEditorOpen, setIsNotesEditorOpen] = useState(false);
  const [notesContent, setNotesContent] = useState('');
  const [tempNotesContent, setTempNotesContent] = useState('');

  // Helper to toggle payment modes
  const togglePaymentMode = (mode: string) => {
    setPaymentModes(prev => {
      if (prev.includes(mode)) {
        return prev.length > 1 ? prev.filter(m => m !== mode) : prev;
      } else {
        return [...prev, mode];
      }
    });
  };

  // Helper to update transaction ID values
  const handleTxidChange = (mode: string, value: string) => {
    setTransactionIds(prev => ({ ...prev, [mode]: value }));
  };

  // Notes handlers
  const handleOpenNotes = () => {
    setTempNotesContent(notesContent); 
    setIsNotesEditorOpen(true);
  };

  const handleSaveNotes = () => {
    setNotesContent(tempNotesContent);
    setIsNotesEditorOpen(false);
  };

  const handleCancelNotes = () => {
    setIsNotesEditorOpen(false);
  };

  const fullName = patientData ? `${patientData.firstName} ${patientData.lastName}`.trim() : 'Not specified';
  
  const ageString = patientData?.age && (patientData.age.Y || patientData.age.M || patientData.age.D)
    ? `${patientData.age.Y || '0'} Y ${patientData.age.M || '0'} M ${patientData.age.D || '0'} D`
    : 'Not specified';

  const isRequired = (id: number) => {
    const field = fields.find(f => f.id === id);
    return field ? (field.required && field.isVisible) : false;
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* LEFT SIDEBAR - Patient Summary */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-700">Billing</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Patient ID</label>
               <div className="text-sm font-bold text-slate-700">260125003</div>
             </div>

             {(isRequired(3) || isRequired(4)) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Name</label>
                 <div className={`text-xs ${fullName === 'Not specified' ? 'text-slate-400 italic' : 'text-slate-700 font-medium'}`}>
                   {fullName}
                 </div>
               </div>
             )}

             {isRequired(5) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Age</label>
                 <div className={`text-xs ${ageString === 'Not specified' ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                   {ageString}
                 </div>
               </div>
             )}

             {isRequired(6) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Gender</label>
                 <div className={`text-xs ${!patientData?.gender ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                   {patientData?.gender || 'Not specified'}
                 </div>
               </div>
             )}

             {isRequired(9) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Phone</label>
                 <div className={`text-xs ${!patientData?.phone ? 'text-slate-400 italic' : 'text-slate-700'}`}>
                   {patientData?.phone || 'Not specified'}
                 </div>
               </div>
             )}

             {isRequired(10) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Email</label>
                 <div className={`text-xs ${!patientData?.email ? 'text-slate-400 italic' : 'text-slate-700 truncate'}`} title={patientData?.email}>
                   {patientData?.email || 'Not specified'}
                 </div>
               </div>
             )}

             {isRequired(11) && (
               <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 block">Address</label>
                 <div className={`text-xs ${!patientData?.address ? 'text-slate-400 italic' : 'text-slate-700 line-clamp-2'}`} title={patientData?.address}>
                   {patientData?.address || 'Not specified'}
                 </div>
               </div>
             )}

             <div className="h-px bg-slate-100 my-2"></div>

             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Date & Time</label>
               <div className="relative">
                  <input type="text" defaultValue="25-01-2026 10:15" className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                  <Calendar size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
               </div>
             </div>

             {/* BLOCK ADDITIONAL NOTES RICH TEXT EDITOR OPEN */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block mb-1">Additional Notes</label>
               <button 
                  onClick={handleOpenNotes}
                  className={`w-full py-1.5 px-3 border border-dashed text-xs rounded transition-colors flex items-center justify-between group
                    ${notesContent ? 'border-cyan-300 bg-cyan-50 text-cyan-700 hover:bg-cyan-100' : 'border-[#4dd0e1] text-[#4dd0e1] bg-cyan-50/30 hover:bg-cyan-50'}
                  `}
               >
                 <span className="truncate pr-2">
                   {notesContent ? (
                      <span className="italic text-cyan-800">
                        {/* Safe HTML render for preview */}
                        <span dangerouslySetInnerHTML={{ __html: notesContent.slice(0, 30) + (notesContent.length > 30 ? '...' : '') }} />
                      </span>
                   ) : 'Click to add notes'}
                 </span>
                 <FileText size={12} className={notesContent ? "text-cyan-600 group-hover:text-cyan-800" : ""} />
               </button>
             </div>
             {/* BLOCK ADDITIONAL NOTES RICH TEXT EDITOR CLOSE */}
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="px-6 py-3 flex items-center justify-between border-b border-purple-100 bg-[#f3e5f5]/30">
            <div className="flex items-center gap-2">
               <div className="p-1.5 bg-purple-100 rounded text-[#9575cd]">
                 <CreditCard size={18} />
               </div>
               <h3 className="font-bold text-slate-700">Billing Details</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
               <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ... Other sections (Tests, Discount, Due Payment) ... */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-700">
                <TestTube size={18} className="text-[#9575cd]" />
                <h4 className="font-bold text-sm">Tests & Packages</h4>
              </div>
              <div className="flex gap-2 mb-4">
                 <div className="relative flex-1">
                   <input type="text" placeholder="Search by test name or test code" className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 </div>
                 <select className="w-24 px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] bg-white">
                    <option>Tests</option>
                    <option>Pkg</option>
                 </select>
                 <button className="flex items-center gap-2 px-4 py-2 bg-[#66bb6a] text-white text-xs font-bold rounded hover:bg-[#4caf50] transition-colors shadow-sm">
                   <ShoppingCart size={14} />
                   Add to Cart
                 </button>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-cyan-50/50 flex text-xs font-bold text-slate-600 py-2 border-b border-slate-200">
                  <div className="w-16 px-4 text-center">Sr No.</div>
                  <div className="flex-1 px-4">Test / Package</div>
                  <div className="w-24 px-4 text-right">Price (₹)</div>
                  <div className="w-20 px-4 text-center">Action</div>
                </div>
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-50/20 italic">
                  No tests added
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full"></div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-700">
                <Tag size={18} className="text-[#9575cd]" />
                <h4 className="font-bold text-sm">Discount</h4>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-3">
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Discount By</label>
                   <select className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] bg-white">
                     <option>Select</option>
                     <option>Referral</option>
                     <option>Coupon</option>
                   </select>
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Reason for Discount</label>
                   <input type="text" placeholder="Enter reason" className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Discount (%)</label>
                   <input type="number" placeholder="0" className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Discount (₹)</label>
                   <input type="number" placeholder="0" className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                 </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-[#ff9800] text-white text-xs font-bold rounded hover:bg-[#f57c00] transition-colors shadow-sm">
                 <Tag size={12} />
                 Apply Discount
              </button>
            </div>

            <div className="h-px bg-slate-100 w-full"></div>

            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-700">
                <Wallet size={18} className="text-[#9575cd]" />
                <h4 className="font-bold text-sm">Due Payment</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Advance Payment (₹)</label>
                   <input type="number" placeholder="0" className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500">Due Amount (₹)</label>
                   <input type="number" placeholder="0.00" readOnly className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-slate-50 text-slate-500" />
                 </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full"></div>

            {/* BLOCK PAYMENT MODES OPEN */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3 text-slate-700">
                   <CreditCard size={18} className="text-[#9575cd]" />
                   <h4 className="font-bold text-sm">Payment</h4>
                </div>
                <label className="text-xs font-semibold text-slate-500 block mb-2">Payment Mode (Split payment enabled)</label>
                <div className="flex gap-4">
                   {['Cash', 'Card', 'UPI', 'Insurance'].map((mode) => {
                     const isSelected = paymentModes.includes(mode);
                     return (
                       <label 
                         key={mode} 
                         onClick={() => togglePaymentMode(mode)}
                         className={`
                          flex items-center gap-2 px-4 py-2 rounded border text-xs cursor-pointer transition-all
                          ${isSelected ? 'border-[#4dd0e1] bg-cyan-50 text-cyan-700 font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                        `}
                       >
                        <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-[#4dd0e1] border-[#4dd0e1]' : 'border-slate-300 bg-white'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                        </div>
                        {mode}
                      </label>
                     );
                   })}
                </div>
              </div>
              {(paymentModes.includes('Card') || paymentModes.includes('UPI')) && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
                   {paymentModes.includes('Card') && (
                     <div className="space-y-1.5">
                       <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                         <CreditCard size={12} className="text-slate-400" />
                         Card Transaction ID
                       </label>
                       <div className="relative">
                         <input type="text" placeholder="Enter Card Txn ID" value={transactionIds['Card'] || ''} onChange={(e) => handleTxidChange('Card', e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] placeholder:text-slate-300" />
                         <Hash size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                     </div>
                   )}
                   {paymentModes.includes('UPI') && (
                     <div className="space-y-1.5">
                       <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                         <Wallet size={12} className="text-slate-400" />
                         UPI Transaction ID
                       </label>
                       <div className="relative">
                         <input type="text" placeholder="Enter UPI Txn ID" value={transactionIds['UPI'] || ''} onChange={(e) => handleTxidChange('UPI', e.target.value)} className="w-full pl-8 pr-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] placeholder:text-slate-300" />
                         <Hash size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                     </div>
                   )}
                </div>
              )}
            </div>
            {/* BLOCK PAYMENT MODES CLOSE */}

             <div className="bg-cyan-50/50 rounded-lg p-4 space-y-2 border border-cyan-100 mt-4">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Subtotal:</span>
                    <span className="font-bold text-slate-700">₹ 0</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Discount:</span>
                    <span className="font-bold text-slate-700">₹ 0</span>
                </div>
                <div className="h-px bg-cyan-200/50 my-1"></div>
                <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800">Total Amount:</span>
                    <span className="font-bold text-slate-900">₹ 0</span>
                </div>
             </div>
          </div>

          <div className="p-4 px-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
            <button onClick={onClose} className="px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(to right, #ba68c8, #f06292)' }}>Cancel</button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
              <FileText size={16} /> Generate Bill
            </button>
          </div>
        </div>

        {/* BLOCK NOTES POPUP MODAL OPEN */}
        {isNotesEditorOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-purple-100 bg-[#f3e5f5]">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm text-[#9575cd]">
                    <Type size={18} />
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg">Additional Notes</h3>
                </div>
                <button onClick={handleCancelNotes} className="p-1 rounded-full hover:bg-white/60 text-slate-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body with Rich Text Editor */}
              <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col min-h-[400px]">
                {/* CRITICAL FIX: Replaced ReactQuill with our RichTextEditor */}
                <RichTextEditor 
                  value={tempNotesContent} 
                  onChange={setTempNotesContent} 
                  placeholder="Start typing your notes here..." 
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 px-6 border-t bg-slate-50 flex justify-end gap-3">
                <button onClick={handleCancelNotes} className="px-5 py-2 rounded-lg text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">Discard</button>
                <button onClick={handleSaveNotes} className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(to right, #66bb6a, #43a047)' }}>
                  <Check size={16} /> Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
        {/* BLOCK NOTES POPUP MODAL CLOSE */}

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
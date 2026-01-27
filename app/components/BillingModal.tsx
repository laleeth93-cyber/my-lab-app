// FILE: app/components/BillingModal.tsx
"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { X, Calendar, Search, FileText, Type, Info, Trash2, Plus, CreditCard } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK DYNAMIC IMPORTS OPEN
interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = dynamic<RichTextEditorProps>(
  () => import('./RichTextEditor').then((mod: any) => mod.default), 
  { 
    ssr: false,
    loading: () => <div className="h-64 bg-slate-50 flex items-center justify-center text-slate-400">Loading Editor...</div>
  }
);
// BLOCK DYNAMIC IMPORTS CLOSE

// BLOCK INTERFACES OPEN
interface SimpleFieldData {
  id: number;
  label: string;
  required: boolean;
  isVisible: boolean;
}

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
// BLOCK INTERFACES CLOSE

// BLOCK COMPONENT DEFINITION OPEN
export default function BillingModal({ isOpen, onClose, patientData, fields = [] }: BillingModalProps) {
  if (!isOpen) return null;

  // UI States
  const [isNotesEditorOpen, setIsNotesEditorOpen] = useState(false);
  const [notesContent, setNotesContent] = useState('');
  const [tempNotesContent, setTempNotesContent] = useState('');
  const [activeTab, setActiveTab] = useState('Tests/Packages');

  // Billing States
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [discountBy, setDiscountBy] = useState('');
  const [discountReason, setDiscountReason] = useState('');
  const [isDuePayment, setIsDuePayment] = useState(false);
  const [advancePaid, setAdvancePaid] = useState('');
  
  // Payment Mode State (Array for checkboxes)
  const [selectedModes, setSelectedModes] = useState<string[]>(['Cash']);
  const [paymentDetails, setPaymentDetails] = useState<Record<string, { amount: string, txnId: string }>>({
    'Cash': { amount: '0', txnId: '-' },
    'UPI': { amount: '0', txnId: '' },
    'Card': { amount: '0', txnId: '' }
  });

  const handleModeToggle = (mode: string) => {
    setSelectedModes(prev => {
      if (prev.includes(mode)) {
        return prev.filter(m => m !== mode);
      } else {
        return [...prev, mode];
      }
    });
  };

  const handlePaymentDetailChange = (mode: string, field: 'amount' | 'txnId', value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [mode]: { ...prev[mode], [field]: value }
    }));
  };

  // Notes Handlers
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

  const fullName = patientData ? `${patientData.firstName} ${patientData.lastName}`.trim() : 'Lalith Kumar';
  
  // Format age string
  const ageString = patientData?.age && (patientData.age.Y || patientData.age.M || patientData.age.D)
    ? `${patientData.age.Y || '0'} Y ${patientData.age.M || '0'} M ${patientData.age.D || '0'} D`
    : '31 year';

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Main Modal Container */}
      <div className="bg-white w-full max-w-[1200px] rounded-lg shadow-xl overflow-hidden flex flex-col h-[95vh] animate-in zoom-in-95 duration-200">
        
        {/* HEADER BLOCK */}
        <div 
          className="px-6 py-3 border-b border-purple-100 flex items-center justify-between shrink-0"
          style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }}
        >
           <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/40 rounded text-[#9575cd]">
                 <CreditCard size={18} />
              </div>
              <h3 className="font-bold text-slate-700 text-base">Billing</h3>
           </div>
           <button 
             onClick={onClose} 
             className="p-1 rounded-full hover:bg-white/40 text-slate-600 hover:text-red-500 transition-colors"
           >
              <X size={20} />
           </button>
        </div>

        {/* Body Content (Flex Row) */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* LEFT SIDEBAR - Patient Details */}
          <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto p-5">
             
             <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-400 underline mb-3 cursor-pointer">Patient Details</h3>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">{fullName}</h2>
                <p className="text-sm text-slate-500 mt-0.5">260128001</p>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                   <label className="text-xs text-slate-400 block mb-0.5">Gender</label>
                   <p className="text-sm font-medium text-slate-700 capitalize">{patientData?.gender || 'male'}</p>
                </div>
                <div>
                   <label className="text-xs text-slate-400 block mb-0.5">Age</label>
                   <p className="text-sm font-medium text-slate-700">{ageString}</p>
                </div>
             </div>

             <div className="mb-6">
                <label className="text-xs text-slate-400 block mb-0.5">Contact Number</label>
                <p className="text-sm font-medium text-slate-700">{patientData?.phone || 'Not specified'}</p>
             </div>

             <div className="h-px bg-slate-100 w-full mb-6"></div>

             <div className="mb-4">
                <label className="text-xs text-slate-400 block mb-1.5">Billing Date</label>
                <div className="relative">
                   <input 
                      type="datetime-local" 
                      defaultValue="2026-01-28T01:27" 
                      className="w-full px-3 py-2 rounded border border-slate-300 text-sm text-slate-700 focus:outline-none focus:border-slate-400" 
                   />
                </div>
             </div>

             <button 
               onClick={handleOpenNotes}
               className="w-full py-2 px-3 border border-slate-300 rounded text-sm text-slate-600 font-medium flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
             >
               <Plus size={16} /> Add Note on Bill
             </button>
          </div>

          {/* RIGHT CONTENT - Main Billing Area */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden">
             
             {/* 1. TOP TABLE SECTION */}
             <div className="flex-1 overflow-y-auto border-b border-slate-200">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200 w-16">Sr No.</th>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200">Test / Package</th>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200 w-24">Price</th>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200 w-24">Discount</th>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200 w-20 text-center">
                            <span className="flex items-center gap-1"><input type="checkbox" className="rounded border-slate-300" /> Urgent</span>
                         </th>
                         <th className="py-2.5 px-4 text-xs font-semibold text-slate-600 border-b border-slate-200 w-20 text-center">Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      {/* Empty State */}
                      <tr>
                         <td colSpan={6} className="h-48 text-center align-middle">
                            <div className="flex flex-col items-center justify-center text-slate-300">
                               <div className="w-16 h-16 mb-2 bg-slate-50 rounded-full flex items-center justify-center">
                                  <div className="w-10 h-8 border-2 border-slate-200 border-dashed rounded"></div>
                               </div>
                               <span className="text-sm font-medium">No data</span>
                            </div>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>

             {/* 2. MIDDLE CONTROLS SECTION */}
             <div className="p-4 border-b border-slate-200 bg-white shrink-0">
                <div className="flex items-center justify-between">
                   
                   {/* Block 1: Search & Type */}
                   <div className="flex items-center gap-3">
                      <div className="relative w-80">
                         <input 
                            type="text" 
                            placeholder="Search by test name or test code" 
                            className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400"
                         />
                         <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                      
                      <select className="px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none bg-white min-w-[100px]">
                         <option>Tests</option>
                         <option>Packages</option>
                      </select>
                   </div>

                   {/* Block 2: Toggles */}
                   <div className="flex bg-slate-100 rounded p-1 gap-1">
                      <button 
                         onClick={() => setActiveTab('Tests/Packages')}
                         className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'Tests/Packages' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         Tests/Packages
                      </button>
                      <button 
                         onClick={() => setActiveTab('Other Charges')}
                         className={`px-4 py-1.5 rounded text-xs font-medium transition-all ${activeTab === 'Other Charges' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                         Other Charges
                      </button>
                   </div>
                   
                </div>
             </div>

             {/* 3. BOTTOM BILLING GRID */}
             <div className="p-4 bg-white shrink-0 h-[320px] overflow-y-auto">
                <div className="grid grid-cols-12 gap-8 h-full">
                   
                   {/* Column 1: Discount Info */}
                   <div className="col-span-4 space-y-4 border-r border-slate-100 pr-4">
                      <div className="space-y-1">
                         <label className="text-xs text-slate-600 font-medium">Discount(%) (Optional)</label>
                         <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-slate-400" placeholder="0" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-slate-600 font-medium">Discount(₹) (Optional)</label>
                         <input type="number" value={discountAmount} onChange={(e) => setDiscountAmount(e.target.value)} className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-slate-400" placeholder="0" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-slate-600 font-medium">Discounted By <span className="text-slate-400 font-normal">(Optional)</span></label>
                         <select value={discountBy} onChange={(e) => setDiscountBy(e.target.value)} className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-slate-400 text-slate-500 bg-white">
                            <option value="">Select a person</option>
                            <option value="Dr. Smith">Dr. Smith</option>
                         </select>
                      </div>
                      <div className="space-y-1">
                         <label className="text-xs text-slate-600 font-medium">Reason of Discount <span className="text-slate-400 font-normal">(Optional)</span></label>
                         <textarea value={discountReason} onChange={(e) => setDiscountReason(e.target.value)} rows={2} className="w-full px-3 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-slate-400 resize-none" placeholder="Enter Reason of Discount"></textarea>
                      </div>
                   </div>

                   {/* Column 2: Payment & Due */}
                   <div className="col-span-4 space-y-5 border-r border-slate-100 pr-4">
                      <div className="flex items-center gap-2">
                         <input 
                            type="checkbox" 
                            id="duePayment" 
                            checked={isDuePayment} 
                            onChange={(e) => setIsDuePayment(e.target.checked)} 
                            className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-0" 
                         />
                         <label htmlFor="duePayment" className="text-sm text-slate-700 font-medium cursor-pointer">Due Payment</label>
                      </div>

                      <div className="space-y-1">
                         <label className="text-xs text-slate-600 font-medium flex items-center gap-1">
                            Advance Paid <Info size={12} className="text-slate-400" />
                         </label>
                         <input type="number" value={advancePaid} onChange={(e) => setAdvancePaid(e.target.value)} className="w-full px-3 py-2 rounded border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-slate-400" placeholder="0" />
                      </div>

                      <div className="pt-2">
                         <label className="text-xs text-slate-800 font-bold mr-2">Due Amount</label>
                         <span className="inline-block px-2 py-0.5 bg-red-50 text-red-500 text-xs font-bold rounded border border-red-100">₹0.00</span>
                      </div>
                   </div>

                   {/* Column 3: Summary & Payment Modes */}
                   <div className="col-span-4 flex flex-col h-full">
                      {/* Summary Block */}
                      <div className="space-y-3 pb-4 border-b border-slate-200">
                         <h4 className="text-xs font-bold text-slate-800 mb-2">Summary</h4>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Amount</span>
                            <span className="font-medium text-slate-800">₹0.00</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Discount</span>
                            <span className="font-medium text-slate-800">- ₹0.00</span>
                         </div>
                         <div className="flex justify-between text-base pt-2">
                            <span className="font-bold text-slate-800">Total Amount</span>
                            <span className="font-bold text-slate-900">₹0.00</span>
                         </div>
                      </div>

                      {/* Payment Modes Block */}
                      <div className="pt-4 flex-1 overflow-auto">
                         <h4 className="text-xs font-bold text-slate-800 mb-2">Payment Modes</h4>
                         <div className="flex gap-4 mb-3">
                            {['Cash', 'UPI', 'Card'].map(mode => (
                               <label key={mode} className="flex items-center gap-2 cursor-pointer">
                                  <input 
                                     type="checkbox" 
                                     checked={selectedModes.includes(mode)}
                                     onChange={() => handleModeToggle(mode)}
                                     className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0" 
                                  />
                                  <span className="text-sm text-slate-700">{mode}</span>
                               </label>
                            ))}
                         </div>

                         {/* Dynamic Payment Inputs Table */}
                         {selectedModes.length > 0 && (
                            <div className="border border-slate-200 rounded overflow-hidden">
                               <div className="grid grid-cols-[80px_1fr_1fr] bg-slate-50 text-[10px] font-bold text-slate-600 py-1.5 px-2 border-b border-slate-200">
                                  <div>Mode</div>
                                  <div className="px-2">Paid Amount</div>
                                  <div className="px-2">Transaction ID</div>
                               </div>
                               {selectedModes.map(mode => (
                                  <div key={mode} className="grid grid-cols-[80px_1fr_1fr] py-1.5 px-2 border-b border-slate-100 last:border-0 items-center">
                                     <div className="text-xs font-medium text-slate-700">{mode}</div>
                                     <div className="px-1">
                                        <input 
                                           type="text" 
                                           value={paymentDetails[mode]?.amount}
                                           onChange={(e) => handlePaymentDetailChange(mode, 'amount', e.target.value)}
                                           className="w-full px-2 py-1 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-400"
                                        />
                                     </div>
                                     <div className="px-1">
                                        <input 
                                           type="text" 
                                           value={paymentDetails[mode]?.txnId}
                                           placeholder={mode === 'Cash' ? '-' : 'Transaction ID'}
                                           disabled={mode === 'Cash'}
                                           onChange={(e) => handlePaymentDetailChange(mode, 'txnId', e.target.value)}
                                           className="w-full px-2 py-1 rounded border border-slate-300 text-xs focus:outline-none focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-400"
                                        />
                                     </div>
                                  </div>
                               ))}
                            </div>
                         )}
                      </div>
                   </div>

                </div>
             </div>

          </div>
        </div>

        {/* Footer Actions - UPDATED TO SAVE & GENERATE BILL */}
        <div className="p-3 bg-white border-t border-slate-200 flex justify-end gap-3 shrink-0">
           <button 
             className="px-6 py-2 rounded text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
             style={{ background: 'linear-gradient(to right, #ba68c8, #f06292)' }}
           >
              Save
           </button>
           <button 
             className="px-6 py-2 rounded text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
             style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}
           >
              Generate Bill
           </button>
        </div>

        {/* NOTES POPUP MODAL */}
        {isNotesEditorOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white w-full max-w-4xl h-[600px] rounded-lg shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
              <div 
                className="px-6 py-4 flex items-center justify-between shrink-0 rounded-t-lg"
                style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white/40 rounded text-[#9575cd]">
                    <Type size={18} />
                  </div>
                  <h3 className="font-bold text-slate-700 text-lg">Additional Note</h3>
                </div>
                <button onClick={handleCancelNotes} className="p-1 rounded-full hover:bg-white/40 text-slate-600 hover:text-red-500 transition-colors"><X size={20} /></button>
              </div>
              <div className="flex-1 bg-white relative flex flex-col min-h-0">
                <RichTextEditor value={tempNotesContent} onChange={setTempNotesContent} placeholder="Start typing your note here..." />
              </div>
              <div className="p-4 px-6 border-t border-slate-200 bg-white flex justify-end gap-3 shrink-0 rounded-b-lg">
                <button onClick={handleCancelNotes} className="px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(to right, #ba68c8, #f06292)' }}>Cancel</button>
                <button onClick={handleSaveNotes} className="px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95" style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>Save Note</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
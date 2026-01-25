// FILE: app/components/BillingModal.tsx
"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import { X, Calendar, TestTube, Search, ShoppingCart, Tag, CreditCard, Wallet, FileText } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface BillingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BillingModal({ isOpen, onClose }: BillingModalProps) {
  if (!isOpen) return null;

  const [paymentMode, setPaymentMode] = useState('Cash');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* LEFT SIDEBAR - Patient Summary */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-700">Billing</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {/* Patient ID */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Patient ID</label>
               <div className="text-sm font-bold text-slate-700">Auto-generated</div>
             </div>

             {/* Name */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Name</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             {/* Age */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Age</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             {/* Gender */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Gender</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             {/* Phone */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Phone</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             {/* Email */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Email</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             {/* Address */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Address</label>
               <div className="text-xs text-slate-400 italic">Not specified</div>
             </div>

             <div className="h-px bg-slate-100 my-2"></div>

             {/* Date & Time */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Date & Time</label>
               <div className="relative">
                  <input type="text" defaultValue="25-01-2026 10:15" className="w-full px-3 py-1.5 rounded border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#4dd0e1]" />
                  <Calendar size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
               </div>
             </div>

             {/* Additional Notes */}
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-500 block">Additional Notes</label>
               <button className="w-full py-1.5 px-3 border border-dashed border-[#4dd0e1] text-[#4dd0e1] text-xs rounded bg-cyan-50/30 hover:bg-cyan-50 transition-colors flex items-center justify-between">
                 <span>Click to add notes</span>
                 <FileText size={12} />
               </button>
             </div>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          
          {/* Header */}
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

          {/* Scrollable Form Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Section: Tests & Packages */}
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

              {/* Table */}
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

            {/* Section: Discount */}
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

            {/* Section: Due Payment */}
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

            {/* Section: Payment */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-700">
                 <CreditCard size={18} className="text-[#9575cd]" />
                 <h4 className="font-bold text-sm">Payment</h4>
              </div>
              <label className="text-xs font-semibold text-slate-500 block mb-2">Payment Mode</label>
              <div className="flex gap-4">
                 {['Cash', 'Card', 'UPI', 'Insurance'].map((mode) => (
                   <label key={mode} className={`
                      flex items-center gap-2 px-4 py-2 rounded border text-xs cursor-pointer transition-all
                      ${paymentMode === mode ? 'border-[#4dd0e1] bg-cyan-50 text-cyan-700 font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
                   `}>
                      <input 
                        type="radio" 
                        name="paymentMode" 
                        value={mode}
                        checked={paymentMode === mode}
                        onChange={() => setPaymentMode(mode)}
                        className="hidden" 
                      />
                      {paymentMode === mode ? <div className="w-3 h-3 rounded-full bg-[#4dd0e1] flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div> : <div className="w-3 h-3 rounded-full border border-slate-300"></div>}
                      {mode}
                   </label>
                 ))}
              </div>
            </div>
            
            {/* Summary Section */}
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

          {/* Footer */}
          <div className="p-4 px-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(to right, #ba68c8, #f06292)' }}
            >
              Cancel
            </button>
            <button 
              className="flex items-center gap-2 px-6 py-2 rounded-[5px] text-white font-bold text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}
            >
              <FileText size={16} />
              Generate Bill
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
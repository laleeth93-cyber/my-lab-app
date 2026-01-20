"use client";

import React, { useState } from 'react';
import { Menu, X, Home, Users, TestTube, FileText, Settings, LogOut, Bell, Search, ChevronDown, ChevronUp } from 'lucide-react';
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  // This new line tracks which page is active
  const [activeView, setActiveView] = useState('dashboard');
  const colors = {
    purple: "#9575cd",
    cyan: "#4dd0e1",
    blue: "#64b5f6",
    pink: "#f06292",
    background: "#eceff1",
    darkText: "#263238",
    mediumText: "#455a64",
    lightText: "#607d8b" // Added this to fix the error
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#eceff1]">
      
      {/* BLOCK HEADER OPEN */}
      <header 
        className="h-16 flex items-center justify-between px-6 shadow-sm border-b shrink-0 z-50"
        style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }}
      >
        <div className="flex items-center gap-4 min-w-fit">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-white/20 transition hover:bg-white/40"
            style={{ color: '#9575cd' }}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <TestTube size={24} style={{ color: '#9575cd' }} />
            <h1 className="text-lg font-bold" style={{ color: '#f06292' }}>MediLab Pro</h1>
          </div>
        </div>

        <div className="flex-1 max-w-xs relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full py-1.5 px-4 pr-10 rounded-full border bg-white/80 text-sm focus:outline-none focus:ring-2 transition"
            style={{ borderColor: 'rgba(77,208,225,0.4)', color: '#455a64' }} 
          />
          <span className="absolute right-4 top-2 text-purple-400">
            <Search size={16} style={{ color: '#9575cd' }} />
          </span>
        </div>

        <div className="flex items-center gap-4 min-w-fit">
          <div className="hidden lg:flex items-center gap-2 text-slate-700">
             <span className="font-semibold text-sm">Metropolitan Diagnostic Center</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative p-2 rounded-lg bg-purple-200/30" style={{ color: '#9575cd' }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white font-bold"
                    style={{ background: '#f06292' }}>3</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 rounded-full pl-1 pr-3 py-1 shadow-sm border">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
                   style={{ background: 'linear-gradient(to bottom right, #9575cd, #f06292)' }}>JD</div>
              <span className="text-xs font-medium text-slate-700">Dr. John Doe</span>
            </div>
          </div>
        </div>
      </header>
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1 overflow-hidden"> 
      {/* This 'flex-1 overflow-hidden' is the key to fixing the sidebar */}
        {/* BLOCK SIDEBAR OPEN */}
        <aside 
          className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col shadow-md border-r bg-white h-full overflow-y-auto shrink-0 z-40`}
          style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }}
        >
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-3">
              
              {/* Dashboard Link */}
              <li onClick={() => setActiveView('dashboard')}
                  className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer transition-all hover:bg-white/50`}
                  style={{ 
                    backgroundColor: activeView === 'dashboard' ? 'rgba(149, 117, 205, 0.15)' : 'transparent', 
                    color: activeView === 'dashboard' ? '#9575cd' : '#455a64' 
                  }}>
                <Home size={20} />
                {isSidebarOpen && <span className="font-bold text-sm uppercase">Dashboard</span>}
              </li>

              {/* New Registration Link */}
              <li onClick={() => setActiveView('registration')}
                  className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer transition-all hover:bg-white/50`}
                  style={{ 
                    backgroundColor: activeView === 'registration' ? 'rgba(149, 117, 205, 0.15)' : 'transparent', 
                    color: activeView === 'registration' ? '#9575cd' : '#455a64' 
                  }}>
                <Users size={20} />
                {isSidebarOpen && <span className="font-bold text-sm uppercase">New Registration</span>}
              </li>

              {/* Other menu items... (Keep your existing Result Entry and Patient List here) */}
              <li className="flex items-center p-2.5 text-[#455a64] opacity-50 cursor-not-allowed">
                <FileText size={20} />
                {isSidebarOpen && <span className="ml-3 text-sm font-semibold uppercase">Result Entry</span>}
              </li>
            </ul>
          </nav>
        </aside>
        {/* BLOCK SIDEBAR CLOSE */}
        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-y-auto h-full bg-[#eceff1]">
          <div className="max-w-5xl mx-auto pb-20">
            
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#263238]">Patient Registration</h2>
                <p className="text-[#607d8b] text-sm">Create a new laboratory file for a patient.</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#9575cd] uppercase tracking-widest">Reg No:</span>
                <p className="text-lg font-mono font-bold text-[#455a64]">MLP-2026-0001</p>
              </div>
            </div>

            {/* Registration Form Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-white overflow-hidden">
              
              {/* Form Section: Personal Information */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-[#9575cd]">
                  <Users size={18} />
                  <h3 className="font-bold uppercase text-xs tracking-wider">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Full Name <span className="text-[#f06292]">*</span></label>
                    <input type="text" placeholder="Enter patient's full name" 
                      className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none transition-all"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Gender <span className="text-[#f06292]">*</span></label>
                    <select className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Age / DOB <span className="text-[#f06292]">*</span></label>
                    <input type="text" placeholder="e.g. 25Y or 12/05/1998" 
                      className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Mobile Number</label>
                    <input type="tel" placeholder="+91 00000 00000" 
                      className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Email Address</label>
                    <input type="email" placeholder="patient@example.com" 
                      className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }} />
                  </div>
                </div>
              </div>

              {/* Form Section: Referral & Clinical */}
              <div className="p-6 bg-slate-50/50 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-[#4dd0e1]">
                  <Settings size={18} />
                  <h3 className="font-bold uppercase text-xs tracking-wider">Clinical Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Referring Doctor</label>
                    <input type="text" placeholder="Self / Dr. Name" 
                      className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#607d8b] mb-1 uppercase">Sample Collection Point</label>
                    <select className="w-full p-2.5 rounded-lg border text-sm focus:ring-2 outline-none"
                      style={{ borderColor: 'rgba(77,208,225,0.4)' }}>
                      <option>Main Lab (In-house)</option>
                      <option>Home Collection</option>
                      <option>Referral Center</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Section: Test Selection Selection */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-[#9575cd]">
                  <TestTube size={18} />
                  <h3 className="font-bold uppercase text-xs tracking-wider">Test Selection</h3>
                </div>
                <div className="border rounded-xl p-4 min-h-[100px] flex flex-wrap gap-2 mb-4 bg-gray-50 border-dashed"
                     style={{ borderColor: 'rgba(149,117,205,0.3)' }}>
                  <p className="text-xs text-gray-400 italic">Selected tests will appear here...</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['CBC', 'Lipid Profile', 'HbA1c', 'TSH', 'Urine Routine', 'Bilirubin', 'Creatinine', 'Sugar F/PP'].map((test) => (
                    <button key={test} className="p-2 border rounded-lg text-xs font-bold text-[#455a64] hover:bg-purple-50 transition-all text-left">
                      + {test}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="p-6 bg-gray-50 flex justify-end gap-3">
                <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#607d8b] hover:bg-gray-200 transition-all">
                  Cancel
                </button>
                <button className="px-8 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all transform hover:scale-105"
                  style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                  Register & Generate Invoice
                </button>
              </div>

            </div>
          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}
      </div>
    </div>
  );
}
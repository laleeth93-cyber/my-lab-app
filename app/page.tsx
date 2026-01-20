"use client";

import React, { useState } from 'react';
import { Menu, X, Home, Users, TestTube, FileText, Settings, LogOut, Bell, Search, ChevronDown, ChevronUp } from 'lucide-react';
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
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
              
              {/* Dashboard */}
              <li className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer bg-white/40 shadow-sm`}
                  style={{ color: '#9575cd' }}>
                <Home size={20} />
                {isSidebarOpen && <span className="font-bold text-sm uppercase">Dashboard</span>}
              </li>

              {/* General Items */}
              {[
                { id: 'reg', icon: <Users size={20}/>, label: 'New Registration' },
                { id: 'entry', icon: <FileText size={20}/>, label: 'Result Entry' },
                { id: 'list', icon: <Users size={20}/>, label: 'Patient List' },
              ].map((item) => (
                <li key={item.id} className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer transition-all hover:bg-white/50 text-[#455a64]`}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="font-semibold text-sm whitespace-nowrap uppercase tracking-tight">{item.label}</span>}
                </li>
              ))}

              {/* Test Dropdown */}
              <div className="mt-1">
                <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, test: !prev.test }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <TestTube size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap uppercase tracking-tight">Test</span>}
                  </div>
                  {isSidebarOpen && (openMenus.test ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </li>
                {isSidebarOpen && openMenus.test && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-purple-200">
                    {['Tests', 'Specimen & Formats', 'Parameters', 'Templates', 'Packages'].map((sub) => (
                      <li key={sub} className="p-2 text-[11px] font-bold text-slate-500 hover:text-[#9575cd] cursor-pointer pl-4 uppercase">{sub}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Setup Dropdown */}
              <div className="mt-1">
                <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, setup: !prev.setup }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap uppercase tracking-tight">Setup</span>}
                  </div>
                  {isSidebarOpen && (openMenus.setup ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </li>
                {isSidebarOpen && openMenus.setup && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-cyan-200">
                    {['Reports', 'UOM', 'Multivalues', 'Vacutainer', 'Doctors', 'Department'].map((sub) => (
                      <li key={sub} className="p-2 text-[11px] font-bold text-slate-500 hover:text-[#4dd0e1] cursor-pointer pl-4 uppercase">{sub}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Management Dropdown */}
              <div className="mt-1">
                <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, mgmt: !prev.mgmt }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <Users size={20} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap uppercase tracking-tight">Management</span>}
                  </div>
                  {isSidebarOpen && (openMenus.mgmt ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </li>
                {isSidebarOpen && openMenus.mgmt && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-pink-200">
                    {['Referral List', 'Manage Users', 'Processing Lab'].map((sub) => (
                      <li key={sub} className="p-2 text-[11px] font-bold text-slate-500 hover:text-[#f06292] cursor-pointer pl-4 uppercase">{sub}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Profile */}
              <li className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 mt-1 rounded-lg cursor-pointer transition-all hover:bg-white/50 text-[#455a64] font-semibold text-sm uppercase`}>
                <FileText size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span>Lab Profile</span>}
              </li>

            </ul>
          </nav>

          <div className="p-4 border-t border-purple-100 bg-white/20">
             <div className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2 rounded-lg cursor-pointer hover:bg-red-50 text-[#f06292]`}>
               <LogOut size={20} />
               {isSidebarOpen && <span className="text-sm font-bold uppercase">Logout</span>}
             </div>
          </div>
        </aside>
        {/* BLOCK SIDEBAR CLOSE */}
        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold" style={{ color: '#263238' }}>Good Morning, Dr. John Doe</h2>
              <p style={{ color: '#607d8b' }}>Here is what's happening in the lab today.</p>
            </div>

            {/* Status Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Total Patients */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 transition-transform hover:scale-105" style={{ borderBottomColor: '#9575cd' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-purple-50" style={{ color: '#9575cd' }}>
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-600">+12%</span>
                </div>
                <h3 className="text-sm font-medium" style={{ color: '#607d8b' }}>Total Patients</h3>
                <p className="text-2xl font-bold" style={{ color: '#263238' }}>1,284</p>
              </div>

              {/* Card 2: Tests Completed (Success Green) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 transition-transform hover:scale-105" style={{ borderBottomColor: '#81c784' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-green-50" style={{ color: '#81c784' }}>
                    <TestTube size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-600">Stable</span>
                </div>
                <h3 className="text-sm font-medium" style={{ color: '#607d8b' }}>Tests Completed</h3>
                <p className="text-2xl font-bold" style={{ color: '#263238' }}>856</p>
              </div>

              {/* Card 3: Pending Results (Warning Orange) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 transition-transform hover:scale-105" style={{ borderBottomColor: '#ffb74d' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-orange-50" style={{ color: '#ffb74d' }}>
                    <FileText size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-600">Priority</span>
                </div>
                <h3 className="text-sm font-medium" style={{ color: '#607d8b' }}>Pending Results</h3>
                <p className="text-2xl font-bold" style={{ color: '#263238' }}>42</p>
              </div>

              {/* Card 4: Urgent Alerts (Pink) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 transition-transform hover:scale-105" style={{ borderBottomColor: '#f06292' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-pink-50" style={{ color: '#f06292' }}>
                    <Bell size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-100 text-pink-600">Action</span>
                </div>
                <h3 className="text-sm font-medium" style={{ color: '#607d8b' }}>Urgent Alerts</h3>
                <p className="text-2xl font-bold" style={{ color: '#263238' }}>07</p>
              </div>

            </div>

            {/* Placeholder for future sections */}
            <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-100 flex items-center justify-center min-h-[300px]">
              <p style={{ color: '#607d8b' }}>Charts and Detailed Logs will appear here</p>
            </div>

          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}
      </div>
    </div>
  );
}
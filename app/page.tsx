"use client";

import React, { useState } from 'react';
import { Menu, X, Home, Users, TestTube, FileText, Settings, LogOut, Bell, Search } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.background }}>
      
      {/* BLOCK HEADER OPEN */}
      <header 
        className="h-16 flex items-center justify-between px-6 shadow-sm border-b sticky top-0 z-50 gap-4"
        style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }} // Gradient from Page 1 of PDF [cite: 18]
      >
        {/* Left Side: Menu & Logo */}
        <div className="flex items-center gap-4 min-w-fit">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-blue-200/30 transition hover:bg-white/40"
            style={{ color: '#9575cd' }} // Purple Icon [cite: 20]
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <TestTube size={24} style={{ color: '#9575cd' }} /> {/* Logo Icon [cite: 19] */}
            <h1 className="text-lg font-bold" style={{ color: '#f06292' }}>MediLab Pro</h1> {/* Pink Logo Text [cite: 19] */}
          </div>
        </div>

        {/* Center: Search Bar */}
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
        {/* Right Side: Lab Name & User Profile */}
        <div className="flex items-center gap-6 min-w-fit">
          <div className="hidden lg:flex items-center gap-2 text-slate-700">
             <div className="p-1.5 bg-slate-200/50 rounded shadow-inner">🏥</div>
             <span className="font-semibold text-sm">Metropolitan Diagnostic Center</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Icons with Badges */}
            <div className="relative p-2 rounded-lg bg-purple-200/30" style={{ color: '#9575cd' }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] text-white font-bold"
                    style={{ background: 'linear-gradient(to bottom, #f06292, #d81b60)' }}>3</span> {/* Pink Badge [cite: 38] */}
            </div>
            
            <button className="p-2 rounded-lg bg-purple-200/30 text-slate-600">
              <Settings size={20} style={{ color: '#455a64' }} />
            </button>

            {/* User Profile Capsule */}
            <div className="flex items-center gap-2 bg-white/90 rounded-full pl-1 pr-3 py-1 shadow-sm border border-white">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                   style={{ background: 'linear-gradient(to bottom right, #9575cd, #f06292)' }}> {/* Avatar Gradient [cite: 39] */}
                JD
              </div>
              <span className="text-sm font-medium text-slate-700">Dr. John Doe</span>
              <Settings size={14} className="text-slate-400" />
            </div>
          </div>
        </div>
      </header>
      {/* BLOCK HEADER CLOSE  */}

      <div className="flex flex-1 overflow-hidden">
        {/* BLOCK SIDEBAR OPEN */}
        <aside 
          className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col shadow-md border-r h-[calc(100vh-64px)] overflow-y-auto bg-white overflow-x-hidden`}
          style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }}
        >
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-3">
              {/* Primary Links */}
              {[
                { id: 'dash', icon: <Home size={20}/>, label: 'Dashboard', active: true },
                { id: 'reg', icon: <Users size={20}/>, label: 'New Registration' },
                { id: 'entry', icon: <FileText size={20}/>, label: 'Result Entry' },
                { id: 'list', icon: <Users size={20}/>, label: 'Patient List' },
              ].map((item) => (
                <li key={item.id} className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer transition-all hover:bg-white/50`}
                    style={{ color: item.active ? '#9575cd' : '#455a64', backgroundColor: item.active ? 'rgba(149, 117, 205, 0.1)' : '' }}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="font-semibold text-sm whitespace-nowrap">{item.label}</span>}
                </li>
              ))}

              {/* Collapsible Menu: Test */}
              <div className="mt-1">
                <li 
                  onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, test: !prev.test }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-slate-700 font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <TestTube size={20} className="text-purple-500 flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap">Test</span>}
                  </div>
                  {isSidebarOpen && <span className={`transition-transform duration-200 ${openMenus.test ? 'rotate-180' : ''}`}>▼</span>}
                </li>
                {isSidebarOpen && openMenus.test && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-purple-200 animate-in fade-in slide-in-from-top-1">
                    {['Tests', 'Specimen & Formats', 'Parameters', 'Templates', 'Packages'].map((sub) => (
                      <li key={sub} className="p-2 text-sm font-semibold text-slate-600 hover:text-purple-600 hover:bg-white/40 rounded-r-lg cursor-pointer transition-colors pl-4 relative whitespace-nowrap">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-purple-200"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Collapsible Menu: Setup */}
              <div className="mt-1">
                <li 
                  onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, setup: !prev.setup }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-slate-700 font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={20} className="text-cyan-500 flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap">Setup</span>}
                  </div>
                  {isSidebarOpen && <span className={`transition-transform duration-200 ${openMenus.setup ? 'rotate-180' : ''}`}>▼</span>}
                </li>
                {isSidebarOpen && openMenus.setup && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-cyan-200 animate-in fade-in slide-in-from-top-1">
                    {['Reports', 'UOM', 'Multivalues', 'Vacutainer', 'Doctors', 'Department'].map((sub) => (
                      <li key={sub} className="p-2 text-sm font-semibold text-slate-600 hover:text-cyan-600 hover:bg-white/40 rounded-r-lg cursor-pointer transition-colors pl-4 relative whitespace-nowrap">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-cyan-200"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Collapsible Menu: Lab Management */}
              <div className="mt-1">
                <li 
                  onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, mgmt: !prev.mgmt }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-slate-700 font-semibold text-sm cursor-pointer hover:bg-white/50`}
                >
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-pink-500 flex-shrink-0" />
                    {isSidebarOpen && <span className="whitespace-nowrap">Lab Management</span>}
                  </div>
                  {isSidebarOpen && <span className={`transition-transform duration-200 ${openMenus.mgmt ? 'rotate-180' : ''}`}>▼</span>}
                </li>
                {isSidebarOpen && openMenus.mgmt && (
                  <ul className="ml-9 mt-1 space-y-1 border-l-2 border-pink-200 animate-in fade-in slide-in-from-top-1">
                    {['Referral List', 'Manage Users', 'Processing Lab'].map((sub) => (
                      <li key={sub} className="p-2 text-sm font-semibold text-slate-600 hover:text-pink-600 hover:bg-white/40 rounded-r-lg cursor-pointer transition-colors pl-4 relative whitespace-nowrap">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-pink-200"></span>
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lab Profile */}
              <li className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 mt-1 rounded-lg cursor-pointer transition-all hover:bg-white/50 text-slate-700 font-semibold text-sm`}>
                <FileText size={20} className="text-blue-500 flex-shrink-0" />
                {isSidebarOpen && <span className="whitespace-nowrap">Lab Profile</span>}
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-purple-100 mt-auto bg-white/20">
             <div className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2 rounded-lg cursor-pointer hover:bg-red-50 text-red-400`}>
               <LogOut size={20} className="flex-shrink-0" />
               {isSidebarOpen && <span className="text-sm font-bold whitespace-nowrap">Logout</span>}
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
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
        className="h-16 flex items-center justify-between px-6 shadow-sm border-b shrink-0 z-50 select-none"
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
          
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-lg bg-purple-200/30" style={{ color: '#9575cd' }}>
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white font-bold"
                    style={{ background: '#f06292' }}>3</span>
            </div>

            {/* SLIDE TO LOGOUT CONTAINER */}
            <div className="group relative bg-white/90 rounded-full p-1 flex items-center shadow-sm border border-slate-200 w-48 overflow-hidden transition-all duration-300 hover:border-red-200 hover:bg-red-50/50">
              
              {/* JD Icon (The Handle) */}
              <div 
                draggable="true"
                onDragEnd={(e) => {
                  // Logout trigger: if dragged significantly to the right
                  if (e.clientX > 1200) { 
                     window.location.reload();
                  }
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-grab active:cursor-grabbing z-20 shadow-sm transition-transform group-hover:scale-105"
                style={{ background: 'linear-gradient(to bottom right, #9575cd, #f062a4)' }}
              >
                JD
              </div>
              
              {/* Text Layer: Default (Name) */}
              <span className="absolute left-11 text-xs font-medium text-slate-700 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-x-4">
                Dr. John Doe
              </span>

              {/* Text Layer: Hover (Logout Instruction) */}
              <span className="absolute left-11 text-[10px] font-bold text-red-400 uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
                Slide to Logout →
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1 overflow-hidden"> 
      {/* This 'flex-1 overflow-hidden' is the key to fixing the sidebar */}
        {/* BLOCK SIDEBAR OPEN */}
        <aside 
          className={`${isSidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 flex flex-col shadow-md border-r bg-white h-full overflow-y-auto shrink-0 z-40`}
          style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }}
        >
          <nav className="flex-1 py-4">
            <ul className="space-y-1 px-2"> 
              
              {/* Primary Links */}
              {[
                { id: 'dashboard', icon: <Home size={18}/>, label: 'Dashboard' },
                { id: 'registration', icon: <Users size={18}/>, label: 'New registration' },
                { id: 'entry', icon: <FileText size={18}/>, label: 'Result entry' },
                { id: 'list', icon: <Users size={18}/>, label: 'Patient list' },
              ].map((item) => (
                <li key={item.id} onClick={() => setActiveView(item.id)}
                    className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 rounded-lg cursor-pointer transition-all hover:bg-white/50`}
                    style={{ 
                      backgroundColor: activeView === item.id ? 'rgba(149, 117, 205, 0.15)' : 'transparent', 
                      color: activeView === item.id ? '#9575cd' : '#455a64' 
                    }}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isSidebarOpen && <span className="text-[13px] font-medium capitalize tracking-tight">{item.label}</span>}
                </li>
              ))}

              {/* Dropdown: Test */}
              <div className="mt-1">
                <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, test: !prev.test }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-medium text-[13px] cursor-pointer hover:bg-white/50 capitalize`}
                >
                  <div className="flex items-center gap-3">
                    <TestTube size={18} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="tracking-tight">Test</span>}
                  </div>
                  {isSidebarOpen && (openMenus.test ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                </li>
                {isSidebarOpen && openMenus.test && (
                  <ul className="ml-8 mt-1 space-y-1 border-l border-purple-200"> 
                    {['Tests', 'Specimen & formats', 'Parameters', 'Templates', 'Packages'].map((sub) => (
                      <li key={sub} onClick={() => setActiveView(sub.toLowerCase().replace(/ /g, '_'))}
                          className="p-2 text-[13px] font-medium text-slate-500 hover:text-[#9575cd] cursor-pointer pl-4 capitalize transition-colors">
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dropdown: Setup */}
              <div className="mt-1">
                <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, setup: !prev.setup }))}
                  className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-medium text-[13px] cursor-pointer hover:bg-white/50 capitalize`}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={18} className="flex-shrink-0" />
                    {isSidebarOpen && <span className="tracking-tight">Setup</span>}
                  </div>
                  {isSidebarOpen && (openMenus.setup ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                </li>
                {isSidebarOpen && openMenus.setup && (
                  <ul className="ml-8 mt-1 space-y-1 border-l border-cyan-200">
                    {['Reports', 'UOM', 'Multivalues', 'Vacutainer', 'Doctors', 'Department'].map((sub) => (
                      <li key={sub} onClick={() => setActiveView(sub.toLowerCase())}
                          className="p-2 text-[13px] font-medium text-slate-500 hover:text-[#4dd0e1] cursor-pointer pl-4 capitalize transition-colors">
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lab Profile */}
              <li onClick={() => setActiveView('profile')}
                  className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 mt-1 rounded-lg cursor-pointer transition-all hover:bg-white/50 text-[#455a64]`}
                  style={{ 
                    backgroundColor: activeView === 'profile' ? 'rgba(149, 117, 205, 0.15)' : 'transparent', 
                    color: activeView === 'profile' ? '#9575cd' : '#455a64' 
                  }}>
                <FileText size={18} className="flex-shrink-0" />
                {isSidebarOpen && <span className="text-[13px] font-medium capitalize tracking-tight">Lab profile</span>}
              </li>

            </ul>
          </nav>
        </aside>
        {/* BLOCK SIDEBAR CLOSE */}
        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-y-auto h-full bg-[#eceff1]">
          <div className="max-w-7xl mx-auto pb-20">
            
            {/* VIEW 1: DASHBOARD */}
            {activeView === 'dashboard' && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-[#263238] mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                   <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-[#9575cd] h-32 flex flex-col justify-center">
                      <p className="text-xs font-bold text-[#607d8b] uppercase">Today's Patients</p>
                      <p className="text-2xl font-bold text-[#263238]">24</p>
                   </div>
                   {/* Card placeholders... */}
                </div>
              </div>
            )}

            {/* VIEW 2: REGISTRATION PAGE */}
            {activeView === 'registration' && (
              <div className="animate-in slide-in-from-bottom-2 duration-500 h-full">
                
                {/* Unified Big Canvas with Hairline Cyan Border */}
                <div className="bg-white rounded-[10px] shadow-xl shadow-slate-200/50 border-[0.5px] min-h-[900px] max-w-6xl mx-auto flex flex-col overflow-hidden"
                     style={{ borderColor: 'rgba(77, 208, 225, 0.3)' }}>
                  
                  {/* 1. Header & Action Bar Area */}
                  <div className="p-8 pb-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        {/* Reduced Registration Icon Size */}
                        <div className="p-1.5 rounded-lg bg-cyan-50 text-[#4dd0e1] shadow-sm">
                          <Users size={20} />
                        </div>
                        {/* Reduced Heading Font Size */}
                        <h2 className="text-xl font-bold text-slate-700 tracking-tight">New Registration</h2>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Quotation Button (5px Radius) */}
                        <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                          style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                          <FileText size={16} className="opacity-40" />
                          Quotation
                        </button>

                        {/* Customize Registration Button (5px Radius) */}
                        <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                          style={{ background: 'linear-gradient(to right, #9d7df0, #f062a4)' }}>
                          <Settings size={16} className="opacity-40" />
                          Customize registration
                        </button>

                        {/* Go to Billing Button (5px Radius) */}
                        <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                          style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                          <Bell size={16} className="opacity-40" />
                          Go to billing
                        </button>
                      </div>
                    </div>

                    {/* Hairline Cyan Line */}
                    <div className="h-[0.5px] w-full" style={{ backgroundColor: 'rgba(77, 208, 225, 0.2)' }}></div>
                  </div>

                  {/* 2. Content Area */}
                  <div className="flex-1 p-12 flex flex-col items-center justify-start">
                      <p className="text-slate-300 italic text-[13px] font-medium capitalize">Unified canvas with compact header ready...</p>
                  </div>

                </div>
              </div>
            )}
            {/* VIEW 3: CATCH-ALL FOR OTHER PAGES */}
            {!['dashboard', 'registration'].includes(activeView) && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 bg-white rounded-3xl shadow-lg border border-purple-100">
                   <h2 className="text-xl font-bold text-[#9575cd] uppercase mb-2">{activeView.replace(/_/g, ' ')}</h2>
                   <p className="text-slate-400">This module is currently under development.</p>
                </div>
              </div>
            )}

          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}
      </div>
    </div>
  );
}
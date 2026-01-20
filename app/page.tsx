"use client";

import React, { useState } from 'react';
import { Menu, X, Home, Users, TestTube, FileText, Settings, LogOut, Bell } from 'lucide-react';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        className="h-16 flex items-center justify-between px-4 shadow-sm border-b sticky top-0 z-50"
        style={{ background: 'linear-gradient(to right, #b3e5fc, #e1bee7)' }} // MediLab Header Gradient
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg transition hover:bg-white/20"
            style={{ color: colors.purple }}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: colors.darkText }}>
            SMARTLAB <span style={{ color: colors.purple }}>PORTAL</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Badge */}
          <div className="relative p-2 rounded-full bg-white/50" style={{ color: colors.purple }}>
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border border-white" 
                  style={{ background: 'linear-gradient(to bottom, #f06292, #d81b60)' }}></span>
          </div>
          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
               style={{ background: 'linear-gradient(to bottom right, #9575cd, #f06292)' }}>
            AD
          </div>
        </div>
      </header>
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1 overflow-hidden">
        {/* BLOCK SIDEBAR OPEN */}
        <aside 
          className={`${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} transition-all duration-300 overflow-hidden flex flex-col shadow-md border-r`}
          style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }} // MediLab Sidebar Gradient
        >
          <nav className="flex-1 py-6">
            <ul className="space-y-3 px-3">
              {[
                { icon: <Home size={20}/>, label: 'Dashboard', active: true },
                { icon: <Users size={20}/>, label: 'Patients' },
                { icon: <TestTube size={20}/>, label: 'Lab Tests' },
                { icon: <FileText size={20}/>, label: 'Reports' },
                { icon: <Settings size={20}/>, label: 'Settings' },
              ].map((item, idx) => (
                <li key={idx} 
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${item.active ? 'shadow-sm' : ''}`}
                    style={{ 
                      backgroundColor: item.active ? 'rgba(149, 117, 205, 0.15)' : 'transparent',
                      color: item.active ? colors.purple : colors.mediumText
                    }}>
                  <span className="min-w-[20px]">{item.icon}</span>
                  {isSidebarOpen && <span className="font-semibold">{item.label}</span>}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-purple-100 mb-2">
             <div className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition hover:bg-red-50"
                  style={{ color: colors.pink }}>
               <LogOut size={20}/>
               {isSidebarOpen && <span className="font-semibold">Logout</span>}
             </div>
          </div>
        </aside>
        {/* BLOCK SIDEBAR CLOSE */}

        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-xl h-full shadow-sm flex items-center justify-center border"
               style={{ borderColor: 'rgba(77,208,225,0.3)', color: colors.lightText }}>
            Welcome to MediLab Pro Dashboard
          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}

      </div>
    </div>
  );
}
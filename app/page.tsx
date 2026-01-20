"use client"; // Required for the toggle button to work

import React, { useState } from 'react';
import { Menu, X, Home, Users, TestTube, FileText, Settings, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* BLOCK HEADER OPEN */}
      <header className="h-16 bg-blue-900 text-white flex items-center justify-between px-4 shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-blue-800 rounded-lg transition"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold tracking-tight text-white">SMARTLAB <span className="text-blue-400">PORTAL</span></h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="hidden md:inline bg-blue-800 px-3 py-1 rounded-full">Station: Reception_01</span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">L</div>
        </div>
      </header>
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1">
        {/* BLOCK SIDEBAR OPEN */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden flex flex-col shadow-lg`}>
          <nav className="flex-1 py-4">
            <ul className="space-y-2 px-3">
              {[
                { icon: <Home size={20}/>, label: 'Dashboard' },
                { icon: <Users size={20}/>, label: 'Patients' },
                { icon: <TestTube size={20}/>, label: 'Lab Tests' },
                { icon: <FileText size={20}/>, label: 'Reports' },
                { icon: <Settings size={20}/>, label: 'Settings' },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg cursor-pointer transition">
                  <span className="min-w-[20px]">{item.icon}</span>
                  {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-100 mb-2">
             <div className="flex items-center gap-4 p-3 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
               <LogOut size={20}/>
               {isSidebarOpen && <span className="font-medium">Logout</span>}
             </div>
          </div>
        </aside>
        {/* BLOCK SIDEBAR CLOSE */}

        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl h-full flex items-center justify-center text-gray-400">
            Main content will be placed here
          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}

      </div>
    </div>
  );
}
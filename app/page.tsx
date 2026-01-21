"use client";

import React, { useState } from 'react';
import { 
  Home, 
  UserPlus, 
  Users, 
  FileText, 
  FlaskConical, 
  Settings2, 
  IdCard, 
  ChevronDown, 
  ChevronUp, 
  LogOut, 
  ReceiptText, 
  SlidersHorizontal, 
  CreditCard,
  Menu
} from 'lucide-react';

export default function MediLabPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('registration');
  const [openMenus, setOpenMenus] = useState({ test: false, setup: false, mgmt: false });

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 flex flex-col shadow-md border-r bg-white h-full overflow-y-auto shrink-0 z-40`}
        style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }}
      >
        <div className="p-4 flex items-center justify-between border-b border-purple-100">
          {isSidebarOpen && <h1 className="font-bold text-purple-600 truncate text-sm">MediLab Pro</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/50 rounded">
            <Menu size={20} className="text-slate-600" />
          </button>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {[
              { id: 'dashboard', icon: <Home size={18}/>, label: 'Dashboard' },
              { id: 'registration', icon: <UserPlus size={18}/>, label: 'New registration' }, // fa-user-plus
              { id: 'entry', icon: <FileText size={18}/>, label: 'Result entry' },
              { id: 'list', icon: <Users size={18}/>, label: 'Patient list' }, // fa-users
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

            {/* Test (fa-flask) */}
            <div className="mt-1">
              <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, test: !prev.test }))}
                className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-medium text-[13px] cursor-pointer hover:bg-white/50 capitalize`}
              >
                <div className="flex items-center gap-3">
                  <FlaskConical size={18} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="tracking-tight">Test</span>}
                </div>
                {isSidebarOpen && (openMenus.test ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </li>
            </div>

            {/* Setup (fa-cogs) */}
            <div className="mt-1">
              <li onClick={() => isSidebarOpen && setOpenMenus(prev => ({ ...prev, setup: !prev.setup }))}
                className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} p-2.5 rounded-lg text-[#455a64] font-medium text-[13px] cursor-pointer hover:bg-white/50 capitalize`}
              >
                <div className="flex items-center gap-3">
                  <Settings2 size={18} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="tracking-tight">Setup</span>}
                </div>
                {isSidebarOpen && (openMenus.setup ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </li>
            </div>

            {/* Lab Profile (fa-id-card) */}
            <li onClick={() => setActiveView('profile')}
                className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2.5 mt-1 rounded-lg cursor-pointer transition-all hover:bg-white/50 text-[#455a64]`}
                style={{ 
                  backgroundColor: activeView === 'profile' ? 'rgba(149, 117, 205, 0.15)' : 'transparent', 
                  color: activeView === 'profile' ? '#9575cd' : '#455a64' 
                }}>
              <IdCard size={18} className="flex-shrink-0" />
              {isSidebarOpen && <span className="text-[13px] font-medium capitalize tracking-tight">Lab profile</span>}
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-purple-100 bg-white/20">
           <div className={`flex items-center ${isSidebarOpen ? 'justify-start gap-3' : 'justify-center'} p-2 rounded-lg cursor-pointer hover:bg-red-50 text-[#f06292]`}>
             <LogOut size={18} />
             {isSidebarOpen && <span className="text-[13px] font-medium capitalize ml-3">Logout</span>}
           </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 p-6 md:p-10">
        
        {activeView === 'registration' && (
          <div className="animate-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white rounded-[10px] shadow-xl shadow-slate-200/50 border-[0.5px] min-h-[900px] max-w-6xl mx-auto flex flex-col overflow-hidden"
                 style={{ borderColor: 'rgba(77, 208, 225, 0.3)' }}>
              
              <div className="p-8 pb-4 bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-cyan-50 text-[#4dd0e1] shadow-sm">
                      <UserPlus size={20} /> {/* fa-user-plus */}
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 tracking-tight">New Registration</h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                      <ReceiptText size={16} className="opacity-60" /> {/* fa-file-invoice-dollar */}
                      Quotation
                    </button>

                    <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(to right, #9d7df0, #f062a4)' }}>
                      <SlidersHorizontal size={16} className="opacity-60" /> {/* fa-sliders-h */}
                      Customize registration
                    </button>

                    <button className="flex items-center gap-2 px-6 py-1.5 rounded-[5px] text-white font-medium text-[13px] capitalize shadow-md transition-all hover:opacity-90 active:scale-95"
                      style={{ background: 'linear-gradient(to right, #4dd0e1, #64b5f6)' }}>
                      <CreditCard size={16} className="opacity-60" /> {/* fa-credit-card */}
                      Go to billing
                    </button>
                  </div>
                </div>
                <div className="h-[0.5px] w-full" style={{ backgroundColor: 'rgba(77, 208, 225, 0.2)' }}></div>
              </div>

              <div className="flex-1 p-12 flex flex-col items-center justify-start text-slate-300 italic text-[13px] font-medium capitalize">
                  All icons updated correctly. Ready for form fields.
              </div>
            </div>
          </div>
        )}

        {activeView !== 'registration' && (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p className="capitalize">{activeView.replace('_', ' ')} view coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}
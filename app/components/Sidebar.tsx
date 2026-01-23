"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import { Home, Users, FileText, Settings, TestTube, ChevronDown, ChevronUp } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface SidebarProps {
  isSidebarOpen: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ isSidebarOpen, activeView, setActiveView }: SidebarProps) {
  // Moved menu state here since it's local to the sidebar
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  return (
    <aside 
      className={`${isSidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 flex flex-col shadow-md border-r bg-white h-full overflow-y-auto shrink-0 z-40`}
      style={{ background: 'linear-gradient(to bottom, #e8eaf6, #f3e5f5)' }}
    >
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2"> 
          
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
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
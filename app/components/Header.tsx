"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
import { Menu, TestTube, Search, Bell } from 'lucide-react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  return (
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
            <div 
              draggable="true"
              onDragEnd={(e) => {
                if (e.clientX > 1200) { 
                    window.location.reload();
                }
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-grab active:cursor-grabbing z-20 shadow-sm transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(to bottom right, #9575cd, #f062a4)' }}
            >
              JD
            </div>
            
            <span className="absolute left-11 text-xs font-medium text-slate-700 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-x-4">
              Dr. John Doe
            </span>

            <span className="absolute left-11 text-[10px] font-bold text-red-400 uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
              Slide to Logout →
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
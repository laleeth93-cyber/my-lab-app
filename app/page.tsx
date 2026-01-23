"use client";

// BLOCK IMPORTS OPEN
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import NewRegistration from './components/NewRegistration';
import CustomizeRegistrationModal from './components/CustomizeRegistrationModal';
// BLOCK IMPORTS CLOSE

export default function Dashboard() {
  
  // BLOCK STATE SETUP OPEN
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  // BLOCK STATE SETUP CLOSE

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[#eceff1]">
      
      {/* BLOCK HEADER OPEN */}
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      {/* BLOCK HEADER CLOSE */}

      <div className="flex flex-1 overflow-hidden"> 
        
        {/* BLOCK SIDEBAR OPEN */}
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          activeView={activeView} 
          setActiveView={setActiveView} 
        />
        {/* BLOCK SIDEBAR CLOSE */}

        {/* BLOCK MAIN CONTENT OPEN */}
        <main className="flex-1 p-6 overflow-hidden h-full bg-[#eceff1]">
          {/* Updates:
              1. Removed 'pb-20' which was causing the extra gray space/scroll.
              2. Added 'h-full flex flex-col' so children can fill the height perfectly.
          */}
          <div className="w-full h-full flex flex-col mx-auto">
            
            {/* BLOCK DASHBOARD VIEW OPEN */}
            {activeView === 'dashboard' && <DashboardOverview />}
            {/* BLOCK DASHBOARD VIEW CLOSE */}

            {/* BLOCK REGISTRATION VIEW OPEN */}
            {activeView === 'registration' && (
              <NewRegistration onCustomizeClick={() => setIsCustomizeModalOpen(true)} />
            )}
            {/* BLOCK REGISTRATION VIEW CLOSE */}

            {/* BLOCK CUSTOMIZE MODAL OPEN */}
            <CustomizeRegistrationModal 
              isOpen={isCustomizeModalOpen} 
              onClose={() => setIsCustomizeModalOpen(false)} 
            />
            {/* BLOCK CUSTOMIZE MODAL CLOSE */}

            {/* BLOCK CATCH ALL VIEW OPEN */}
            {!['dashboard', 'registration'].includes(activeView) && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 bg-white rounded-3xl shadow-lg border border-purple-100">
                   <h2 className="text-xl font-bold text-[#9575cd] uppercase mb-2">{activeView.replace(/_/g, ' ')}</h2>
                   <p className="text-slate-400">This module is currently under development.</p>
                </div>
              </div>
            )}
            {/* BLOCK CATCH ALL VIEW CLOSE */}

          </div>
        </main>
        {/* BLOCK MAIN CONTENT CLOSE */}
      </div>
    </div>
  );
}
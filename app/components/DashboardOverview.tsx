"use client";

// BLOCK IMPORTS OPEN
import React from 'react';
// BLOCK IMPORTS CLOSE

// BLOCK COMPONENT DEFINITION OPEN
export default function DashboardOverview() {
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-[#263238] mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-[#9575cd] h-32 flex flex-col justify-center">
            <p className="text-xs font-bold text-[#607d8b] uppercase">Today's Patients</p>
            <p className="text-2xl font-bold text-[#263238]">24</p>
         </div>
      </div>
    </div>
  );
}
// BLOCK COMPONENT DEFINITION CLOSE
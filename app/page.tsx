"use client";

import React, { useState } from 'react';

export default function LabDashboard() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Sample Patient", age: 25, gender: "Male", phone: "0000000000", status: "Pending" }
  ]);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          🔬 SmartLab Reception
        </h1>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-400 text-sm uppercase">
                <th className="py-4 px-2">Name</th>
                <th className="py-4">Age/Sex</th>
                <th className="py-4">Phone</th>
                <th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-blue-50 transition">
                  <td className="py-4 px-2 font-medium text-gray-800">{p.name}</td>
                  <td className="py-4 text-gray-600">{p.age}y / {p.gender}</td>
                  <td className="py-4 text-gray-600 font-mono">{p.phone}</td>
                  <td className="py-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
import React from 'react';

export default function Home() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* BLOCK HEADER OPEN */}
        <header className="border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-800">SmartLab Portal</h1>
          <p className="text-gray-600">Laboratory Information System | Receptionist View</p>
        </header>
        {/* BLOCK HEADER CLOSE */}

        {/* BLOCK PATIENT REGISTRATION FORM OPEN */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 underline">New Patient Registration</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" placeholder="John Doe" className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select className="mt-1 block w-full border rounded-md p-2">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Referring Physician</label>
              <input type="text" placeholder="Dr. Smith" className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Register Patient
              </button>
            </div>
          </form>
        </section>
        {/* BLOCK PATIENT REGISTRATION FORM CLOSE */}

        {/* BLOCK PATIENT QUEUE OPEN */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Today's Patient Queue</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Time</th>
                <th className="p-3 border">Patient Name</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border">09:00 AM</td>
                <td className="p-3 border">Waiting for data...</td>
                <td className="p-3 border text-yellow-600 font-medium">Pending</td>
              </tr>
            </tbody>
          </table>
        </section>
        {/* BLOCK PATIENT QUEUE CLOSE */}

      </div>
    </main>
  );
}
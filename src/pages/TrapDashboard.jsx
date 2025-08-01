import React from 'react';

const TrapDashboard = ({ onExitAttempt }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl text-center">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the System!</h1>
      <p className="text-gray-600 mt-2">You're in. Congratulations. Now what?</p>
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-semibold">Your Fake Dashboard</h2>
        <p className="mt-2 text-gray-500">Productivity is an illusion. Here are some charts to prove it.</p>
        <div className="mt-4 h-48 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-md flex items-center justify-center">
          <p className="text-indigo-800 font-medium">Chart goes here. Impressive, right?</p>
        </div>
      </div>
      <button onClick={onExitAttempt} className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">Exit</button>
    </div>
  </div>
);

export default TrapDashboard;

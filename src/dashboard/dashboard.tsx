import React from 'react';

export function Dashboard() {
  return (
    <div className="flex h-screen">
  {/* Sidebar */}
  <div className="w-1/6 bg-gray-800 text-white relative">
    {/* Sidebar content goes here */}
    <ul className="p-4">
      {/* Sidebar menu items */}
      <li className="mb-4">
        <a href="#" className="block text-gray-300 hover:text-white">Dashboard</a>
      </li>
      <li className="mb-4">
        <a href="#" className="block text-gray-300 hover:text-white">Analytics</a>
      </li>
      <li className="mb-4">
        <a href="#" className="block text-gray-300 hover:text-white">Reports</a>
      </li>
      {/* ... */}
    </ul>
    
    {/* Circle Icon */}
    <div className="flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-0 -mr-4 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-red-600 transform rotate-180 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18L18 6M6 6l12 12" />
        {/* Add any additional SVG path or shape elements inside the SVG */}
      </svg>
    </div>
  </div>
  
  {/* Main Content */}
  <div className="w-5/6">
    {/* Main Content Area */}
    <main className="p-4">
      {/* Circle Icon */}
      <div className="flex items-center justify-end mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 hover:text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18L18 6M6 6l12 12" />
          {/* Add any additional SVG path or shape elements inside the SVG */}
        </svg>
      </div>
      
      {/* Main content goes here */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in urna vitae tellus pulvinar aliquet. Sed a volutpat nibh.</p>
      {/* ... */}
    </main>
  </div>
</div>

  )
}
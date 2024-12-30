import React from 'react';
import SimpleScheduler from './components/SimpleScheduler';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Chad Manning Music Scheduling
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <SimpleScheduler />
        </div>
      </div>
    </div>
  );
}

export default App;
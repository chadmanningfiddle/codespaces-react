import React from 'react';
import Calendar from '../components/scheduling/Calendar';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>MyFiddleSchedule - Bay Area Fiddle Lessons</title>
        <meta name="description" content="Schedule fiddle lessons, jams, and zoom classes with Chad Manning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
        {/* Header */}
        <header className="bg-blue-950 text-white p-6 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">MyFiddleSchedule</h1>
            <p className="text-lg text-orange-300">Bay Area Fiddle Lessons & Jams</p>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Calendar />
        </main>

        {/* Footer */}
        <footer className="bg-blue-950 text-white p-6">
          <div className="max-w-6xl mx-auto text-center">
            <p>Contact: chadmanning@gmail.com | Venmo: @Chad-manning-18</p>
          </div>
        </footer>
      </div>
    </>
  );
}
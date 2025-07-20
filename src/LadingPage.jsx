// App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import './App.css'; // global styles if any

function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      {/* Add other components below as needed */}
    </div>
  );
}

export default App;

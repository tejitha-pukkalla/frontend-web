import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LeadHub from './pages/LeadHub';
import NetworkingHub from './pages/NetworkingHub';
import BusinessSuite from './pages/BusinessSuite';
import InvestorConnect from './pages/InvestorConnect';
import AIGrowth from './pages/AIGrowth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lead-hub" element={<LeadHub />} />
        <Route path="/networking-hub" element={<NetworkingHub />} />
        <Route path="/business-suite" element={<BusinessSuite />} />
        <Route path="/investor-connect" element={<InvestorConnect />} />
        <Route path="/ai-growth" element={<AIGrowth />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Shop from './components/Shop/Shop.jsx';
import Header from './components/Layouts/Header.jsx';
import Sidebar from './components/Layouts/Sidebar.jsx';
import Footer from './components/Layouts/Footer.jsx';
import SignUp from './components/Sign Up/Signup.jsx';
import SignIn from './components/Sign In/Signin.jsx';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signin" element={<SignIn isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<SignUp isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </Router>
    </div>
  );
}

export default App;

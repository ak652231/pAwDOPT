import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutS from './pages/AboutS/AboutS';
import Volunteer from './pages/Volunteer/Volunteer';
import Donate from './pages/Donate/Donate';
import Signup from './components/authentication/Signup/Signup';
import Login from './components/authentication/Login/Login';
import ProcessS from './pages/ProcessS/ProcessS';
import Adopt from './pages/Adopt/Adopt';
import PetDetails from './pages/PetDetails/PetDetails';
import AdForm from './pages/Forms/AdForm';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutS />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/process" element={<ProcessS />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/adopt/:id" element={<PetDetails />} />
        <Route path="/adform/:id" element={<AdForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import AboutS from './pages/AboutS/AboutS';
import Volunteer from './pages/Volunteer/Volunteer';
import Donate from './pages/Donate/Donate';
import Signup from './components/authentication/Signup/Signup';
import Login from './components/authentication/Login/Login';
import Logout from './components/authentication/Logout/Logout';
import ProcessS from './pages/ProcessS/ProcessS';
import Adopt from './pages/Adopt/Adopt';
import PetDetails from './pages/PetDetails/PetDetails';
import AdForm from './pages/Forms/AdForm';
import HomeNGO from './pages/HomeNGO/HomeNGO';
import AdoptionRequests from './components/AdoptionRequests/AdoptionRequests';
import AdoptionRequestDetails from './components/AdoptionRequestDetails/AdoptionRequestDetails';
import AllPets from './pages/Manage pets/AllPets';
import EditPets from './pages/Manage pets/EditPets';

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
        <Route path="/logout" element={<Logout />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/process" element={<ProcessS />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/adopt/:id" element={<PetDetails />} />
        <Route path="/adform/:id" element={<AdForm />}></Route>
        <Route path="/homengo" element={<HomeNGO/>}></Route>
        <Route path="/adoption-requests" element={<AdoptionRequests/>}></Route>
        <Route path="/adoption-requests/:id" element={<AdoptionRequestDetails/>}></Route>
        <Route path="/manage-pets" element={<AllPets/>}></Route>
        <Route path="/manage-pets/edit/:id" element={<EditPets/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

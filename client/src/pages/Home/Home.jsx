import React from 'react';
import Header from '../../components/Header/Header';
import About from '../../components/About/About';
import Process from '../../components/Process/Process';
import Why from '../../components/Why/Why';
import Testimonials from '../../components/Testimonials/Testimonials';
import Help from '../../components/Help/Help';
import Footer from '../../components/Footer/Footer';
import HeaderNGO from '../../components/HeaderNGO/HeaderNGO';

function Home() {
  return (
    <div>
      <Header />
      <About />
      <Why />
      <Process />
      
      <Testimonials />
      <Help />
      <Footer />
    </div>
  );
}

export default Home;


import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import happy1 from '../../assets/happy1.jpg'
import happy2 from '../../assets/happy2.jpg'
import happy3 from '../../assets/happy3.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import "./Testimonials.css";

function Carousell() {
    const slides = [
        {
          name: 'John Doe',
          text: 'Adopting my furry friend from pAwDOPT was the best decision I ever made. He brings so much joy and love into our home!',
          image: happy1 
        },
        {
          name: 'Jane Smith',
          text: 'We found our perfect match at pAwDOPT. Our adopted pet has become a cherished member of our family, bringing laughter and happiness every day.',
          image: happy2
        },
        {
          name: 'Michael Brown',
          text: 'Our adopted pet from pAwDOPT has filled our lives with endless cuddles and unconditional love. We can’t imagine life without him!',
          image: happy3
        },
      ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className=" w-full md:w-2/3 border-zinc-600 border-2 rounded-lg p-6 mx-auto">
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000} 
        stopOnHover={true} 
        onChange={handleSlideChange} 
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img className='car' src={slide.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
      <div className="testimonial-text">
        <h1 className='testimonial-name'>{slides[currentSlide].name}</h1>
        <p className="testimonial-content">{slides[currentSlide].text}</p>
      </div>
    </div>
  );
}

export default Carousell;

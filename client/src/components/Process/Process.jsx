import React from 'react'
import "./Process.css";
import { Link } from 'react-router-dom';
import process from '../../assets/process.png';
function Process() {
  return (
    <div className='process p-20'>
            <h1 className='nuni text-center text-5xl font-extrabold'>Adoption Process</h1>
            <img src={process} alt="" />
            <div className='flex justify-center items-center'>
                <Link to='/process'><button className="px-3 py-1 bg-black rounded-3xl mt-8 bg-gray-800 clr-lgrn text-lg w-60 nuni" >Read more</button></Link>

            </div>
    </div>
  )
}

export default Process
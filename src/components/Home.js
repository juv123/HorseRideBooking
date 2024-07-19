import React from 'react'
import {  horse1, horse1_img, horse2, horse2_img, horse3, horse3_img, horse4, horse4_img, horse_ride_icon, logo } from '../config/constants'
import { Outlet, useNavigate } from 'react-router-dom';
import AnimatedImageGallery from './AnimatedImageGallery';

const Home = () => {
  const nav = useNavigate();
  const navigate=()=>{
     nav("/booking");
     }
  return (
    <div className="gallery-container">
      <h1 className="heading">
          Find a horse from our available horses!
      </h1>
    <div className="home">
     <AnimatedImageGallery />
      </div>
      <button className='submit' onClick={navigate}>Book Now</button>
      </div>
      
  )
}

export default Home
import React from 'react';
import { motion } from 'framer-motion';
import { horse1_img, horse2_img, horse3_img, horse4_img, horse1, horse2, horse3, horse4, horse_ride_icon } from '../config/constants'; // Import your image constants

const AnimatedImage = ({ src, alt }) => {
  return (
    <motion.img className="horseImg"
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      style={{ margin: '30px',marginBottom:0, borderRadius: '10px', width: '250px', height: '200px' }}
    />
  );
};

const HorseCard = ({ src, name }) => {
  return (
    <div style={{ textAlign: 'center', margin: '9px' ,border:'1px solid #FFD700'}}>
      <AnimatedImage src={src} alt={name} />
      <p class="horse-name">{name}</p>
          </div>
  );
};

const AnimatedImageGallery = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: '10px', 
        marginRight: '10px', 
      }}
    >
      
      <HorseCard src={horse1_img} name={horse1} />
      <HorseCard src={horse2_img} name={horse2} />
      <HorseCard src={horse3_img} name={horse3} />
      <HorseCard src={horse4_img} name={horse4} />
    </div>
  );
};

export default AnimatedImageGallery;
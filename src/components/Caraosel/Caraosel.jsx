import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, img_500, noPicture } from './../../config/config';

const handleDragStart = (e) => e.preventDefault();



const Caraosel = ({ media_type, id }) => {
  const [credits, setCredits] = useState([]);


  const items = credits.map((da) => (
    <div className='carouselItem'>
      <img src={da.profile_path ? `${img_300}/${da.profile_path}` : noPicture} alt={da.name} onDragStart={handleDragStart} className='caraoselimg' width='100px' />
      <b className='caraiselItemtxt'>{da.name}</b>
    </div>
  ))


  const responsive = {
    0: {
      items: 3
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    }
  }

  const fetchCredits = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `);


    console.log(data)
    setCredits(data.cast)

  }


  useEffect(() => {
    fetchCredits()
  }, [])

  return (
    <AliceCarousel mouseTracking items={items} responsive={responsive} autoPlay infinite disableButtonsControls disableDotsControls />
  );
}

export default Caraosel;
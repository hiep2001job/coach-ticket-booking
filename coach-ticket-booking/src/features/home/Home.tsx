import React, { useState } from 'react'
import TripList from '../../app/components/triplist/TripList';
import Booking from './Booking';
import TripSearch from '../../app/components/tripsearch/TripSearch';
const Home = () => {
  const [isBooking, setIsBooking] = useState(false)

  return (
    <>
      {isBooking ?
        <Booking /> :
        <>
          <TripSearch/>
          <TripList />
        </>}

    </>
  )
}

export default Home
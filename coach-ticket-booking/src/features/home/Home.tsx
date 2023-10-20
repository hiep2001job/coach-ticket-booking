import React, { useState } from 'react'
import TripList from '../../app/components/triplist/TripList';
import Booking from '../booking/Booking';
import TripSearch from '../../app/components/tripsearch/TripSearch';
import { useAppSelector } from '../../store/configureStore';
import { Loading3QuartersOutlined } from '@ant-design/icons';
const Home = () => {
  const [isBooking, setIsBooking] = useState(false)
  const { tripLoaded,status } = useAppSelector(state => state.booking);
  return (
    <>
      {isBooking ?
        <Booking /> :
        <>
          <TripSearch />
          {tripLoaded && <TripList />}
         
        </>}

    </>
  )
}

export default Home
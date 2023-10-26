import React, { ReactNode } from 'react'
import TripList from '../../app/components/triplist/TripList';
import TripSearch from '../../app/components/tripsearch/TripSearch';
import { useAppSelector } from '../../store/configureStore';
import { BOOKINGS_STEP } from '../../utils/constants';
import Booking from '../booking/Booking';
import Payment from '../../app/components/payment/Payment';
const Home = () => {
  const { tripLoaded, bookingStep } = useAppSelector(state => state.booking);

  const renderComponents: any = {

    [BOOKINGS_STEP.SEARCH_TRIPS]: () => (<>
      <TripSearch />
      {tripLoaded && <TripList />}
    </>),

    [BOOKINGS_STEP.SELECT_SEATS]: () => <Booking />,
    [BOOKINGS_STEP.PAYING]:()=><Payment/>

  }

  return (
    renderComponents[bookingStep]()
  )
    
  
}

export default Home
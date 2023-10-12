import React from 'react'
import TripSearch from '../../app/components/tripsearch/tripsearch';
import TripList from '../../app/components/triplist/TripList';
const Home = () => {
  return (
    <>
     <TripSearch />
     <TripList />
    </>
  )
}

export default Home
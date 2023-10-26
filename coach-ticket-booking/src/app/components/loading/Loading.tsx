import { Flex, Space, Spin } from 'antd'
import React, { useState } from 'react'
import Container from '../container/Container'
import { LoadingOutlined } from '@ant-design/icons'
import './Loading.css';
import BusRunning from "../../../img/bus-truning.gif";


const Loading = () => {

  return (
    <Container>
      <Flex align='center' justify='center' style={{height:'70vh'}}>
         <img src={BusRunning} height='300' alt="loading icon" />
      </Flex>
    </Container>
    
  )
}

export default Loading
import { Col, Row } from 'antd'
import React, { ReactNode } from 'react'

interface ContainerProps{
    children:ReactNode
}

const Container = ({children}:ContainerProps) => {
  return (
    <Row>
        <Col xs={{span:24}} md={{span:16,offset:4}}>{children}</Col>
    </Row>
  )
}

export default Container
import { Space, Spin } from 'antd'
import React, { useState } from 'react'

interface LoadingProps { message: string };

const Loading = (props: LoadingProps) => {

  return (
    <div className="space-align-container" style={{width:"100vw",height:"100vh"}}>
      <div className="space-align-block">
        <Space align="center">
          <Spin tip={props.message} size="large">
            <div className="content" />
          </Spin>
        </Space>
      </div>
    </div>


  )
}

export default Loading
import { Flex } from 'antd'
import React from 'react'
import EmptyIcon from '../../../img/empty_list.svg'

const Empty = () => {
  return (
    <Flex vertical align='center'>
        <Flex>
            <img style={{width:'100%'}} src={EmptyIcon} alt='empty icon'/>
        </Flex>
        <Flex>
            <span style={{fontWeight:'bold',paddingTop:'0.5rem'}}>Không tìm thấy kết quả</span>
        </Flex>
    </Flex>
  )
}

export default Empty
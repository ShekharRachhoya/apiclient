import { Card, Stack } from '@chakra-ui/react'
import React from 'react'
import History from './History'

const Sidebar = () => {

  return (
    <Card.Root p={2} w='18%' display={['none', 'flex']} h='100%' overflowY='hidden' rounded={0} variant='subtle' >
    
      <Stack overflowY='auto'>

        <History />

      </Stack>
    </Card.Root>
  )
}

export default Sidebar

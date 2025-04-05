import { useColorMode } from '@/components/ui/color-mode'
import { Button, Heading, HStack, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack h='50px' justify='space-between' px={5}>
      <HStack> <SideMenu /> <Heading>APIClient</Heading></HStack>
      <IconButton variant='ghost' rounded='full' onClick={toggleColorMode}>{colorMode === 'light' ? <MdOutlineDarkMode />
        : <MdOutlineLightMode />
      }</IconButton>
    </HStack>
  )
}

export default Navbar



import { CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { RiMenu3Line } from 'react-icons/ri'
import History from './History'



const SideMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <Drawer.Root lazyMount size='full' placement='start' open={open} onOpenChange={(e) => setOpen(e.open)} >
      <Drawer.Trigger asChild display={['block', 'none']} >
        <IconButton variant='ghost' size='sm' >
          <RiMenu3Line />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>APIClient</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body> 

              <History onClose={()=>setOpen(false)} />

            </Drawer.Body>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

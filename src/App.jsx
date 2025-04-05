import { Heading, HStack, Separator, Stack } from "@chakra-ui/react"
import Navbar from "./app_components/Navbar"
import Sidebar from "./app_components/Sidebar"
import ReqBuilder from "./app_components/ReqBuilder"
import DataProvider from "./context/DataProvider"
import { toaster, Toaster } from "./components/ui/toaster"


function App() {



  return (
    <DataProvider>

      {/* <Navbar /> */}

      <HStack h='100vh' w='100vw' gapX={0} >

        <Sidebar />

        <Stack width={['100%', '82%']} h='100%' gapY={0} gapX={0} >
          <Navbar />
          <Separator />

          <ReqBuilder />


        </Stack>
        <Toaster />
      </HStack>



    </DataProvider>

  )
}

export default App

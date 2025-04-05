import { Badge, Input, Table, Tabs } from "@chakra-ui/react"
import ReqParams from "./Params"
import Body from "./Body"
import Headers from "./Headers"
import { useData } from "@/context/context"
import Auth from "./Auth"


const ReqData = () => {

  const { queryParams, headers } = useData()

  return (
    <Tabs.Root defaultValue="params" lazyMount unmountOnExit >
      <Tabs.List>
        <Tabs.Trigger value="params">
          {/* <LuUser /> */}
          Params {queryParams.length > 0 && <Badge size='sm'>{queryParams.length}</Badge>}

        </Tabs.Trigger>
        <Tabs.Trigger value="body">
          {/* <LuFolder /> */}
          Body
        </Tabs.Trigger>
        <Tabs.Trigger value="auth">
          {/* <LuSquareCheck /> */}
          Auth
        </Tabs.Trigger>
        <Tabs.Trigger value="headers">
          {/* <LuSquareCheck /> */}
          Headers
        </Tabs.Trigger>

      </Tabs.List>
      <Tabs.Content value="params">
        <ReqParams />
      </Tabs.Content>

      <Tabs.Content value="body">
        <Body />
      </Tabs.Content>
      <Tabs.Content value="auth">
        <Auth />
      </Tabs.Content>
      <Tabs.Content value="headers">
        <Headers />
      </Tabs.Content>

    </Tabs.Root>
  )
}


export default ReqData








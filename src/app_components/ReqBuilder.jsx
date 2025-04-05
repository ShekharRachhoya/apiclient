import { Button, Input, NativeSelect, Progress, Separator, Stack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import ReqData from './ReqData'
import { useData } from '@/context/context'
import { useDVInput } from './custom_hooks'
import axios from 'axios'
import Response from './Response'
import Navbar from './Navbar'
import { toaster } from '@/components/ui/toaster'

const ReqBuilder = () => {
  const { urlRef, response, setResponse, method, setMethod, auth, formData, formEncode, conType, headers, setQueryParams, queryParams, jsonRef, textRef } = useData()
  const timerRef = useRef(null)
  const [loading, setLoading] = useState(false)


  const handleSend = async () => {
    const url = urlRef.current.value
    if (!url || !url.startsWith('http')) return toaster.error({
      title: 'error',
      description: 'Please enter a valid url.'
    })
    setLoading(true)
    const startTime = performance.now();
    let res;
    try {

      const req = axios[method]
      if (method === 'get' || method === 'delete') {
        res = await req(urlRef.current.value, {
          headers: {...arrToObject(headers), Authorization: auth.token},
          responseType: 'arraybuffer'

        })
      } else {

        res = await req(urlRef.current.value, prepareData(conType, { jsonRef, textRef, formData, formEncode }), {
          headers: { ...arrToObject(headers), "Content-Type": conType, Authorization: auth.token },
          responseType: 'arraybuffer'

        })
      }
      console.log(res);
      res.resTime = performance.now() - startTime
      setResponse(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (!error.response) return toaster.error({
        title: 'Error',
        description: 'Can naot get response from this url'
      })
      setResponse({ ...error?.response, resTime: performance.now() - startTime })
    }


  }



  const handleUrlChange = (e) => {

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (urlRef.current) setQueryParams(parseUrlToParams(urlRef.current.value))
      // parseUrlToParams(urlRef.current.value)
    }, 1000)



  }



  const setHistory = () => {

    const history = localStorage.getItem('history') || '[]'
    const hjson = JSON.parse(history)
    const newHistory = {
      url: urlRef.current.value,
      method, conType, headers, queryParams, auth
    }

    switch (conType) {
      case 'none':
        break;
      case 'application/x-www-form-urlencoded':
        newHistory.data = formEncode;
        break;
      case 'multipart/form-data':
        newHistory.data = formData;
        break;
      case 'text/plain':
        if (textRef.current) newHistory.data = textRef.current.value
        break
      default:
        if (jsonRef.current) newHistory.data = jsonRef.current.value

    }
    localStorage.setItem('history', JSON.stringify([newHistory, ...hjson.slice(0, 9)]))

  }




  return (
    <Stack h='calc(100% - 50px)' p={5} overflowY='auto' >



      <Stack direction={['column', 'row']} >
        <NativeSelect.Root w={['100%', '10%']} >
          <NativeSelect.Field value={method} onChange={(e) => setMethod(e.currentTarget.value)}>
            <option value='get'>GET</option>
            <option value='post'>POST</option>
            <option value='put'>PUT</option>
            <option value='patch'>PATCH</option>
            <option value='delete'>DELETE</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        <Input ref={urlRef} placeholder='https;//www.example.com' onChange={handleUrlChange} />

        <Button onClick={() => {
          handleSend()
          setHistory()
        }
        }>SEND</Button>
      </Stack>

      <ReqData />
      {/* <Separator mt={5} /> */}
      {
        loading &&
        <Progress.Root mt={10} value={null}>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      }

      {
        response && <Response response={response} />
      }
    </Stack >
  )
}

export default ReqBuilder


const toFormData = (data) => {
  const formdata = new FormData()
  data.forEach((ele) => {
    if (!ele.active || !ele.key) return
    if (ele.type && ele.type === 'file') {
      ele.value.forEach(e => formdata.append(ele.key, e))
    } else {
      formdata.append(ele.key, ele.value)
    }

  })
  return formdata

}



const arrToObject = (arr) => {
  let obj = {}
  arr.forEach(ele => {
    if (!ele.active || !ele.key) return
    obj[ele.key] = ele.value
  });
  return obj
}


const prepareData = (conType, { jsonRef, textRef, formData, formEncode, body }) => {

  switch (conType) {
    case 'multipart/form-data':
      return toFormData(formData)
    case 'application/x-www-form-urlencoded':
      return arrToObject(formEncode)
    case 'text/plain':
      if (textRef.current) return textRef.current.value
      break
    default:
      if (jsonRef.current) return jsonRef.current.value
  }



}






function parseUrlToParams(currentUrl) {
  const queryString = currentUrl.split("?")[1] || "";
  return Array.from(new URLSearchParams(queryString)).map(([key, value]) => ({
    key,
    value,
    active: true,
  }));
}
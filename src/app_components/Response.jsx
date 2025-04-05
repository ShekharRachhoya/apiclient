import { Badge, Box, Card, DataList, Heading, HStack, Image, Spinner, Stack, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegImage } from 'react-icons/fa'
import JSONPretty from 'react-json-pretty'

const Response = ({ response }) => {

    const [text, setText] = useState({})
    const [loading, setLoading] = useState(false)
    const { data, status, statusText, headers, resTime } = response
    const blob = new Blob([data], { type: headers['content-type'] })
    const dataSize = blob.size

    const getText = async () => {
        setLoading(true)
        const str = await blob.text()
        setText(str)
        setLoading(false)
    }

    useEffect(() => {
        getText()
    }, [response])




    return (
        <Card.Root mt={10}>
            <Card.Header>  <Card.Title>Response
            </Card.Title>
            </Card.Header>
            <Card.Body>
                {

                    loading ? <Spinner /> : <Stack>
                        <HStack alignSelf='end' justify='end' >
                            {
                                status < 200 ? <Badge colorPalette='blue' variant='subtle'>{status} ({statusText})</Badge> : (

                                    status < 300 ? <Badge colorPalette='green' variant='subtle'>{status} ({statusText})</Badge> :

                                        <Badge colorPalette='red' variant='subtle'>{status} ({statusText})</Badge>

                                )

                            }

                            <Badge>{Math.round(resTime)} ms</Badge>
                            <Badge>{dataSize} bytes</Badge>
                        </HStack>
                        <Tabs.Root defaultValue='body' lazyMount >
                            <Tabs.List width={['100%', '20%']} >
                                <Tabs.Trigger value='body'>
                                    Body
                                </Tabs.Trigger>
                                <Tabs.Trigger value='headers'>
                                    Headers
                                </Tabs.Trigger>
                                <Tabs.Trigger value='raw'>
                                    <FaRegImage />


                                </Tabs.Trigger>
                            </Tabs.List>

                            <Tabs.Content value='body' overflowX='auto' >
                                <JSONPretty themeClassName='Adventure Time' id="json-pretty" data={text}></JSONPretty>
                            </Tabs.Content>

                            <Tabs.Content value='headers'>
                                <DataList.Root orientation="horizontal">
                                    {Object.keys(headers).map((key) => (
                                        <DataList.Item key={key}>
                                            <DataList.ItemLabel>{key} : </DataList.ItemLabel>
                                            <DataList.ItemValue> {headers[key]}</DataList.ItemValue>
                                        </DataList.Item>
                                    ))}
                                </DataList.Root>

                            </Tabs.Content>

                            <Tabs.Content value='raw' overflowX='auto' >

                                <Preview res={blob} />

                            </Tabs.Content>


                        </Tabs.Root>
                    </Stack>

                }

            </Card.Body>
        </Card.Root >
    )
}

export default Response


const Preview = ({ res }) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        // URL.revokeObjectURL(url)
        const imageUrl = URL.createObjectURL(res);
        setUrl(imageUrl)
    }, [res])



    return (
        <>
            <Box asChild width='100%' height='400px' >
                <iframe src={url ? url : null} >
                </iframe>
            </Box>
        </>
    )





} 
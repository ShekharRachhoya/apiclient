import { useData } from '@/context/context'
import { Box, Button, Card, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const History = ({ onClose }) => {
    const { response, setResponse, urlRef, setFormData, setFormEncode, setHeaders, setQueryParams, setMethod, setConType, jsonRef, textRef, setAuth } = useData()

    const [reqs, setReqs] = useState([])

    const onDelete = (index) => {

        const newItems = reqs.filter((r, i) => i !== index)
        localStorage.setItem('history', JSON.stringify(newItems))
        setReqs(newItems)

    }


    const onLoad = (h) => {
        if (onClose) onClose()
        const { data, auth, conType, method, url, headers, queryParams } = h
        setMethod(method)
        urlRef.current.value = url
        setHeaders(headers)
        setResponse(null)
        setQueryParams(queryParams)
        setConType(conType)
        setAuth(auth)

        if (conType === 'none') return
        if (conType === 'application/json') if (jsonRef.current) return jsonRef.current.value = data
        if (conType === 'text/plain') if (textRef.current) return textRef.current.value = data
        if (conType === 'multipart/form-data') return setFormData(data)
        if (conType === 'application/x-www-form-urlencoded') return setFormEncode(data)



    }


    useEffect(() => {

        const history = localStorage.getItem('history')
        const r = JSON.parse(history) || []
        setReqs(r)


    }, [response])



    return (

        <>
            <Heading>History</Heading>
            {
                reqs.map((h, i) => (
                    <Card.Root key={i + 'hj'}>
                        <Card.Body py={2}>
                            <Stack>
                                <Box whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                                    <strong>{h.method.toUpperCase()}</strong> - {h.url}
                                </Box>
                                <HStack justify='end'>
                                    <Button size='xs' onClick={() => onLoad(h)}>Load</Button>
                                    <Button variant='outline' size='xs'
                                        onClick={() => onDelete(i)}
                                    >Delete</Button></HStack>
                            </Stack>
                        </Card.Body>
                    </Card.Root>
                ))
            }

        </>



    )
}

export default History

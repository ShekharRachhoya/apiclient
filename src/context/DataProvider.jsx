import React, { useMemo, useRef, useState } from 'react'
import { DataContext } from './context';


const DataProvider = ({ children }) => {
    const urlRef = useRef(null)
    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('get')
    const [conType, setConType] = useState('')
    const [queryParams, setQueryParams] = useState([{ key: "", value: "", active: true }]);
    const [response, setResponse] = useState(null)
    const [headers, setHeaders] = useState([])
    const jsonRef = useRef(null)
    const textRef = useRef(null)


    const [body, setBody] = useState("")
    const [formData, setFormData] = useState([{ key: "", value: "", active: true, type: 'text' }, { key: "", value: "", active: true, type: 'text' }])
    const [formEncode, setFormEncode] = useState([{ key: "", value: "", active: true, }, { key: "", value: "", active: true, }])
    const [auth, setAuth] = useState({ type: '', token: '' })

    const values = useMemo(() => {
        return {
            response, setResponse,
            url, setUrl, queryParams, setQueryParams, headers, setHeaders
            , body, setBody, auth, setAuth
            , conType, setConType, method, setMethod, formData, setFormData, formEncode, setFormEncode, urlRef, jsonRef, textRef
        }
    }, [url, auth, response, queryParams, headers, body, conType, method, formData, formEncode])



    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider

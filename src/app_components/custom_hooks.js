import { useRef } from "react"

const useDVInput = () => {

    const inputRef = useRef(null)
    const timerRef = useRef(null)


    const handleChange = (value, setValue) => {

        inputRef.current = value
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setValue(inputRef.current)
        }, 1000)


    }


    return handleChange




}




export { useDVInput }
import { useData } from "@/context/context";
import { Button, Checkbox, HStack, IconButton, Input, Stack } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDVInput } from "./custom_hooks";
import { useRef } from "react";


const Headers = () => {
    const handleChange = useDVInput()
    const { headers, setHeaders, conType, method, auth } = useData()


    const onChange = (index, field, v) => {
        // handleChange(v,
        //     (value) => {
                const updateHeaders = [...headers];
                updateHeaders[index][field] = v;
                setHeaders(updateHeaders);
        //     }
        // )

    };

    // Handle query parameter updates



    // Add a new parameter
    const handleAddRow = () => {
        setHeaders([...headers, { key: "", value: "", active: true }]);
    };

    // Delete a parameter
    const handleDeleteRow = (index) => {
        const updateHeaders = headers.filter((_, i) => i !== index);
        setHeaders(updateHeaders);

    };

    // Toggle parameter active state
    const handleCheckboxChange = (index) => {
        const updateHeaders = [...headers];
        updateHeaders[index].active = !updateHeaders[index].active;
        setHeaders(updateHeaders);
    };


    return (
        <Stack>
            {method !== 'GET' && (
                method !== 'DELETE' && (conType && <HStack>
                    <Checkbox.Root
                        disabled
                        size='sm'
                        checked
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                    <Input disabled placeholder='Content-Type' size="xs" />
                    <Input disabled placeholder={conType} size="xs" />
                    <IconButton visibility='hidden'>
                        <AiOutlineDelete />
                    </IconButton>
                </HStack>)
            )
            }



            {auth.type &&
                (
                    auth.token && <HStack>
                        <Checkbox.Root
                            disabled
                            size='sm'
                            checked
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                        </Checkbox.Root>
                        <Input disabled placeholder='Authorization' size="xs" />
                        <Input disabled placeholder={auth.token} size="xs" />
                        <IconButton visibility='hidden'>
                            <AiOutlineDelete />
                        </IconButton>
                    </HStack>)
            }

            {

                headers.map((h, index) => (<HStack key={index}>
                    <Checkbox.Root
                        disabled={h.key === 'Content-Type'}
                        size='sm'
                        checked={h.active}
                        onCheckedChange={(e) => handleCheckboxChange(index)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>

                    {/* <Row Key={h.key} value={h.value} index={index} onChange={onChange} /> */}

                    <Input value={h.key} placeholder='key' onChange={(e) => onChange(index, 'key', e.target.value)} size="xs" />
                    <Input value={h.value} onChange={(e) => onChange(index, 'value', e.target.value)} placeholder="value" size="xs" />


                    <IconButton variant='outline' size='xs' onClick={() => handleDeleteRow(index)}>
                        <AiOutlineDelete />
                    </IconButton>

                </HStack>
                ))
            }
            <Button variant='outline' size='sm' w={['1/2', '1/12']} onClick={handleAddRow}>Add Row</Button>

        </Stack>
    );
};

export default Headers;





const Row = ({ Key, value, index, onChange }) => {
    const keyRef = useRef(null)
    const valueRef = useRef(null)

    if (keyRef.current && Key) keyRef.current.value = Key
    if (valueRef.current && value) valueRef.current.value = value


    return (
        <>
            <Input placeholder='key' ref={keyRef} onChange={(e) => onChange(index, 'key', e.target.value)} size="xs" />

            <Input ref={valueRef} onChange={(e) => onChange(index, 'value', e.target.value)} placeholder="value" size="xs" />

        </>
    )



}
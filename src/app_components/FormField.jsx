
import { Button, Checkbox, CloseButton, FileUpload, HStack, IconButton, Input, InputGroup, NativeSelect, Stack } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuFileUp } from "react-icons/lu";
import { useDVInput } from "./custom_hooks";
import { useRef } from "react";


const FormFields = ({ data, setData, fileSupport }) => {
    const handleChange = useDVInput()

    const handleType = (index, newType) => {
        const updateData = [...data]
        updateData[index].type = newType
        updateData[index].value = ''
        setData(updateData);
    }


    const onChange = (index, field, v) => {
        handleChange(v,
            (value) => {
                const updateData = [...data];
                updateData[index][field] = value;
                setData(updateData);
            }
        )

    };


    // Handle query parameter updates
    const handleInputChange = (index, field, value) => {

        const updateData = [...data];
        updateData[index][field] = value;
        setData(updateData);

    };




    // Add a new parameter
    const handleAddRow = () => {
        if (!fileSupport) return setData([...data, { key: "", value: "", active: true }]);
        return setData([...data, { key: "", value: "", active: true, type: 'text' }]);
    };

    // Delete a parameter
    const handleDeleteRow = (index) => {
        const updateData = data.filter((_, i) => i !== index);
        setData(updateData);

    };

    // Toggle parameter active state
    const handleCheckboxChange = (index) => {
        const updateData = [...data];
        updateData[index].active = !updateData[index].active;
        setData(updateData);
    };


    return (
        <Stack>
            {

                data.map((h, index) => (

                    fileSupport ? <HStack key={index}>
                        <Checkbox.Root
                            size='sm'
                            checked={h.active}
                            onCheckedChange={(e) => handleCheckboxChange(index)}
                        >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />

                        </Checkbox.Root>

                        <InputGroup width='45%' flex="1" endElement={<TypeSelect type={h.type} setType={(value) => handleType(index, value)} />}>
                            <Input size="xs"
                                value={h.key}
                                onChange={(e) => handleInputChange(index, 'key', e.target.value)}

                                placeholder="key" />
                        </InputGroup>


                        {

                            h.type === 'text' ? <Input width='45%' value={h.value} onChange={(e) => handleInputChange(index, 'value', e.target.value)} placeholder="value" size="xs" /> :

                                <FileUpload.Root onFileChange={(e) => handleInputChange(index, 'value', e.acceptedFiles)} maxFiles={5} w='45%' gap="1">
                                    <FileUpload.HiddenInput />
                                    <InputGroup
                                        startElement={<LuFileUp />}
                                        endElement={
                                            <FileUpload.ClearTrigger asChild>
                                                <CloseButton
                                                    me="-1"
                                                    size="xs"
                                                    variant="plain"
                                                    focusVisibleRing="inside"
                                                    focusRingWidth="2px"
                                                    pointerEvents="auto"
                                                />
                                            </FileUpload.ClearTrigger>
                                        }
                                    >
                                        <Input size='xs' asChild>
                                            <FileUpload.Trigger>
                                                <FileUpload.FileText lineClamp={1} />
                                            </FileUpload.Trigger>
                                        </Input>
                                    </InputGroup>
                                </FileUpload.Root>


                        }


                        <IconButton size='xs' onClick={() => handleDeleteRow(index)}>
                            <AiOutlineDelete />
                        </IconButton>

                    </HStack> :



                        <HStack key={index}>
                            <Checkbox.Root
                                size='sm'
                                checked={h.active}
                                onCheckedChange={(e) => handleCheckboxChange(index)}
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />

                            </Checkbox.Root>

                            <Input placeholder='key' value={h.key} onChange={(e) => handleInputChange(index, 'key', e.target.value)} size="xs" />
                            <Input value={h.value} onChange={(e) => handleInputChange(index, 'value', e.target.value)} placeholder="value" size="xs" />

                            {/* <Row Key={h.key} value={h.value} index={index} onChange={onChange} /> */}
                            <IconButton size='xs' onClick={() => handleDeleteRow(index)}>
                                <AiOutlineDelete />
                            </IconButton>

                        </HStack>



                ))
            }
            <Button variant='outline' size='sm' w={['1/2', '1/12']} onClick={handleAddRow}>Add Row</Button>

        </Stack >
    );
};

export default FormFields;



const TypeSelect = ({ type, setType }) => (
    <NativeSelect.Root size="xs" variant="plain" width="auto" me="-1">
        <NativeSelect.Field value={type} onChange={(e) => setType(e.currentTarget.value)}
            fontSize="sm">
            <option value="text">text</option>
            <option value="file">file</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
    </NativeSelect.Root>
)




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
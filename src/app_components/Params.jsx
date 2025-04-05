import { useData } from "@/context/context";
import { Button, Checkbox, HStack, IconButton, Input, Stack } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDVInput } from "./custom_hooks";
import { useRef } from "react";


const ReqParams = () => {
  const handleChange = useDVInput()
  const { urlRef, queryParams, setQueryParams, url, setUrl } = useData()



  // Generate URL from query parameters
  function generateUrl(params) {
    const baseUrl = urlRef.current.value.split("?")[0];
    const activeParams = params.filter((param) => param.active);
    const queryString = new URLSearchParams(
      activeParams.map(({ key, value }) => [key, value])
    ).toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }




  const onChange = (index, field, v) => {
    handleChange(v,
      (value) => {
        const updatedParams = [...queryParams];
        updatedParams[index][field] = value;
        setQueryParams(updatedParams);
        if (urlRef.current) urlRef.current.value = generateUrl(updatedParams)
      }
    )

  }



  // Handle query parameter updates
  const handleParamChange = (index, field, value) => {
    const updatedParams = [...queryParams];
    updatedParams[index][field] = value;
    setQueryParams(updatedParams);
    setUrl(generateUrl(updatedParams));
  };

  // Add a new parameter
  const handleAddRow = () => {
    setQueryParams([...queryParams, { key: "", value: "", active: true }]);
  };



  // Delete a parameter
  const handleDeleteRow = (index) => {
    const updatedParams = queryParams.filter((_, i) => i !== index);
    setQueryParams(updatedParams);
    setUrl(generateUrl(updatedParams));
  };

  // Toggle parameter active state
  const handleCheckboxChange = (index) => {
    const updatedParams = [...queryParams];
    updatedParams[index].active = !updatedParams[index].active;
    setQueryParams(updatedParams);
    setUrl(generateUrl(updatedParams));
  };


  return (
    <Stack>

      {

        queryParams.map((param, index) => (<HStack key={index}>
          <Checkbox.Root
            size='sm'
            checked={param.active}
            onCheckedChange={(e) => handleCheckboxChange(index)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>


          <Row Key={param.key} value={param.value} index={index} onChange={onChange} />



          <IconButton size='xs' onClick={() => handleDeleteRow(index)}>
            <AiOutlineDelete />
          </IconButton>

        </HStack>
        ))
      }

      <Button variant='outline' size='sm' w={['1/2', '1/12']} onClick={handleAddRow}>Add Row</Button>
    </Stack>
  );
};

export default ReqParams;



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
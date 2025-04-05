

import { useData } from "@/context/context"
import { Field, HStack, RadioGroup, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import FormFields from "./FormField"
import { useDVInput } from "./custom_hooks"

const Body = () => {
    const handleChnage = useDVInput()
    const { conType, setConType, formData, setFormData, formEncode, setFormEncode, textRef, jsonRef} = useData()


    return (

        <>
            <RadioGroup.Root mb={5} size='sm' value={conType} onValueChange={(e) => setConType(e.value)}>
                <HStack gap="6" flexWrap='wrap'>
                    {items.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                    ))}
                </HStack>
            </RadioGroup.Root>

            {
                conType === 'application/json' && <Field.Root>  <Textarea mt={5} rows={10} placeholder=' {"key" : "value"}'  ref={jsonRef} />
                </Field.Root>

            }



            {
                conType === 'text/plain' && <Field.Root>  <Textarea mt={5} rows={10} placeholder='text/plain' ref={textRef} />
                </Field.Root>

            }




            {
                conType === 'application/x-www-form-urlencoded' && <FormFields data={formEncode} setData={setFormEncode} fileSupport={false} />

            }


            {
                conType === 'multipart/form-data'
                && <FormFields data={formData} setData={setFormData} fileSupport={true} />

            }





        </>

    )
}



export default Body


const items = [
    { label: "none", value: '' },
    { label: "json", value: 'application/json' },
    { label: "form-data", value: 'multipart/form-data' },
    { label: "x-www-form-urlencoded", value: "application/x-www-form-urlencoded" },
    { label: "text/plain", value: "text/plain" },
]

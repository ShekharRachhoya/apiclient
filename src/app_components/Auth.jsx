
import { Card, Field, HStack, Input, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDVInput } from "./custom_hooks"
import { useData } from "@/context/context"
import { PasswordInput } from "@/components/ui/password-input"

const Auth = () => {
    const handleChange = useDVInput()
    const { auth, setAuth } = useData()
    const [basicAuth, setBasicAuth] = useState({ user: '', pass: '' })



    const onBasicChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange(value, (v) => {
            setBasicAuth({ ...basicAuth, [name]: v })
            if (basicAuth.user !== '' || basicAuth.pass !== '') {
                const credentials = `${basicAuth.user}:${basicAuth.pass}`;
                setAuth({ ...auth, token: `Basic ${btoa(credentials)}` })

            }
        })

    }



    const onChange = (e) => {

        if (auth.type === 'Custom') return handleChange(e.target.value, (v) => setAuth({ ...auth, token: v }))
        handleChange(e.target.value, (v) => setAuth({ ...auth, token: `Bearer ${v}` }))

    }



    return (
        <>
            <RadioGroup.Root size='sm' value={auth.type} onValueChange={(e) => setAuth({ type: e.value, token: '' })}>
                <HStack gap="6">
                    {items.map((item) => (
                        <RadioGroup.Item key={item.value} value={item.value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                    ))}
                </HStack>
            </RadioGroup.Root >

            <Stack mt={10} w={['100%', "50%"]} >
                {

                    auth.type === 'Bearer' && <Field.Root>
                        <Field.Label>Token</Field.Label>
                        <Input onChange={onChange} placeholder="me@example.com" />
                    </Field.Root>


                }


                {

                    auth.type === 'Custom' && <Field.Root>
                        <Field.Label>Authorization</Field.Label>
                        <Input onChange={onChange} placeholder="me@example.com" />
                    </Field.Root>


                }




                {

                    auth.type === 'Basic' &&

                    <Card.Root>
                        <Card.Body>
                            <Field.Root>
                                <Field.Label>Username</Field.Label>
                                <Input name="user" onChange={onBasicChange} />
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Password</Field.Label>
                                <PasswordInput autoFocus={false} autoComplete="new-password" onChange={onBasicChange} name='pass' />
                            </Field.Root>
                        </Card.Body>
                    </Card.Root>

                }

            </Stack>
            {auth.type && <Text>
                The authorization header will be automatically generated when you send the request.</Text>}
        </>

    )
}


export default Auth

const items = [
    { label: "None", value: '' },
    { label: "Bearer", value: "Bearer" },
    { label: "Basic Auth", value: "Basic" },
    { label: "Custom", value: "Custom" },

]

import { useEffect, useState } from 'react'
import Article from '../components/Article/Article'
import client from '../providers/client'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

// import { format, startOfYesterday } from 'date-fns'
import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton, Input, InputGroup, InputLeftAddon, Select, Stack, Text, useEditableControls } from '@chakra-ui/react'

const Home = () => {
    // const today = format(new Date(), 'yyyy-MM-dd')
    // const yesterday = format(startOfYesterday(), 'yyyy-MM-dd')
    const [data, setData] = useState([])
    const [search, setSearch] = useState('?_limit=10')
    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles${search}`)
                setData(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        request()
    }, [search])



    const saveArticle = (publishedAt, title, id) => {
        let values = JSON.parse(localStorage.values)
        if (!values[0]) {
            localStorage.setItem(`View-1`, JSON.stringify({ publishedAt, title, id }))
            localStorage.setItem('values', JSON.stringify([2, 3]))
            return
        }
        console.log(values)
        localStorage.setItem(`View-${values[0]}`, JSON.stringify({ publishedAt, title, id }))
        values.shift()
        localStorage.setItem('values', JSON.stringify(values))
        console.log(localStorage.values)
        return
    }

    function CustomControlsExample() {
        function EditableControls() {
            const {
                isEditing,
                getSubmitButtonProps,
                getCancelButtonProps,
                getEditButtonProps,
            } = useEditableControls()

            return isEditing ? (
                <ButtonGroup justifyContent='center' size='sm' >
                    <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                    <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
                </ButtonGroup>
            ) : (
                <Flex justifyContent='center'>
                    <IconButton ml={4} h={6} icon={<EditIcon />} {...getEditButtonProps()} />
                </Flex>
            )
        }
        return (
            <Editable
                textAlign='center'
                defaultValue={'Usuário'}
                fontSize='2xl'
                isPreviewFocusable={false}
                display='flex'
                alignItems='center'
            >
                <Text color='white' mr={2}>Olá,</Text>
                <EditablePreview color='white' />
                <Input as={EditableInput} ariant='filled' focusBorderColor='lime' color='white' fontSize={'lg'} height='60px' width='150px' />
                <EditableControls />
            </Editable>
        )
    }

    return (
        <Stack pt={5} display='flex' flexDirection='column' alignItems='center' bgColor='#1a202c'>
            <CustomControlsExample />
            <Text color='white' fontSize={'sm'}>Diverta-se com as informações mais recentes!</Text>
            <Input variant='filled' focusBorderColor='lime' placeholder='Pesquise título de artigos'
                type='text' name='search' width={[350, 600]} color='white' fontSize={'lg'} height='60px'
                onChange={(event) => setSearch('?title_contains=' + event.target.value)} autoComplete='off' />
            <InputGroup w={'fit-content'}>
                <InputLeftAddon children='Mostra artigos' />
                <Select name='quantity' defaultValue='10' focusBorderColor='lime' bg={'black'} width={'80px'}
                    borderRadius='0 5px 5px 0' color='white'
                    onChange={(event) => setSearch('?_limit=' + event.target.value)}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </Select>
            </InputGroup>
            <Flex direction='column' align='center'>
                <Text fontSize={'2xl'} color='white' mt={10}>Artigos vistos recentemente</Text>
                <Flex direction='column' gap='2px' border='2px solid red'>
                    {Object.values(localStorage).map((elem, index) => {
                        const info = JSON.parse(elem)
                        return < Article key={index} id={info.id} title={info.title} publishedAt={info.publishedAt} />
                    })}
                </Flex>
            </Flex>
            <Flex direction='column' gap='10px' align='center' pt={8} >
                <Text fontSize={'2xl'} color='white'>Artigos lançados recentemente</Text>
                {data.map(elem => <Article key={Number(elem.id)} id={elem.id} title={elem.title} publishedAt={elem.publishedAt} saveArticle={saveArticle} />)}
            </Flex>
        </Stack>
    )
}

export default Home

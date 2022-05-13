import { useEffect, useState } from 'react'
import Article from '../components/Article/Article'
import client from '../providers/client'

// import { format, startOfYesterday } from 'date-fns'
import { Button, Flex, FormControl, Input, InputGroup, InputLeftAddon, Select, Stack, Text } from '@chakra-ui/react'
import { format, compareAsc, setDay } from 'date-fns'

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
        localStorage.setItem(`View-${values[0]}`, JSON.stringify({ publishedAt, title, id }))
        values.shift()
        localStorage.setItem('values', JSON.stringify(values))
        return
    }

    const filterByDate = async (element) => {
        if (element.name === 'first-date') {
            setData(data.filter(elem => {
                const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
                const dateFromInput = format(new Date(element.value), 'yyyy-MM-dd')
                return compareAsc(new Date(dateFromInput), new Date(dateFromData)) < 0
            }))
        }
        else {
            console.log(element.value)
            setData(data.filter(elem => {
                const dateFromData = format(new Date(elem.publishedAt), 'yyyy-MM-dd')
                const dateFromInput = format(setDay(new Date(element.value), 3), 'yyyy-MM-dd')
                console.log('dateFromInput: ' + dateFromInput)
                return compareAsc(new Date(dateFromData), new Date(dateFromInput)) < 0
            }))
        }
    }

    const resetSearch = () => {
        document.getElementsByName('title-search')[0].value = ''
        document.getElementsByName('first-date')[0].value = ''
        document.getElementsByName('second-date')[0].value = ''
        document.getElementsByName('quantity')[0].value = '10'
        setSearch('?_limit=10')
    }

    return (
        <Stack pt={5} display='flex' flexDirection='column' alignItems='center' bgColor='#1a202c'>
            <Text color='white' fontSize={'sm'}>Tem algo em mente? Pesquise abaixo!</Text>
            <Input name='title-search' variant='filled' placeholder='Pesquise por título de artigos'
                type='text' width={[310, 480]} color='black' _focus={{ color: 'white', backgroundColor: 'transparent', border: '2px solid lime' }} fontSize={'lg'} height='60px'
                onChange={(event) => setSearch('?title_contains=' + event.target.value)} autoComplete='off' />
            <InputGroup w={'fit-content'}>
                <InputLeftAddon children='Mostra artigos' />
                <Select name='quantity' defaultValue='10' focusBorderColor='lime' bg={'black'} width={'80px'}
                    borderRadius='0 5px 5px 0' color='white'
                    onChange={(event) => {
                        document.getElementsByName('first-date')[0].value = ''
                        document.getElementsByName('second-date')[0].value = ''
                        setSearch('?_limit=' + event.target.value)
                    }}>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </Select>
            </InputGroup>
            <FormControl onChange={(elem) => filterByDate(elem.target)} w={'fit-content'}>
                <InputGroup>
                    <InputLeftAddon children='Do dia:' px={'15px'} w={'80px'} bgColor='black' color='white' />
                    <Input name='first-date' type='date' color={'black'} bgColor='white' focusBorderColor='lime' width={'170px'}
                        borderRadius='0 5px 5px 0' placeholder='aaaaa' />
                </InputGroup>
                <InputGroup w={'fit-content'} mt='5px'>
                    <InputLeftAddon children='Até dia:' px={'15px'} w={'80px'} bgColor='black' color='white' />
                    <Input name='second-date' type='date' color={'black'} bgColor='white' focusBorderColor='lime' width={'170px'}
                        borderRadius='0 5px 5px 0' />
                </InputGroup>
            </FormControl>

            <Button colorScheme='teal' variant='solid' onClick={() => resetSearch()}>Limpar pesquisa</Button>
            <Flex direction='column' align='center'>
                {localStorage.length > 1 ? <Text fontSize={['xl', '2xl']} color='white' mt={5}>Artigos vistos recentemente</Text> : ''}
                <Flex direction='column' gap='2px'>
                    {Object.values(localStorage).map((elem, index) => {
                        const info = JSON.parse(elem)
                        return < Article key={index} id={info.id} title={info.title} publishedAt={info.publishedAt} />
                    })}
                </Flex>
            </Flex>
            <Flex direction='column' gap='10px' align='center' pt={5} pb='100px'>
                <Text fontSize={['xl', '2xl']} color='white'>Artigos lançados recentemente</Text>
                {data.map(elem => <Article key={Number(elem.id)} id={elem.id} title={elem.title} publishedAt={elem.publishedAt} saveArticle={saveArticle} />)}
            </Flex>
        </Stack>
    )
}

export default Home

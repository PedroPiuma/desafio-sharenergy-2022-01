import { useEffect, useState } from 'react'
import Article from '../components/Article/Article'
import client from '../providers/client'
import { Button, Flex, FormControl, Input, InputGroup, InputLeftAddon, Select, Stack, Text } from '@chakra-ui/react'
import { format, compareAsc, setDay } from 'date-fns'

const Home = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('?_limit=10')
    // let pagAux = 0
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

    // const articles = data.map(element => <Article key={Number(element.id)} id={element.id} title={element.title} publishedAt={element.publishedAt} saveArticle={saveArticle} />)

    // const Pages = () => {
    //     // let result = []
    //     // for (let i = 0; i < (pagAux / 10); i++) {
    //     // result.push(<Page init={0} end={0} />)
    //     // }
    //     // return (
    //     //     result
    //     // )

    //     return (
    //     <TabPanel>
    //         <Page init={0} end={10} />
    //     </TabPanel>
    //     )
    // }

    // const Page = ({ init, end }) => {
    //     return (
    //         articles.slice(init, end)
    //     )
    // }



    return (
        <Stack pt={5} display='flex' flexDirection={['column', 'column', 'column', 'row']} alignItems='center' bgColor='#1a202c' justify={'space-around'}>
            <Flex direction={'column'} align='center' gap={4} alignSelf={['', '', '', 'flex-start']} pt={['', '', '', '30px']}>
                <Text color='white' fontSize={['sm', 'lg']}>Tem algo em mente? Pesquise abaixo!</Text>
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
                <Button color={'#04fb04'} bg='transparent' border={'1px solid white'} variant='solid' onClick={() => resetSearch()}>Limpar pesquisa</Button>
            </Flex>
            <Flex direction={'column'}>
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
                    {data.map(element => <Article key={Number(element.id)} id={element.id} title={element.title} publishedAt={element.publishedAt} saveArticle={saveArticle} />)}
                    {/* <Tabs variant='soft-rounded' colorScheme='green'>
                        <TabList>
                            {data.map((_, index) => {
                                let result
                                if (index % 10 === 0) {
                                    pagAux += 10
                                    result = <Tab>Pág. {pagAux / 10}</Tab>
                                }
                                return result
                            })}
                        </TabList>
                        <TabPanels>
                            <Pages />
                        </TabPanels>
                    </Tabs> */}
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Home

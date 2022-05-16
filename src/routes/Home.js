import { useEffect, useState } from 'react'
import client from '../providers/client'
import { Flex, Stack, Text } from '@chakra-ui/react'
import SearchBox from '../components/SearchBox/SearchBox'
import ViewedArticles from '../components/ViewedArticles/ViewedArticles'
import Article from '../components/Article/Article'

localStorage.setItem('values', JSON.stringify([1, 2, 3]))

const Home = () => {
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
    return (
        <Stack pt={5} display='flex' flexDirection={['column', 'column', 'column', 'row']} alignItems='center' bgColor='#1a202c' justify={'space-around'} minHeight='100vh'>
            <SearchBox setSearch={setSearch} setData={setData} data={data} />
            <Flex direction={'column'} >
                <Flex direction='column' align='center'>
                    {localStorage.length > 1 ? <Text fontSize={['xl', '2xl']} color='white' mt={5}>Artigos vistos recentemente</Text> : ''}
                    <ViewedArticles />
                </Flex>
                <Flex direction='column' gap='10px' align='center' pt={5} pb='100px'>
                    <Text fontSize={['xl', '2xl']} color='white'>Artigos lançados recentemente</Text>
                    {data.map(element => <Article key={Number(element.id)} id={element.id} title={element.title} publishedAt={element.publishedAt} />)}
                </Flex>
            </Flex>
        </Stack>
    )
}

export default Home

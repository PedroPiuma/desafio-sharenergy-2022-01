import { Flex, Text, Image, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../providers/client'

function ArticleInfo() {
    const { idinfo } = useParams()
    const [data, setData] = useState('')

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles/${idinfo}`)
                setData(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        request()
    }, [idinfo])

    const { id, title, imageUrl, newsSite, publishedAt, summary, url, launches = [] } = data

    return (
        <Flex bgColor={'black'} minHeight='100vh' direction={'column'}
            gap='20px' color={'white'} align='center'>
            <Image src={imageUrl} width='300px' />
            <Text>ID: {id}</Text>
            <Text>TITLE: {title}</Text>
            <Text>SUMMARY: {summary}</Text>
            <Link href={url} color={'red'}>NewsSite: {newsSite}</Link>
            <Text>PUBLISHEDAT: {publishedAt}</Text>
            <Flex>
                {launches.map(el => <Text>PROVIDER: {el.provider}</Text>)}
            </Flex>
        </Flex>
    )
}

export default ArticleInfo
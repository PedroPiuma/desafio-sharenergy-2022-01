import { Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import client from '../../providers/client'
import saveArticle from '../../functions/saveArticle'

const Launch = (props) => {
    const { checkId, id, setLibrary, setIdSearch } = props
    const [data, setData] = useState([])

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles/launch/${id}`)
                setData(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        request()
    }, [id])

    return (
        data.filter(el => el.id !== checkId).map((el, index) => {
            if (index === 0 && el.id !== checkId) setLibrary(true)
            const publishedDate = el.publishedAt ? format(new Date(el.publishedAt), "dd/MM/yyyy HH:mm:ss") : false
            const updatedDate = el.updatedAt ? format(new Date(el.updatedAt), "dd/MM/yyyy HH:mm:ss") : false
            return (
                <Flex direction='column' align={'center'} justify='space-between' bgColor='#bcfbb1' width={['315px', '450px', '750px', '500px', '750px']}
                    cursor='pointer'
                    borderRadius='8px' minHeight={'100px'} p='5px' border='2px solid #999999' onClick={() => {
                        setIdSearch(el.id)
                        saveArticle(el.publishedAt, el.title, el.id)
                    }}>
                    <Text fontSize={['lg', 'xl']} color='black'>{el.title}</Text>
                    <Text alignSelf='flex-end' color='black' align={'end'}>Publicado em: {publishedDate}</Text>
                    <Text alignSelf='flex-end' color='black' align={'end'}>Última atualização: {updatedDate}</Text>
                </Flex >
            )
        })
    )
}

export default Launch
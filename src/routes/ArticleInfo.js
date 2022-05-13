import { Flex, Text, Image, Link, Stack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../providers/client'

function ArticleInfo() {
    const { idinfo } = useParams()
    const [data, setData] = useState('')
    const [zoom, setZoom] = useState(false)

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

    const { id = 'Carregando...', title = 'Carregando...', imageUrl, newsSite = 'Carregando...', publishedAt, updatedAt, summary = 'Carregando...', url, launches = [] } = data
    const published = publishedAt ? format(new Date(publishedAt), 'dd/MM/yyyy') : 'Carregando...'
    const updated = updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy') : 'Carregando...'

    return (
        <Flex bgColor={'black'} minHeight='100vh' px={['30px']} direction={'column'}
            gap='20px' color={'white'} align='center' pt={[5]}>
            <Text alignSelf={'flex-start'} fontSize='sm' ml={'10px'} pb={[5]}>ID: {id}</Text>
            <Image src={imageUrl} height={zoom ? '100%' : ['210px', '300px']}
                mb={['', '20px']}
                cursor='pointer' onClick={() => setZoom(!zoom)} />
            <Text as='em' fontSize={'2xl'} mx='20px' align={'center'}>{title}</Text>
            <Text fontSize={['lg']} align={'justify'} w={['310px', '400px']}>{summary}</Text>
            <Stack spacing={0} alignSelf={'flex-end'} align='flex-end' mr={'10px'}>
                <Link href={url} color={'red'} >Fonte: {newsSite}</Link>
                <Text fontSize={'sm'}>Publicado: {published}</Text>
                <Text fontSize={'sm'}>Última atualização: {updated}</Text>
            </Stack>
            <Flex>
                {launches.map(el => <Text>PROVIDER: {el.provider}</Text>)}
            </Flex>
        </Flex>
    )
}

export default ArticleInfo
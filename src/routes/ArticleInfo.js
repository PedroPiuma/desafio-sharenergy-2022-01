import { ArrowBackIcon, ArrowForwardIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { Flex, Text, Image, Link, Stack, Button } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Launch from '../components/Launch/Launch'
import client from '../providers/client'


function ArticleInfo() {
    const { idinfo } = useParams()
    const [idSearch, setIdSearch] = useState(idinfo)
    const [data, setData] = useState('')
    const [zoom, setZoom] = useState(false)
    const [library, setLibrary] = useState(false)

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles/${idSearch}`)
                setLibrary(false)
                setData(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        request()
    }, [idSearch])

    const { id = 'Carregando...', title = 'Carregando...', imageUrl, newsSite = 'Carregando...', publishedAt, updatedAt, summary = 'Carregando...', url, launches = [] } = data
    const published = publishedAt ? format(new Date(publishedAt), 'dd/MM/yyyy') : 'Carregando...'
    const updated = updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy') : 'Carregando...'

    return (
        <Flex bgColor={'black'} minHeight='100vh' px={['30px']} direction={'column'}
            gap='20px' color={'white'} align='center' pt={[5]} pb={['100px']}>
            <Flex gap={['5px']} pt={['', '', '20px']}>
                <Button rightIcon={<ArrowBackIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => setIdSearch(idSearch - 1)}>Anterior</Button>
                <Button rightIcon={<RepeatClockIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => setIdSearch(idinfo)}>Visto primeiramente</Button>
                <Button rightIcon={<ArrowForwardIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => setIdSearch(idSearch + 1)}>Próximo</Button>
            </Flex>
            <Stack as={Flex} direction='column' align={'center'} maxWidth={'580px'}>
                <Text alignSelf={'flex-start'} fontSize='sm' ml={'10px'} pb={[5]}>ID: {id}</Text>
                <Image src={imageUrl} width={zoom ? '100%' : ['210px', '300px']} mb={['', '20px']} cursor='pointer' onClick={() => setZoom(!zoom)} />
                <Text as='em' fontSize={'2xl'} mx='20px' align={'center'}>{title}</Text>
                <Text fontSize={['lg']} align={'justify'} w={['310px', '400px']}>{summary}</Text>
                <Stack spacing={0} alignSelf={'flex-end'} align='flex-end' mr={'10px'}>
                    <Link href={url} color={'red'} >Fonte: {newsSite}</Link>
                    <Text fontSize={'sm'}>Publicado: {published}</Text>
                    <Text fontSize={'sm'}>Última atualização: {updated}</Text>
                </Stack>
                <Flex direction={'column'}>
                    {library ? <Text>Launch Library - Artigos Relacionados</Text> : ''}
                    {launches.filter((_, index) => index === 0).map((el, index) => {
                        return (
                            <Flex direction={'column'} gap={'10px'}>
                                <Launch key={index} checkId={id} id={el.id} setLibrary={setLibrary} setIdSearch={setIdSearch} />
                            </Flex>
                        )
                    })}
                </Flex>
            </Stack>

        </Flex>
    )
}

export default ArticleInfo
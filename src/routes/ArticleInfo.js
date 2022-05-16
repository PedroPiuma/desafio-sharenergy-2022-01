import { ArrowBackIcon, ArrowForwardIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { Flex, Text, Image, Link, Stack, Button, Alert, AlertIcon } from '@chakra-ui/react'
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
    const [jumpId, setJumpId] = useState(null)
    const [requestNumber, setRequestNumber] = useState(0)
    const [noId, setNoId] = useState(false)
    const { id = 'Carregando...', title = 'Carregando...', imageUrl, newsSite = 'Carregando...', publishedAt, updatedAt, summary = 'Carregando...', url, launches = [] } = data
    const published = publishedAt ? format(new Date(publishedAt), 'dd/MM/yyyy') : 'Carregando...'
    const updated = updatedAt ? format(new Date(updatedAt), 'dd/MM/yyyy') : 'Carregando...'

    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles/${idSearch}`)
                setLibrary(false)
                setData(response.data)
            } catch (error) {
                if (error.response.status === 404 && jumpId) {
                    if (requestNumber <= 5) {
                        setIdSearch(idSearch + (jumpId))
                        setRequestNumber(requestNumber + 1)
                    } else {
                        setNoId(true)
                        setRequestNumber(null)
                        setIdSearch(idinfo)
                    }
                }
            }
        }
        request()
    }, [idSearch, jumpId, requestNumber, idinfo])

    return (
        <Flex bgColor={'black'} minHeight='100vh' px={['30px']} direction={'column'}
            gap='20px' color={'white'} align='center' pt={[5]} pb={['100px']}>
            <Flex gap={['5px']} pt={['', '', '20px']}>
                <Button rightIcon={<ArrowBackIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => {
                    setJumpId(-1)
                    setIdSearch(Number(idSearch) - 1)
                    setNoId(false)
                }}>Anterior</Button>
                <Button rightIcon={<RepeatClockIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => {
                    setNoId(false)
                    setIdSearch(idinfo)
                }}>Visto primeiramente</Button>
                <Button rightIcon={<ArrowForwardIcon />} borderColor={'#04fb04'} _hover={{ color: '#04fb04' }} variant='outline' size={['sm']} fontSize={['12px', '14px']} px={['5px', '20px']} onClick={() => {
                    setJumpId(1)
                    setIdSearch(Number(idSearch) + 1)
                    setNoId(false)
                }}>Próximo</Button>
            </Flex>
            {noId ? <Alert status='info' w='fit-content' borderRadius={'35px'} color='blackAlpha.600'>
                <AlertIcon />
                Limite de artigos atingido.
            </Alert> : ''}
            <Stack as={Flex} direction='column' align={'center'} >
                <Text fontSize='sm' ml={'10px'} pb={[5]}>ID: {id}</Text>
                <Image src={imageUrl} width={zoom ? '100%' : ['210px', '300px', '550px']} mb={['', '20px']} cursor='pointer' borderRadius={'2px'} onClick={() => setZoom(!zoom)} />
                <Text as='em' fontSize={['lg', '2xl']} mx='20px' align={'center'} pt={['5px', '15px', '35px']} w={['310px', '400px']}>{title}</Text>
                <Text fontSize={['md', 'lg']} align={'justify'} w={['310px', '400px']}>{summary}</Text>
                <Stack spacing={0} alignSelf={'flex-end'} align='flex-end' mr={'10px'}>
                    <Link href={url} color={'red'} >Fonte: {newsSite}</Link>
                    <Text fontSize={'sm'}>Publicado: {published}</Text>
                    <Text fontSize={'sm'}>Última atualização: {updated}</Text>
                </Stack>
                <Flex direction={'column'} gap='10px'>
                    {library ? <Text>Launch Library - Artigos Relacionados</Text> : ''}
                    {launches.filter((_, index) => index === 0).map((el, index) => {
                        return (
                            <Launch key={el.id} checkId={id} id={el.id} setLibrary={setLibrary} setIdSearch={setIdSearch} />
                        )
                    })}
                </Flex>
            </Stack>

        </Flex>
    )
}

export default ArticleInfo

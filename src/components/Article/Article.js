import { format } from 'date-fns'
import { Flex, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import saveArticle from '../../functions/saveArticle'

const Article = (props) => {
    const { publishedAt, title, id = false } = props
    const publishedDate = publishedAt ? format(new Date(publishedAt), "dd/MM/yyyy HH:mm:ss") : false

    const clickArticle = (id) => {
        return id ? saveArticle(publishedAt, title, id) : ''
    }

    return (
        id ? <Flex as={Link} to={`article${id}`} direction='column' align={'center'}
            justify='space-between' bgColor='#bcfbb1' width={['315px', '450px', '750px', '500px', '750px']}
            borderRadius='8px' minHeight={'100px'}
            p='10px' border='2px solid #999999' onClick={() => clickArticle(id)}>
            <Text fontSize={['lg', 'xl']} color='black'>{title}</Text>
            <Text alignSelf='flex-end' color={'black'}>{publishedDate}</Text>
        </Flex > : ''
    )
}

export default Article

import { format } from 'date-fns'
import { Flex, Text } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
// import { useParams, useLocation, useNavigate } from "react-router-dom";


const Article = (props) => {
    const { publishedAt, title, id = false, saveArticle } = props
    const publishedDate = publishedAt ? format(new Date(publishedAt), "dd/MM/yyyy HH:mm:ss") : false

    const clickArticle = (id) => {
        return id ? saveArticle(publishedAt, title, id) : ''
    }

    return (
        id ? <Flex as={Link} to={`article${id}`} direction='column' align={'center'} justify='space-between' bgColor='antiquewhite'
            p='15px' border='1px solid green' onClick={() => clickArticle(id)}>
            <Text fontSize={['xl']}>{title}</Text>
            <Text>{publishedDate}</Text>
        </Flex > : ''
    )
}

export default Article
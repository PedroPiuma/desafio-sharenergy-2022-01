import { Flex } from "@chakra-ui/react"
import Article from "../Article/Article"

const ViewedArticles = () => {
    return (
        <Flex direction='column' gap='2px'>
            {Object.values(localStorage).map((elem, index) => {
                const info = JSON.parse(elem)
                return < Article key={index} id={info.id} title={info.title} publishedAt={info.publishedAt} />
            })}
        </Flex>
    )
}

export default ViewedArticles

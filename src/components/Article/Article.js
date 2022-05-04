import { Container, Span } from "./Article-styled"
import { format } from 'date-fns'


const Article = (props) => {
    const { publishedAt, title } = props
    const publishedDate = format(new Date(publishedAt), "dd/MM/yyyy HH:mm:ss")
    return (
        <Container>
            <h4>{title}</h4>
            <Span>{publishedDate}</Span>
        </Container>
    )
}

export default Article
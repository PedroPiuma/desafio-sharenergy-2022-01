import { TabPanel } from '@chakra-ui/react'
import { Fragment } from 'react'
import Article from '../Article/Article'

const ArticlePage = ({ tab, page, setSearch, data }) => {
    // console.log('PAGE: ' + page)
    // console.log('PAGE.length: ' + page.length)
    // console.log('PAGE[i]: ' + page[0])
    // console.log('PAGE[i]: ' + page[1])
    // console.log('setSearch: ' + setSearch)
    // console.log(data)
    let result = []
    const request = async () => {
        for (let i = 1; i <= tab; i++) {
            if (page.length > 0 && i !== 1) await setSearch(`?_start=${page[i - 1]}`)
            // if (page.length > 0) await setSearch(`?_start=20`)
            result.push(
                <TabPanel>
                    {data.map(element => <Article key={Number(element.id)} id={element.id} title={element.title} publishedAt={element.publishedAt} />)}
                </TabPanel>
            )
        }
    }
    request()
    console.log(result)
    return (
        <Fragment>
            {result.length !== 0 ? result : ''}
        </Fragment>
    )
}

export default ArticlePage

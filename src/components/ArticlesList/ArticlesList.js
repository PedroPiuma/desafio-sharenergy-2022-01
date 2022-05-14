import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ArticlePage from "../ArticlePage/ArticlePage"

const ArticlesList = ({ data, setSearch }) => {
    // console.log('Em List: ' + data)
    // console.log('setSearch: ' + setSearch)
    let tab = 1
    let page = [0, 10, 20]
    const selectValue = Number(document.getElementsByName('quantity')[0]?.value)
    switch (selectValue) {
        case 25:
            page = [0, 10, 20]
            tab = 3
            break;
        case 50:
            page = [0, 10, 20, 30, 40]
            tab = 5
            break;
        case 100:
            page = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
            tab = 10
            break;
        default:
            break;
    }

    let result = []
    for (let i = 1; i <= tab; i++) {
        result.push(<Tab>Pág. {i}</Tab>)
    }

    return (
        <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
                {result}
            </TabList>

            <TabPanels>
                <ArticlePage page={page} tab={tab} setSearch={setSearch} data={data} />
                <TabPanel>
                    {/* {data.map(element => <Article key={Number(element.id)} id={element.id} title={element.title} publishedAt={element.publishedAt} />)} */}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ArticlesList

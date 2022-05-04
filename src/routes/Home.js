import { useEffect, useState } from 'react'
import Article from '../components/Article/Article'
import client from '../providers/client'
import { Articles } from './styled'
import { format, startOfYesterday, compareAsc, parseISO } from 'date-fns'

const Home = () => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const yesterday = format(startOfYesterday(), 'yyyy-MM-dd')
    const [data, setData] = useState([])
    const [search, setSearch] = useState('?_limit=10')
    useEffect(() => {
        const request = async () => {
            try {
                const response = await client.get(`articles${search}`)
                setData(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        request()
    }, [search])
    // console.log(data)

    // const searchBetweenDates = (event) => {
    // event.preventDefault()
    // const firstData = format(new Date(event.target['first-date'].value), 'dd-MM-yyyy')
    // const secondData = format(new Date(event.target['second-date'].value), 'dd-MM-yyyy')
    // console.log(firstData, secondData)
    // console.log(event.target['first-date'].value)
    // console.log(event.target['second-date'].value)

    // const response = data.filter(e => {
    // const result = [
    // format(new Date(parseISO(e.publishedAt)), 'yyyy-MM-dd'),
    // format(new Date(parseISO(event.target['first-date'].value)), 'yyyy-MM-dd')
    // ].sort(compareAsc)
    // console.log(result)
    // return result
    // })
    // console.log(response)
    // }
    return (
        <div>
            <input type='text' name='search' onChange={(event) => setSearch('?title_contains=' + event.target.value)} autoComplete='off' />
            <select name='quantity' defaultValue='10' onChange={async (event) => await setSearch('?_limit=' + event.target.value)}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
            </select>
            {/* <form onSubmit={(event) => searchBetweenDates(event)}> */}
            {/* <input type={'date'} defaultValue={yesterday} name='first-date' onChange={(event) => console.log(event.target.value)} /> */}
            {/* <input type={'date'} defaultValue={today} name='second-date' onChange={(event) => console.log(typeof (event.target.value))} /> */}
            {/* <button type='submit'>Pesquisar</button> */}
            {/* </form> */}
            <Articles>
                {/* {data.map(e => <Article key={e.id} id={e.id} imageUrl={e.imageUrl} launches={e.launches} newsSite={e.newsSite} publishedAt={e.publishedAt} summary={e.summary} title={e.title} url={e.url} />)} */}
                {data.map(e => <Article key={e.id} title={e.title} publishedAt={e.publishedAt} />)}
            </Articles>
        </div>
    )
}

export default Home

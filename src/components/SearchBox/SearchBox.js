import { Button, Flex, FormControl, Input, InputGroup, InputLeftAddon, Select, Text } from "@chakra-ui/react"
import filterByDate from "../../functions/filterByDate"
import resetSearch from "../../functions/resetSearch"

const SearchBox = ({ setSearch, setData, data }) => {
    return (
        <Flex direction={'column'} align='center' gap={4} alignSelf={['', '', '', 'flex-start']} pt={['', '', '', '30px']}>
            <Text color='white' fontSize={['sm', 'lg']}>Tem algo em mente? Pesquise abaixo!</Text>
            <Input name='title-search' variant='filled' placeholder='Pesquise por título de artigos'
                type='text' width={[310, 480]} color='black' _focus={{ color: 'white', backgroundColor: 'transparent', border: '2px solid lime' }} fontSize={'lg'} height='60px'
                onChange={(event) => setSearch('?title_contains=' + event.target.value)} autoComplete='off' />
            <InputGroup w={'fit-content'}>
                <InputLeftAddon children='Mostra artigos' />
                <Select name='quantity' defaultValue='10' focusBorderColor='lime' bg={'black'} width={'80px'}
                    borderRadius='0 5px 5px 0' color='white'
                    onChange={(event) => {
                        document.getElementsByName('first-date')[0].value = ''
                        document.getElementsByName('second-date')[0].value = ''
                        setSearch('?_limit=' + event.target.value)
                    }}>
                    <option value='10' style={{ color: '#04fb04', backgroundColor: 'black' }} >10</option>
                    <option value='25' style={{ color: '#04fb04', backgroundColor: 'black' }} >25</option>
                    <option value='50' style={{ color: '#04fb04', backgroundColor: 'black' }} >50</option>
                    <option value='100' style={{ color: '#04fb04', backgroundColor: 'black' }} >100</option>
                </Select>
            </InputGroup>
            <FormControl onChange={(elem) => filterByDate(elem.target, setData, data)} w={'fit-content'}>
                <InputGroup>
                    <InputLeftAddon children='Do dia:' px={'15px'} w={'80px'} bgColor='black' color='white' />
                    <Input name='first-date' type='date' color={'black'} bgColor='white' focusBorderColor='lime' width={'170px'}
                        borderRadius='0 5px 5px 0' placeholder='aaaaa' />
                </InputGroup>
                <InputGroup w={'fit-content'} mt='5px'>
                    <InputLeftAddon children='Até dia:' px={'15px'} w={'80px'} bgColor='black' color='white' />
                    <Input name='second-date' type='date' color={'black'} bgColor='white' focusBorderColor='lime' width={'170px'}
                        borderRadius='0 5px 5px 0' />
                </InputGroup>
            </FormControl>
            <Button color={'#04fb04'} bg='transparent' border={'1px solid white'} variant='solid' onClick={() => resetSearch(setSearch)}>Limpar pesquisa</Button>
        </Flex>
    )
}

export default SearchBox

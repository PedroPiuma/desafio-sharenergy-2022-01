import { Fragment } from "react"
import { Link as ReachLink, Outlet } from "react-router-dom"
import rocketLogo from '../../img/rocket-logo.png'
import { Flex, Text, Image } from "@chakra-ui/react"

const Layout = () => {
    localStorage.setItem('values', JSON.stringify([1, 2, 3]))
    return (
        <Fragment>
            <Flex border='0 15px 0 15px' borderBottom='3px solid #04fb04'
                h={'120px'} justify='space-around' align='center'
                bgGradient='radial(black, gray.800, gray)'>
                <Text color='#04fb04' fontSize={['16px', '20px']} width='200px' textAlign='center'>Diverta-se com as informações mais recentes!</Text>
                <ReachLink to='/'><Image src={rocketLogo} h={'120px'} borderRadius='65px 65px 0 0px' pt={'5px'} /></ReachLink>
            </Flex>
            <Outlet />
        </Fragment>
    )
}

export default Layout

import { Fragment } from "react"
import { Link as ReachLink, Outlet } from "react-router-dom"
import homeIcon from '../../img/home-icon.png'
import { Flex, Text, Image } from "@chakra-ui/react"

const Layout = () => {
    localStorage.setItem('values', JSON.stringify([1, 2, 3]))
    return (
        <Fragment>
            <Flex border='0 15px 0 15px' borderBottom='3px solid #04fb04'
                h={'120px'} justify='space-around' align='center'
                bgGradient='radial(black, gray.800, gray)' >
                <Text color='#04fb04' fontSize={['20px']}>Science the only way to go.</Text>
                <ReachLink to='/'><Image src={homeIcon} boxShadow='inset 0 0 5px 5px #b4fa95' p={'13px'} borderRadius='25px' /></ReachLink>
            </Flex>
            <Outlet />
        </Fragment>
    )
}

export default Layout

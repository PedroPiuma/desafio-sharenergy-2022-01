import { Fragment } from "react"
import { Link as ReachLink, Outlet } from "react-router-dom"
import rocketLogo from '../../img/rocket-logo.png'
import { Flex, Text, Image, Button } from "@chakra-ui/react"

const Layout = () => {
    return (
        <Fragment>
            <Flex justify='space-around' align='center' position={'relative'}
                bgGradient='radial(black, gray.800, gray.700)' >
                <Text color='#04fb04' fontSize={['16px', '20px']} width={['200px', '400px', '600px']} textAlign='center'>Diverta-se com as informações mais recentes!</Text>
                <Flex as={ReachLink} to='/' direction={'column'} alignItems={'flex-end'} pt='5px'>
                    <Image src={rocketLogo} h={'120px'} borderRadius='65px 65px 0 0px' />
                    <Button variant='solid' size='xs' w={'100%'} bgColor={'#04fb04'}
                        borderRadius={'0 0 5px 5px'} boxShadow='inset 0 0 5px 1px black'
                        position={['', '', 'absolute']} right={['', '', 0]} mt={['', '', '120px']}
                        fontSize={['12px', '14px', '16px']}
                    >Home</Button>
                </Flex>
            </Flex>
            <Outlet />
        </Fragment >
    )
}

export default Layout

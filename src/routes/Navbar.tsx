import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
import { observer } from 'mobx-react';
import rootStore from '../rootStore';
import { Avatar, Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
const { userStore } = rootStore;
const Navbar = observer(({ showSidebar }: { showSidebar: () => void }) => {
    useEffect(() => { // reauthenticates when refreshing the page
        if(localStorage.getItem('userJwt'))
            userStore.userJwtAuthentication()
    }, [])

    return (
        <>
            <div className='navbar'>
            <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} style={{marginRight:'20px'}} />
            </Link>
            {userStore.user ? (
            <>
                <HStack spacing="20px">
                    <Text display={{ base: "block", md: "block" }}> {userStore.user.firstName} {userStore.user.lastName}</Text>                    
                    <Avatar name={userStore.user.firstName} src={userStore.user.image} />
                    {userStore.userRole === "ADMIN" && (
                        <Box>
                            <Tooltip label={'Admin'}>
                                <StarIcon/>
                            </Tooltip>
                        </Box>
                    )}    
                </HStack>
            </>
        ) : (
            <Text>Log in to purchase items</Text>
        )}
        </div>
        </>
    );
})
export default Navbar;
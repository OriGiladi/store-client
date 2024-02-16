import { useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
import { observer } from 'mobx-react';
import rootStore from '../rootStore';
import { Avatar, Box, HStack, Text, Tooltip, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { jwtDecode } from 'jwt-decode';
const { userStore } = rootStore;
const Navbar = observer(({ showSidebar }: { showSidebar: () => void }) => {
    const toast = useToast()
    const currentTimestamp = Math.floor(Date.now() / 1000);
    useEffect(() => { // reauthenticates when refreshing the page
        if(localStorage.getItem('userJwt')){
            userStore.userJwtAuthentication()
            try{
                if(jwtDecode(localStorage.getItem('userJwt') as string).exp as number - currentTimestamp < 0){ // checks if the userJwt has expired
                    toast({
                        title: "Your session was expired",
                        description: "Please login again",
                        duration: 5000,
                        isClosable: true,
                        status: "error",
                        position: "bottom",
                    });
                    localStorage.removeItem('userJwt')
                }
            }
            catch{
                console.error("invalid token")
            }  
        }      
    }, [currentTimestamp, toast])

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
                    <Link to='/login'>Log in to purchase items</Link>
                )}
        </div>
        </>
    );
})
export default Navbar;
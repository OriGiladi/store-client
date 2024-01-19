import {
    Flex,
    Heading,
    Text,
    Button,
    Spacer,
    HStack,
    useToast,
    Avatar,
} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons"
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react";
import rootStore from "../rootStore";
import { useEffect } from "react";

const Navbar = observer(() => {
    const {userStore} = rootStore    
    const navigate = useNavigate();
    const toast = useToast();

    const logOut = () => {  
        // clearing tokens and setting user to null
        localStorage.removeItem("userJwt");
        localStorage.removeItem("isAdmin");
        userStore.setUser();
        userStore.setUserJwt();
        userStore.setIsAdmin()
        toast({
        title: "Logged Out",
        description: "You have logged out",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: "top",
        });
        navigate('/')
    };

    useEffect(() => { // reauthenticates when refreshing the page
        if(localStorage.getItem('userJwt'))
            userStore.userJwtAuthentication()
        if(localStorage.getItem("isAdmin"))
            userStore.setIsAdmin(localStorage.getItem("isAdmin") as unknown as boolean) // TODO: work with adminJwt
    }, [userStore])



    return (
        <Flex as="nav" p="10px" mb="40px" alignItems="center" gap="10px">
        <Heading display={{base:"block", md:"block" }} as="h1">The Shop</Heading>
        <Spacer />
        {userStore.user ? (
            <HStack spacing="20px">
            <Avatar name={userStore.user.firstName} src={userStore.user.image} /> {/* TODO: add an edit profile optoion (if possible by clicking the Avatar element) */}
            <Text display={{base:"block", md:"block"  }}> {userStore.user.firstName} {userStore.user.lastName}</Text>
            <Button colorScheme="red" onClick={logOut}>
                Logout
            </Button>
                { userStore.isAdmin ? (<StarIcon color="red.500"/>) : (null) } {/* TODO: when mouse hovering the star display the text Admin */}
            </HStack>
        ) : (
            <Text>Log in to purchase items</Text>
        )}
        </Flex>
    );
});
export default Navbar

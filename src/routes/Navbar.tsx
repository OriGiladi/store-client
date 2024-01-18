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
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react";
import rootStore from "../rootStore";

const Navbar = observer(() => {
    const {userStore} = rootStore    
    const navigate = useNavigate();
    const toast = useToast();

    const logOut = () => {  
        // clearing tokens and setting user to null
        localStorage.removeItem("userJwt");
        localStorage.removeItem("adminJwt");
        userStore.setUser();
        userStore.setUserJwt()
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



    return (
        <Flex as="nav" p="10px" mb="40px" alignItems="center" gap="10px">
        <Heading display={{base:"block", md:"block" }} as="h1">The Shop</Heading>
        <Spacer />
        {userStore.user ? (
            <HStack spacing="20px">
            <Avatar name={userStore.user.firstName} src={userStore.user.image} />
            <Text display={{base:"block", md:"block"  }}> {userStore.user.firstName} {userStore.user.lastName}</Text>
            <Button colorScheme="red" onClick={logOut}>
                Logout
            </Button>
            </HStack>
        ) : (
            <Text>Log in to purchase items</Text>
        )}
        </Flex>
    );
});
export default Navbar

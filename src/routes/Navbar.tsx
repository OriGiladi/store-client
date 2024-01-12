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
import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom";

const baseUrl = "http://localhost:3000";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
}

export const Navbar = () => {
const [user, setUser] = useState<User | null>(null); // Initialize as null

const toast = useToast();

const logOut = () => {
    // Log out logic here, clear the token, and set user to null
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setUser(null);
    toast({
    title: "Logged Out",
    description: "You have logged out",
    duration: 5000,
    isClosable: true,
    status: "success",
    position: "top",
    });
    const myLocation = useLocation();
    redirect(myLocation.pathname);
};

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    fetch(`${baseUrl}/users/me`, {
        headers: {
        Authorization: "Bearer " + token,
        }
    })
        .then((res) => res.json())
        .then((data) => {
        setUser(data);
        })
        .catch((error) => {
        console.error("Error fetching user data:", error);
        });
    }
}, []);

return (
    <Flex as="nav" p="10px" mb="40px" alignItems="center" gap="10px">
    <Heading display={{base:"block", md:"block" }} as="h1">The Shop</Heading>
    <Spacer />
    {user ? (
        <HStack spacing="20px">
        <Avatar name={user.firstName} src={user.image} />
        <Text display={{base:"block", md:"block"  }}> {user.firstName} {user.lastName}</Text>
        <Button colorScheme="red" onClick={logOut}>
            Logout
        </Button>
        </HStack>
    ) : (
        <Text>Log in to purchase items</Text>
    )}
    </Flex>
);
};

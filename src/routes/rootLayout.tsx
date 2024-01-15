import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import SideBar from "./SideBar"
import { baseUrl } from "../utils/constants"

export function RootLayout() {
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
            <GridItem as="aside"
            colSpan={{base: 6, lg: 2, xl: 1}}
            bg='red.500' 
            minHeight={{lg:'100vh'}} 
            p={{base: '20px', lg: "30px"}}>
                <SideBar/>
            </GridItem>
            <GridItem as="main" colSpan={{base: 6, lg: 4, xl: 5}} p="40px">
                <Navbar/>
                <Container>
                    <Outlet/>
                </Container>
            </GridItem>
        </Grid>
    )
}

export async function userLoader() {
    const res = await fetch(`${baseUrl}/users/me`, {
        headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")}}
    )
    console.log(res)
    return res.json()
}


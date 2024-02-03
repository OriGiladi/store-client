import { Outlet } from "react-router-dom"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import { BASE_URL } from "../utils/constants"
import Navbar from "./Navbar"
import SideBar from "./SideBar"
import { observer } from "mobx-react";
import rootStore from "../rootStore"
import { getHeadersWithJwt } from "../utils/sdk"

const RootLayout = observer(() => {
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
})
export default RootLayout

export async function userLoader() {
    const {userStore} = rootStore
    const res = await fetch(`${BASE_URL}/users/me`, {
        headers: getHeadersWithJwt(userStore.userJwt as string)
    })
    return res.json()
}


import { Outlet } from "react-router-dom"
import { Container, Grid, GridItem } from "@chakra-ui/react"
import { observer } from "mobx-react";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
import { useState } from "react";

const RootLayout = observer(() => {
    const [isSideBarOpen, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!isSideBarOpen);
    return (
        <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
            <GridItem as="aside"
            colSpan={{base: 6, lg: 2, xl: 1}}
            minHeight={{lg:'100vh'}} 
            p={{base: '20px', lg: "30px"}}>
            <SideBar isSideBarOpen={isSideBarOpen} showSidebar={showSidebar}/>
            </GridItem>
            <GridItem as="main" colSpan={{base: 6, lg: 4, xl: 5}} p="40px">
                <Navbar  showSidebar={showSidebar}/>
                <Container style={{marginTop:'100px'}} maxW="100%">
                    <Outlet/>
                </Container>
            </GridItem>
        </Grid>
    )
})
export default RootLayout

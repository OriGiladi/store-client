import { List, ListIcon, ListItem } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import {CalendarIcon, EditIcon} from "@chakra-ui/icons"
import { observer } from "mobx-react";
import rootStore from "../rootStore";

const SideBar = observer(() => {
    const { userStore } = rootStore 
    const userJwt = userStore.userJwt

    return (
        <List color="white" fontSize="1.2em" spacing={4}>
            <ListItem >
                <ListIcon as={CalendarIcon} color="white"/>
                <NavLink to='/'>Catalog</NavLink>
            </ListItem>

            <ListItem>
                <NavLink to='/cart'>My Shopping Cart</NavLink>
            </ListItem>

            <ListItem>
                <NavLink to='/about'>About Us</NavLink>
            </ListItem>

        {!userJwt? (
            <>
                <ListItem>
                    <NavLink to='/login'> Log in </NavLink>
                </ListItem>

                <ListItem>
                    <ListIcon as={EditIcon} color="white"/>
                    <NavLink to='/register'>Register</NavLink>
                </ListItem>
            </>
        ) : (null)}
        </List>
    )
})

export default SideBar
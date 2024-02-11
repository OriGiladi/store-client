import { List, ListItem } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import { observer } from "mobx-react";
import rootStore from "../rootStore";

const SideBar = observer(() => {
    const { userStore, shoppingCartStore } = rootStore 
    return (
        <List style={{ position: "fixed", overflowY: "auto" }} color="white" fontSize="1.2em" spacing={4}>
            <ListItem >
                <NavLink to='/'>Product Catalog</NavLink>
            </ListItem>
            <ListItem>
                {shoppingCartStore.totalAmount > 0 ? 
                    ( <NavLink to='/cart'>My Shopping Cart ({shoppingCartStore.totalAmount})</NavLink>):
                    (<NavLink to='/cart'>My Shopping Cart </NavLink>)
                }
            </ListItem>
        {!userStore.userJwt ? (
            <>
                <ListItem>
                    <NavLink to='/login'> Log in </NavLink>
                </ListItem>

                <ListItem>
                    <NavLink to='/register'>Register</NavLink>
                </ListItem>
            </>
        ) : (null)}
        </List>
    )
})

export default SideBar
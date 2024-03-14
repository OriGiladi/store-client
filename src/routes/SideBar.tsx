
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {HiTable, HiArrowSmRight, HiShoppingBag, HiArrowSmLeft } from 'react-icons/hi';
import '../App.css';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import rootStore from '../rootStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
const { userStore, shoppingCartStore } = rootStore;

const SideBar = observer(({ isSideBarOpen, showSidebar }: { isSideBarOpen: boolean, showSidebar: () => void }) => {
    const toast = useToast();
    const navigate = useNavigate();
    function logout() {
        // clearing tokens and setting user to null
        localStorage.removeItem("userJwt");
        userStore.setUser();
        userStore.setUserJwt();
        userStore.setUserRole();
        toast({
        title: "You have signed out",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: "bottom",
        });
        navigate('/')
    }

    return (
        <nav className={isSideBarOpen ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={() => { showSidebar() }}>
            <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#B83280' }} />
            </Link>
            </li>
            <li className={"nav-text"}>
                <Link to="/">
                    <HiShoppingBag/>
                    <span>Products Catalog</span>
                </Link>
            </li>
            <li className={"nav-text"}>
                <Link to="/cart">
                    <FaIcons.FaCartPlus />
                    { shoppingCartStore.totalAmount > 0 ?
                    (<span> {`My Shopping Cart (${shoppingCartStore.totalAmount})`} </span>) :
                    (<span> {`My Shopping Cart`} </span>)}
                </Link>
            </li>
            {!userStore.user ?
            (<>
                <li className={"nav-text"}>
                    <Link to="/login">
                        <HiArrowSmRight />
                        <span>Sign In</span>
                    </Link>
                </li>
                <li className={"nav-text"}>
                    <Link to="/register">
                        <HiTable />
                        <span>Sign Up</span>
                    </Link>
                </li>
            </>
            ) :
            (
            <>
                <li className={"nav-text"}>
                    <Link to={`order-history`}>
                        <FontAwesomeIcon icon={faHistory} />
                        <span> Order History</span>
                    </Link>
                </li>
                <li className={"nav-text"} onClick={() => { logout()}}>
                    <Link to="">
                        <HiArrowSmLeft/>
                        <span>Sign Out</span>
                    </Link>
                </li>
            </>
            )
        }
        </ul>
        </nav>
    )
})

export default SideBar
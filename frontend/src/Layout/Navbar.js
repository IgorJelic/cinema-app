import { Link, useNavigate } from "react-router-dom";
import styles from './Styles/Navbar.module.css';
import UserService from "../API/Services/UserService";
import ToastifyService from "../CommonServices/Toastify/ToastifyService";
import { useEffect, useState } from "react";
import UserTokenService from "../CommonServices/UserTokenService";
import GuestNavbar from "./Guest/GuestNavbar";
import AdminNavbar from "./Admin/AdminNavbar";
import CustomerNavbar from "./Customer/CustomerNavbar";

export default function Navbar(){
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(UserTokenService.getToken());
    },[]);

    function logoutClick() {
        UserService.logout();
        setToken(null);
        ToastifyService.notifyInfo('Logged out.');
        // navigate('/login');
        window.location.reload();
    }

    switch (token) {
        case null:
            return <GuestNavbar/>
        default:
            if(token.role === 'admin') return <AdminNavbar logoutClick={logoutClick}/>
            else return <CustomerNavbar logoutClick={logoutClick}/>
    }
}
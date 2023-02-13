import { Link, useNavigate } from "react-router-dom";
import styles from './Styles/Navbar.module.css';
import UserService from "../API/Services/UserService";
import ToastifyService from "../CommonServices/Toastify/ToastifyService";

export default function Navbar(){
    const navigate = useNavigate();

    function logoutClick() {
        UserService.logout();
        ToastifyService.notifyInfo('Logged out.');
        navigate('/login');
    }

    const leftLinks = !localStorage.getItem('token')
        ? <><li><Link to='/genres'>Genres</Link></li><li><Link to='/movies'>Movies</Link></li><li><Link to='/screenings'>MovieScreenings</Link></li></>
        : <></>

    const rightLinks = localStorage.getItem('token')
        ? <li><a onClick={logoutClick}>Logout</a></li>
        : <><li ><Link to='/login'>Login</Link></li><li><Link to='/register'>Register</Link></li></>

    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {/* <li>
                        <Link to='/genres'>Genres</Link>
                    </li>
                    <li>
                        <Link to='/movies'>Movies</Link>
                    </li>
                    <li>
                        <Link to='/screenings'>MovieScreenings</Link>
                    </li> */}
                    {leftLinks}
                    <div className={styles.right}>
                        {/* <li >
                            <Link to='/login'>Login</Link>
                        </li>
                        <li >
                            <Link to='/register'>Register</Link>
                        </li>
                        <li>
                            <a onClick={logoutClick}>Logout</a>
                        </li> */}
                        {rightLinks}
                    </div>
                </ul>
            </nav>
        </>
    )
}
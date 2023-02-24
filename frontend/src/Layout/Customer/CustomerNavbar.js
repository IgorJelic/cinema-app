import { Link } from "react-router-dom";
import styles from '../Styles/Navbar.module.css';

export default function CustomerNavbar({
    logoutClick
}){
    return(
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/genres'>Genres</Link></li>
                <li><Link to='/movies'>Movies</Link></li>
                <li><Link to='/screenings'>Reservations</Link></li>
                <div className={styles.right}>
                    <li><a onClick={logoutClick}>Logout</a></li>
                </div>
            </ul>
        </nav>
    )
}
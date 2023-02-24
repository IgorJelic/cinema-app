import { Link } from "react-router-dom"
import styles from '../Styles/Navbar.module.css';


export default function GuestNavbar(){

    return(
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <div className={styles.right}>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </div>
            </ul>
        </nav>
    )
}
import { Link } from "react-router-dom";
import "./Styles/Navbar.css"; 

export default function AdminNavbar(){
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/genres'>Genres</Link>
                    </li>
                    <li>
                        <Link to='/movies'>Movies</Link>
                    </li>
                    <li>
                        <Link to='/screenings'>MovieScreenings</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
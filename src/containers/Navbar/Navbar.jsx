import { Link } from "react-router-dom";
import style from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <nav className={style.Navbar}>
            <Link to="/">
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
            </Link>
        </nav>
    );
};

export default Navbar;

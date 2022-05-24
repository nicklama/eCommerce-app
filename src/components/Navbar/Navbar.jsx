import { Link } from "react-router-dom";
import style from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <nav className={style.Navbar}>
            <Link to="/">
                <FontAwesomeIcon icon={faHome} title="Home" />
            </Link>
            <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} title="Cart" />
            </Link>
            <Link to="/favourites">
                <FontAwesomeIcon icon={faHeart} title="Favourites" />
            </Link>
        </nav>
    );
};

export default Navbar;

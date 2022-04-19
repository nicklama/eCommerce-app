import style from "./Header.module.scss";

const Header = () => {
    return (
        <header className={style.Header}>
            <h1>My Marketplace</h1>
            <p>Discover an assortment of sustainable hand-crafted clothing here</p>
        </header>
    );
};

export default Header;

import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom'
import style from './header.module.css'

const Header = () => (
    <>
      <header className={style.header}>
        <Link className={style.logoHeader} to={'/'}>
          HACKER NEWS
        </Link>
      </header>

      <main className={style.main}>
        <Outlet />
      </main>

      <footer className={style.footer}>
        <div className={style.wrapper}>
          <div className={style.logoFooter}>HACKER NEWS</div>
            <div className={style.year}>2023</div>
          </div>
      </footer>
    </>
);

export default Header;

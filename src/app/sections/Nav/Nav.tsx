'use client'
import styles from './Nav.module.css'
import {Button} from "@/app/components/Button";

function Nav() {
    return (
        <nav className={styles.nav}>
            <div className={styles.buttons}>
                <Button>Круторус</Button>
                <Button>Калькулятор</Button>
                <Button>Услуги</Button>
                <Button>Разработка проектов</Button>
                <Button>Условия работы</Button>
                <Button>О нас</Button>
            </div>
        </nav>
    );
}

export default Nav;
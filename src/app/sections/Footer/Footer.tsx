'use client'
import styles from './Footer.module.css'
import Link from "next/link";
import Image from "next/image";
import tg from 'public/tg.svg'
import mail from 'public/mail.svg'

function Footer() {
    return (
        <footer className={styles.footer}>
            <Link href={'/'} className={styles.link}>РемСтройПро. Строительство и ремонт под ключ</Link>
            <Link href={'/'} className={`${styles.link} ${styles.link2}`}>© 2025 РемСтройПро. Все права защищены</Link>
            <div className={styles.images}>
                <Link href={'https://t.me/BuildConsultBot?start=FooterButton'} className={styles.iconLink}><Image src={tg} alt="telegram" width={40} height={40} /></Link>
                <Link href={'mailto:remstroiipro@gmail.com'} className={styles.iconLink}><Image src={mail} alt="email" width={40} height={40} /></Link>
            </div>
        </footer>
    );
}

export default Footer;
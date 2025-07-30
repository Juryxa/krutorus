'use client'
import styles from './TelegramBlueButton.module.css'
import tgBlueSvg from 'public/tgBlue.svg'
import Image from "next/image";
import Link from "next/link";

function TelegramBlueButton() {
    return (
        <Link href="https://t.me/BuildConsultBot?start=BlueMain">
            <div className={styles.button}>
                Telegram
                <Image src={tgBlueSvg} alt={'tg'}/>
            </div>
        </Link>
    );
}

export default TelegramBlueButton;
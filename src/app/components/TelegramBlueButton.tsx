'use client'
import styles from './TelegramBlueButton.module.css'
import tgBlueSvg from 'public/tgBlue.svg'
import Image from "next/image";

function TelegramBlueButton() {
    return (
        <div className={styles.button}>
            Telegram
            <Image src={tgBlueSvg} alt={'tg'}/>
        </div>
    );
}

export default TelegramBlueButton;
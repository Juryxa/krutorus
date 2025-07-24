'use client'
import styles from './KrutorusBottom.module.css'
import Image from "next/image";
import BuilderImage from "public/man.png"
import CloudImage from "public/cloud.png"
import arrowLeft from "public/arrowLeft.png"
import stone1 from "public/stone.png"
import Field from "@/app/components/Field";
import Link from "next/link";
import TelegramBlueButton from "@/app/components/TelegramBlueButton";


function KrutorusBottom() {
    return (
        <div className={styles.krutorusBottom}>
            <div className={styles.images}>
                <Image className={styles.man} src={BuilderImage} alt="строитель" height={456}/>
                <Image className={styles.cloud} src={CloudImage} alt="Узнайте стоимость любой работы!" height={126}/>
            </div>
            <div className={styles.fieldsAndButton}>
                <div className={styles.fields}>
                    <div className={styles.fieldsOpacity}>
                        <Field className={'transparentOrange'}>Есть вопросы или нужна помощь с выбором услуги?</Field>
                        <Field className={'transparentGray'}>- Да, хочу уточнить пару моментов.<br/>
                            <Link className={styles.link} href="/">📲<span className={styles.linkDecoration}>Пишите в Telegram — ответим быстро!</span></Link>
                        </Field>
                    </div>
                    <Image className={styles.arrowLeft} src={arrowLeft} alt='arrow'/>
                    <div className={styles.tgbtn}>
                        <TelegramBlueButton/>
                    </div>
                </div>
            </div>
            <div className={styles.imagestone}>
                <Image className={styles.stone1} src={stone1} alt='stone1'/>
            </div>
        </div>
    );
}

export default KrutorusBottom;
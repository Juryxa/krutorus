'use client'
import styles from './Krutorus.module.css'
import KrutorusTop from "@/app/sections/KrutorusAndCalc/Krutorus/KrutorusTop";
import KrutorusBottom from "@/app/sections/KrutorusAndCalc/Krutorus/KrutorusBottom";

function Krutorus() {
    return (
        <section className={styles.krutorus}>
            <KrutorusTop/>
            <KrutorusBottom/>
        </section>
    );
}

export default Krutorus;
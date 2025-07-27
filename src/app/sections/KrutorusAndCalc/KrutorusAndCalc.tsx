'use client'
import styles from './KrutorusAndCalc.module.css'
import Calc from "@/app/sections/KrutorusAndCalc/Calc/Calc";
import Krutorus from "@/app/sections/KrutorusAndCalc/Krutorus/Krutorus";

function KrutorusAndCalc() {
    return (
        <section className={styles.main}>
            <Krutorus/>
            <Calc/>
        </section>
    );
}

export default KrutorusAndCalc;
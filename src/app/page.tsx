import styles from "./page.module.css";
import Nav from "@/app/sections/Nav/Nav";
import Krutorus from "@/app/sections/KrutorusAndCalc/Krutorus/Krutorus";

export default function Home() {
    return (
        <div className={styles.page}>
            <Nav/>
            <Krutorus/>
        </div>
    );
}

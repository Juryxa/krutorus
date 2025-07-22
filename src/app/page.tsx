import styles from "./page.module.css";
import Nav from "@/app/sections/Nav/Nav";
import KrutorusAndCalc from "@/app/sections/KrutorusAndCalc/KrutorusAndCalc";

export default function Home() {
    return (
        <div className={styles.page}>
            <Nav/>
            <KrutorusAndCalc/>
        </div>
    );
}

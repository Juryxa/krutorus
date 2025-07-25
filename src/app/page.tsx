import styles from "./page.module.css";
import Nav from "@/app/sections/Nav/Nav";
import KrutorusAndCalc from "@/app/sections/KrutorusAndCalc/KrutorusAndCalc";
import Services from "@/app/sections/Services/Services";
import TgOrange from "@/app/components/TgOrange";
import Plan from "@/app/sections/Plan/Plan";
import OurProcess from "@/app/sections/OurProcess/OurProcess";
import HowWeWork from "@/app/sections/HowWeWork/HowWeWork";

export default function Home() {
    return (
        <div className={styles.page}>
            <Nav/>
            <KrutorusAndCalc/>
            <Services/>
            <TgOrange/>
            <Plan/>
            <OurProcess/>
            <HowWeWork/>
        </div>
    );
}

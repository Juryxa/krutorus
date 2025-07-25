import styles from "./page.module.css";
import Nav from "@/app/sections/Nav/Nav";
import KrutorusAndCalc from "@/app/sections/KrutorusAndCalc/KrutorusAndCalc";
import Services from "@/app/sections/Services/Services";
import TgOrange from "@/app/components/TgOrange";
import Plan from "@/app/sections/Plan/Plan";
import HowWeWork from "@/app/sections/HowWeWork/HowWeWork";
import AboutUs from "@/app/sections/AboutUs/AboutUs";
import Footer from "@/app/sections/Footer/Footer";

export default function Home() {
    return (
        <div className={styles.page}>
            <Nav/>
            <KrutorusAndCalc/>
            <TgOrange/>
            <section id="services"><Services/></section>
            <section id="plan">
                <Plan/>
            </section>
            <section id="howwework"><HowWeWork/></section>
            <AboutUs/>
            <Footer/>
        </div>
    );
}

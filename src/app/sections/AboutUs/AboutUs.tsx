'use client'
import styles from './AboutUs.module.css'
import Field from "@/app/components/Field";
import TitleH2 from "@/app/components/TitleH2";

function AboutUs() {
    return (
        <section className={styles.aboutUs}>
            <TitleH2>О нас</TitleH2>
            <div className={styles.fields}>
                <Field className={"orange"}>Более 200 реализованных проектов</Field>
                <Field className={"gray"}>Знакомимся с любыми нестандартными задачами и доводим каждую идею до идеала</Field>
                <Field className={"gray"}>Мы не гонимся за количеством — работаем на репутацию</Field>
                <Field className={"orange"}>90 % клиентов рекомендуют нас знакомым</Field>
                <Field className={"orange"}>Средний стаж мастера — 10 лет</Field>
                <Field className={"gray"}>В команде только проверенные специалисты, многие из них работали на крупных городских объектах</Field>
                <Field className={"gray"}>Даже без официального договора мы уверены в результате и оперативно устраняем любые недостатки</Field>
                <Field className={"gray"}>Личный менеджер на связи 24/7 </Field>
                <Field className={"gray"}>Вы экономите на наценках, а мы берём всю ответственность за сроки и материалы</Field>
                <Field className={"gray"}>Всё под ключ без посредников</Field>
                <Field className={"orange"}>Гарантия качества 2 года</Field>
            </div>
        </section>
    );
}

export default AboutUs;
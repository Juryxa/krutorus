'use client'
import Head from 'next/head';
import styles from './KrutorusTop.module.css'
import Field from "@/app/components/Field";

function KrutorusTop() {
    return (
        <div className={styles.krutorusTop}>
            <Head>
                <link
                    rel="preload"
                    href="/krutorusTopBg.webp"
                    as="image"
                    fetchPriority="high"
                />
            </Head>
            <div className={styles.inner}>
                <h1 className={styles.title}>РемСтройПро</h1>
                <ul className={styles.list}>
                    <li>—Реализуем проекты любой сложности: от косметического ремонта до капитального строительства.</li>
                    <li>—Работаем по прозрачным условиям, соблюдая сроки и бюджет.</li>
                    <li>—Индивидуальный подход к каждому заказчику — от идеи до воплощения.</li>
                </ul>
                <div className={styles.fields}>
                    <div className={styles.repair}>
                        <Field className={'orange'}>Ремонт</Field>
                        <Field className={'gray'}>Под ключ</Field>
                        <Field className={'gray'}>Косметический</Field>
                        <Field className={'gray'}>Евро-ремонт</Field>
                        <Field className={'gray'}>Капитальный</Field>
                        <Field className={'gray'}>Дизайнерский</Field>
                    </div>
                    <div className={styles.building}>
                        <Field className={'orange'}>Стройка</Field>
                        <Field className={'gray'}>Коттеджи</Field>
                        <Field className={'gray'}>Дома</Field>
                        <Field className={'gray'}>Складские помещения</Field>
                        <Field className={'gray'}>Ангары</Field>
                        <Field className={'gray'}>Сварочные работы</Field>
                        <Field className={'gray'}>Установка заборов</Field>
                    </div>
                    <div className={styles.projectsDev}>
                        <Field className={'orange'}>Разработка проектов</Field>
                        <Field className={'gray'}>Перепланировки</Field>
                        <Field className={'gray'}>Дизайны</Field>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KrutorusTop;
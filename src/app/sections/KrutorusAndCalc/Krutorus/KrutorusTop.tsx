'use client';
import Head from 'next/head';
import styles from './KrutorusTop.module.css'
import Field from "@/app/components/Field";
import {useEffect, useRef} from 'react';

function KrutorusTop() {
    const shineRef = useRef<HTMLDivElement>(null);

    const scrollToAnchor = (e: React.MouseEvent, anchor: string) => {
        e.preventDefault();
        const element = document.querySelector(anchor);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    useEffect(() => {
        if (shineRef.current) {
            shineRef.current.style.animation = 'none';
            setTimeout(() => {
                if (shineRef.current) {
                    shineRef.current.style.animation = '';
                }
            }, 10);
        }
    }, []);

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
                    {/* Первая строка - ремонт */}
                    <div className={styles.row}>
                        <a
                            href="#services"
                            className={styles.anchorLink}
                            onClick={(e) => scrollToAnchor(e, '#services')}
                        >
                            <Field className={'orangeTop'}>Ремонт</Field>
                        </a>
                        <div className={styles.marquee}>
                            <div className={styles.marqueeContent}>
                                <Field className={'gray'}>Под ключ</Field>
                                <Field className={'gray'}>Косметический</Field>
                                <Field className={'gray'}>Евро-ремонт</Field>
                                <Field className={'gray'}>Капитальный</Field>
                                <Field className={'gray'}>Дизайнерский</Field>
                                {/* Дубликаты для бесконечности */}
                                <Field className={'gray'}>Под ключ</Field>
                                <Field className={'gray'}>Косметический</Field>
                                <Field className={'gray'}>Евро-ремонт</Field>
                                <Field className={'gray'}>Капитальный</Field>
                                <Field className={'gray'}>Дизайнерский</Field>
                            </div>
                        </div>
                    </div>

                    {/* Вторая строка - стройка */}
                    <div className={styles.row}>
                        <a
                            href="#services"
                            className={styles.anchorLink}
                            onClick={(e) => scrollToAnchor(e, '#services')}
                        >
                            <Field className={'orangeTop'}>Стройка</Field>
                        </a>
                        <div className={styles.marquee}>
                            <div className={styles.marqueeContent}>
                                <Field className={'gray'}>Коттеджи</Field>
                                <Field className={'gray'}>Дома</Field>
                                <Field className={'gray'}>Складские помещения</Field>
                                <Field className={'gray'}>Ангары</Field>
                                <Field className={'gray'}>Сварочные работы</Field>
                                <Field className={'gray'}>Установка заборов</Field>
                                {/* Дубликаты для бесконечности */}
                                <Field className={'gray'}>Коттеджи</Field>
                                <Field className={'gray'}>Дома</Field>
                                <Field className={'gray'}>Складские помещения</Field>
                                <Field className={'gray'}>Ангары</Field>
                                <Field className={'gray'}>Сварочные работы</Field>
                                <Field className={'gray'}>Установка заборов</Field>
                            </div>
                        </div>
                    </div>

                    {/* Третья строка - разработка проектов */}
                    <div className={styles.row}>
                        <a
                            href="#plan"
                            className={styles.anchorLink}
                            onClick={(e) => scrollToAnchor(e, '#plan')}
                        >
                            <Field className={'orangeTop'}>Разработка проектов</Field>
                        </a>
                        <div className={styles.shineContainer}>
                            <div className={styles.staticFields}>
                                <Field className={'gray'}>Перепланировки</Field>
                                <Field className={'gray'}>Дизайны</Field>
                            </div>
                            <div ref={shineRef} className={styles.shine}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KrutorusTop;
'use client';
import {useCallback, useEffect, useState} from 'react';
import styles from './Calc.module.css';
import Image from "next/image";
import tg from 'public/tg.svg'
import mail from 'public/mail.svg'
import Link from "next/link";
import {createPortal} from "react-dom";
import arrowSig from 'public/arrowZig.png'
import Head from "next/head";
import stone from 'public/stones/stone1.png'

interface RepairCard {
    title: string;
    titleFor: string;
    price: number;
}

const repairCards: RepairCard[] = [
    {
        title: 'Косметический',
        titleFor: 'Косметического',
        price: 3000
    },
    {
        title: 'Капитальный',
        titleFor: 'Капитального',
        price: 7490
    },
    {
        title: 'Евро-ремонт',
        titleFor: 'Евро-ремонта',
        price: 9990
    },
    {
        title: 'Под ключ',
        titleFor: 'Под ключ',
        price: 8990
    },
    {
        title: 'Дизайнерский',
        titleFor: 'Дизайнерского',
        price: 10990
    },
];

export default function Calc() {
    // Состояния для шагов калькулятора
    const [step, setStep] = useState<number>(0);
    const [propertyType, setPropertyType] = useState<'new' | 'old' | null>(null);
    const [area, setArea] = useState<number | null>(null);
    const [areaCustom, setAreaCustom] = useState<number>(150);
    const [repairType, setRepairType] = useState<string | null>(null);
    const [repairTypeFor, setRepairTypeFor] = useState<string | null>(null);

    // Состояния для модалки
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    // Расчет цены
    const calculatePrice = useCallback(() => {
        if (!repairType || area === null) return 0;

        const repairCard = repairCards.find(card => card.title === repairType);
        if (!repairCard) return 0;

        let price = repairCard.price * area * 0.85; // -15% для расчета
        if (propertyType === 'old') {
            price *= 1.15; // Увеличение на 15% для вторички
        }

        return Math.round(price);
    }, [repairType, area, propertyType]);

    // Форматирование номера телефона
    const formatPhoneNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const limited = cleaned.slice(0, 11);

        let formatted = '';
        if (limited.length > 0) {
            formatted = `+7 (${limited.slice(1, 4)}`;
        }
        if (limited.length > 4) {
            formatted += `) ${limited.slice(4, 7)}`;
        }
        if (limited.length > 7) {
            formatted += `-${limited.slice(7, 9)}`;
        }
        if (limited.length > 9) {
            formatted += `-${limited.slice(9, 11)}`;
        }

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);

        setPhone(formatted);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone) return;

        // Здесь обычно отправка данных на сервер
        console.log({
            name,
            phone,
            propertyType,
            area,
            repairType,
            price: calculatePrice()
        });

        // Сброс формы
        setName('');
        setPhone('');
        setStep(0);
        setPropertyType(null);
        setArea(null);
        setRepairType(null);
    };

    // Обработка клавиши Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && step === 3) setStep(2);
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [step]);

    // Форматирование цены
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price) + ' руб.';
    };

    const renderModal = () => (
        <div className={styles.modalOverlay} onClick={() => setStep(2)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.closeButton}
                    onClick={() => setStep(2)}
                    aria-label="Закрыть"
                >
                    &times;
                </button>

                <h2 className={styles.modalTitle}>Мы уже прикинули итог:</h2>

                <div className={styles.summary}>
                    <div className={styles.gray}>
                        <span>Где делаем ремонт?</span>
                        <span>{propertyType === 'new' ? '– Новостройка' : '– Вторичка'}</span>
                    </div>
                    <div className={styles.gray}>
                        <span>Площадь</span>
                        <span>– {area} м²</span>
                    </div>
                    <div className={styles.gray}>
                        <span>Тип ремонта</span>
                        <span>– {repairType}</span>
                    </div>
                </div>

                <div className={styles.priceResult}>
                    Примерная цена {repairTypeFor?.toLowerCase()} ремонта для Вас
                    от {formatPrice(calculatePrice())}
                </div>
                <h3 className={styles.formTitle}>
                    Мы рассчитаем стоимость точнее! Займёт 15 секунд. Заполните поля ниже
                </h3>


                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <div className={`${styles.green} ${!phone ? styles.requiredField : ''}`}>
                            <label className={styles.formLabel}>Имя:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ваше имя"
                                maxLength={50}
                                className={styles.editableInput}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <div className={`${styles.green} ${!phone ? styles.requiredField : ''}`}>
                            <label className={styles.formLabel}>Телефон:</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="+7 (___) ___-__-__"
                                required
                                className={styles.editableInput}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={()=>setStep(4)}
                        disabled={phone.replace(/\D/g, '').length !== 11}
                    >
                        Конкретизировать цену
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <section className={styles.calcSection}>
            <Head>
                <link
                    rel="preload"
                    href="/krutorusTopBg.webp"
                    as="image"
                    fetchPriority="high"
                />
            </Head>
            <section className={styles.calc}>
                {/* Шаг 0: Выбор типа недвижимости */}
                {step === 0 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title}>Калькулятор</h1>
                        <div className={styles.center}>
                            <p className={styles.description}>Рассчитай стоимость за 3 шага — Выбери где будем
                                ремонтировать!</p>

                            <div className={styles.buttonGroup}>
                                <button
                                    className={`${styles.propertyButton} ${styles.newBuilding}`}
                                    onClick={() => {
                                        setPropertyType('new');
                                        setStep(1);
                                    }}
                                >
                                    Новостройка
                                </button>
                                <button
                                    className={`${styles.propertyButton} ${styles.secondary}`}
                                    onClick={() => {
                                        setPropertyType('old');
                                        setStep(1);
                                    }}
                                >
                                    Вторичка
                                </button>
                            </div>

                            <p className={styles.discount}><span className={styles.underline}>Скидка</span> <span
                                className={styles.orange}>15%</span> для Вас на первый замер!</p>
                        </div>
                        <p className={styles.footer}>Заполните за 30 секунд — без регистрации и звонков</p>
                    </div>
                )}

                {/* Шаг 1: Выбор площади */}
                {step === 1 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title1}>Рассчитай стоимость за 3 шага — Выбери площадь</h1>
                        <div className={styles.center1}>
                            <div
                                className={styles.backOption}
                                onClick={() => setStep(0)}
                            >
                                <span className={styles.square}></span>
                                <span
                                    className={styles.optionText}>{propertyType === 'new' ? 'Новостройка' : 'Вторичка'}</span>
                            </div>

                            <div className={styles.areaSelection}>
                                <h3 className={styles.sectionTitle}>Площадь (м²):</h3>
                                <div className={styles.areaButtons}>
                                    {[30, 50, 70].map((size) => (
                                        <button
                                            key={size}
                                            className={`${styles.areaButton} ${area === size ? styles.selected : ''}`}
                                            onClick={() => {
                                                setArea(size);
                                                setStep(2);
                                            }}
                                        >
                                            от {size}
                                        </button>
                                    ))}
                                    <button
                                        className={`${styles.areaButton} ${area && area >= 100 ? styles.selected : ''}`}
                                        onClick={() => {
                                            setArea(areaCustom);
                                        }}
                                    >
                                        свыше 100
                                    </button>
                                </div>

                                {area && area >= 100 && (
                                    <div className={styles.customArea}>
                                        <input
                                            type="range"
                                            min="100"
                                            max="300"
                                            value={areaCustom}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                setAreaCustom(value);
                                                setArea(value);
                                            }}
                                        />
                                        <div className={styles.areaValue}>
                                            {areaCustom} м²
                                            <button
                                                className={styles.confirmButton}
                                                onClick={() => setStep(2)}
                                            >
                                                Подтвердить
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className={styles.footer}>Заполните за 30 секунд — без регистрации и звонков</p>
                    </div>
                )}

                {/* Шаг 2: Выбор типа ремонта */}
                {step === 2 && (
                    <div className={styles.stepContent}>
                        <h1 className={styles.title1}>Рассчитай стоимость за 3 шага — Это последний шаг!</h1>
                        <div className={styles.center1}>
                            <div className={styles.selectedOptions}>
                                <div
                                    className={styles.backOption}
                                    onClick={() => setStep(0)}
                                >
                                    <span className={styles.square}></span>
                                    <span
                                        className={styles.optionText}>{propertyType === 'new' ? 'Новостройка' : 'Вторичка'}</span>
                                </div>
                                <div
                                    className={styles.backOption}
                                    onClick={() => setStep(1)}
                                >
                                    <span className={styles.square}></span>
                                    <span className={styles.optionText}>{area ? `${area} м²` : 'площадь'}</span>
                                </div>
                            </div>

                            <div className={styles.repairSelection}>
                                <h3 className={styles.sectionTitle}>Тип ремонта:</h3>
                                <div className={styles.repairOptions}>
                                    {repairCards.map((card) => (
                                        <div
                                            key={card.title}
                                            className={`${styles.repairOption} ${repairType === card.title ? styles.selected : ''}`}
                                            onClick={() => {
                                                setRepairType(card.title);
                                                setRepairTypeFor(card.titleFor)
                                                setStep(3);
                                            }}
                                        >
                                            {card.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className={styles.footer}>Заполните за 30 секунд — без регистрации и звонков</p>
                    </div>
                )}

                {/* Шаг 3: Модалка с результатом */}
                {step === 3 && createPortal(renderModal(), document.body)}

                {/* Шаг 4: Итог */}
                {step === 4 && (
                    <div className={styles.stepContent4}>
                        <h1 className={styles.title1}>Можем сделать это ещё раз!</h1>
                        <div className={styles.center4}>
                            <div className={styles.result}>
                                Готово! Итоговая стоимость вашего ремонта
                            </div>
                            <Image src={arrowSig} alt={'arrow'} className={styles.arrow}/>
                            <div className={`${styles.backOption} ${styles.cursor}`}>Для Вас: ~ {formatPrice(calculatePrice()*0.9)}</div>
                        </div>
                        <Image
                            width={150}
                            height={100}
                            src={stone}
                            alt="stone"
                            className={`${styles.fallingStone} ${step === 4 ? styles.animateStone : ''}`}
                        />
                    </div>
                )}
            </section>
            <div className={styles.images}>
                <Link href={'/'} className={styles.iconLink}><Image src={tg} alt="telegram" width={40}
                                                                    height={40}/></Link>
                <Link href={'/'} className={styles.iconLink}><Image src={mail} alt="email" width={40}
                                                                    height={40}/></Link>
            </div>
        </section>
    );
}
'use client';

import {useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import styles from './Services.module.css';
import ServiceButton from '@/app/components/ServiceButton';
import BuildingTypeButton from '@/app/components/BuildingTypeButton';
import Image from 'next/image';
import Modal from 'react-modal';
import Field from '@/app/components/Field';
import Completed from "@/app/components/Completed";

export default function Services() {
    const [activeTab, setActiveTab] = useState<'repair' | 'construction'>('repair');
    const [buildingType, setBuildingType] = useState<'new' | 'secondary'>('new');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({name: '', phone: '', type: ''});
    const [isClient, setIsClient] = useState(false);
    const [bg1Index, setBg1Index] = useState(0);
    const [bg2Index, setBg2Index] = useState(0);
    const [activeBg, setActiveBg] = useState('bg1');
    const {ref, inView} = useInView({triggerOnce: false, threshold: 0.3});

    // Инициализация react-modal
    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            Modal.setAppElement('#modal-root');
        }
    }, []);

    // Данные карточек
    const repairCards = [
        {
            title: 'Ремонт под ключ',
            description: 'Комплексный подход, при котором мы берём на себя всё — от демонтажа до финальной уборки. Вы получаете готовый результат без лишних хлопот, по заранее согласованному проекту и срокам.',
            price: 8990
        },
        {
            title: 'Капитальный ремонт',
            description: 'Включает замену инженерных коммуникаций, выравнивание стен, полов и потолков, перепланировку и другие серьёзные работы. Подходит для старых квартир или под полную переделку.',
            price: 7490
        },
        {
            title: 'Дизайнерский ремонт',
            description: 'Выполняется по индивидуальному проекту с подбором материалов, мебели и декора. Идеальный вариант, если вы хотите создать уникальный, эстетичный и функциональный интерьер',
            price: 10990
        },
        {
            title: 'Евроремонт',
            description: 'Современный и практичный стиль отделки с использованием качественных материалов. Включает выравнивание поверхностей, разводку электрики, монтаж потолков и стильную отделку.',
            price: 9990
        },
        {
            title: 'Косметический ремонт',
            description: 'Это быстрый и доступный способ обновить интерьер без масштабных работ. Включает покраску стен, поклейку обоев, замену напольных покрытий и другие детали для свежего вида.',
            price: 3000
        },
    ];

    const constructionCards = [
        {
            title: 'Строительство домов',
            description: 'Ведётся по современным технологиям с учётом ваших пожеланий и требований. Отличный выбор для тех, кто хочет тёплый, надёжный и долговечный дом под ключ.',
            price: 12990
        },
        {
            title: 'Строительство коттеджей',
            description: 'Проектируем и строим комфортные коттеджи для круглогодичного проживания. Идеально, если вы мечтаете о загородной жизни с городским уровнем удобства.',
            price: 9990
        },
        {
            title: 'Строительство складских помещений',
            description: 'Создаём практичные и прочные склады с учётом специфики хранения. Подходит для бизнеса, где важны надёжность, функциональность и оптимальные сроки.',
            price: 11990
        },
        {
            title: 'Установка заборов',
            description: 'Монтаж заборов любых типов: от профнастила до кирпича. Подчеркнёт границы участка и обеспечит безопасность — с учётом вашего стиля и бюджета.',
            price: 'Профнастил от 14990 ₽/п.м\n' + '\n' +
                'Сетка-рабица от 490₽/п.м \n' + '\n' +
                '3D-секции от 1290₽/п.м\n' + '\n' +
                'Деревянный / евроштакетник от 1390₽/п.м'
        },
        {
            title: 'Сварочные работы',
            description: 'Профессиональная сварка конструкций любой сложности. Незаменимо, если нужно прочное и точное решение для дома, дачи или бизнеса.',
            price: 'По шву/стыку (трубы, ограждения) от 150\n' +
                'от 600  ₽/п.м'
        },
        {
            title: 'Строительство ангаров',
            description: 'Возводим ангары для хранения, производства или техники. Рациональное решение, если вам нужны большие площади и быстрая реализация проекта.',
            price: 7990
        },
    ];

    const cards = activeTab === 'repair' ? repairCards : constructionCards;

    // Фоновые изображения
    const repairImages = ['/repair/1.jpg', '/repair/2.jpg', '/repair/3.jpg', '/repair/4.jpg', '/repair/5.jpg'];
    const constructionImages = ['/construction/1.jpg', '/construction/2.jpg', '/construction/3.jpg', '/construction/4.jpg', '/construction/5.jpg'];
    const backgroundImages = activeTab === 'repair' ? repairImages : constructionImages;

    // Смена фона каждые 2 секунды с плавным переходом
    useEffect(() => {
        const interval = setInterval(() => {
            const currentIndex = activeBg === 'bg1' ? bg1Index : bg2Index;
            const nextIndex = (currentIndex + 1) % backgroundImages.length;
            if (activeBg === 'bg1') {
                setBg2Index(nextIndex);
                setActiveBg('bg2');
            } else {
                setBg1Index(nextIndex);
                setActiveBg('bg1');
            }
        }, 3500);
        return () => clearInterval(interval);
    }, [backgroundImages, activeBg, bg1Index, bg2Index]);

    // Сброс фона при смене вкладки
    useEffect(() => {
        setBg1Index(0);
        setBg2Index(0);
        setActiveBg('bg1');
    }, [activeTab]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cards.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

    const handleCardClick = (index: number) => {
        const slideIndex = (index - currentSlide + cards.length) % cards.length;
        if (slideIndex === 1) nextSlide();
        else if (slideIndex === cards.length - 1) prevSlide();
    };

    const openModal = (type: string) => {
        setFormData({...formData, type});
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFormData({name: '', phone: '', type: ''});
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!formData.phone) {
            return;
        }
        closeModal();
    };

    const getPrice = (price: number | string) =>
        typeof price === 'string'
            ? price
            : buildingType === 'secondary' && activeTab === 'repair'
                ? `${(price * 1.15).toFixed(0)} ₽/м²`
                : `${price} ₽/м²`;

    const getImagePath = (path: string) => {
        try {
            return path;
        } catch (e) {
            return '/fallback.jpg';
        }
    };

    return (
        <section
            // Добавьте этот ID
            className={styles.services}
        >
            <section id="modal-root" className={styles.services}>
                <div
                    className={`${styles.background} ${activeBg === 'bg1' ? styles.active : styles.inactive}`}
                    style={{backgroundImage: `url(${getImagePath(backgroundImages[bg1Index])})`}}
                />
                <div
                    className={`${styles.background} ${activeBg === 'bg2' ? styles.active : styles.inactive}`}
                    style={{backgroundImage: `url(${getImagePath(backgroundImages[bg2Index])})`}}
                />
                <div className={styles.options}>
                    <h2 className={styles.title}>Услуги</h2>
                    <ServiceButton setActiveTab={setActiveTab}/>
                    <BuildingTypeButton setBuildingType={setBuildingType}/>
                    <p className={styles.text}>
                        Прозрачная стоимость от 3 000 ₽ за м², все этапы под контролем опытной команды. Всегда на связи,
                        покажем реальные примеры до начала работ.
                    </p>
                </div>
                <div className={`${styles.carouselContainer} ${inView ? styles.animate : ''}`} ref={ref}>
                    <Image src={getImagePath(`/stones/stone1.png`)} alt="Stone" width={161} height={129}
                           className={styles.stone1}/>
                    <Image src={getImagePath(`/stones/stone2.png`)} alt="Stone" width={173} height={152}
                           className={styles.stone2}/>
                    <Image src={getImagePath(`/stones/stone3.png`)} alt="Stone" width={300} height={450}
                           className={styles.stone3}/>
                    <div className={styles.carousel}>
                        {isClient &&
                            cards.map((card, index) => {
                                const slideIndex = (index - currentSlide + cards.length) % cards.length;
                                const isCenter = slideIndex === 0;
                                const isLeftAdjacent = slideIndex === cards.length - 1;
                                const isRightAdjacent = slideIndex === 1;
                                const isAdjacent = isLeftAdjacent || isRightAdjacent;
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.card} ${isCenter ? styles.centerCard : isAdjacent ? styles.adjacentCard : styles.hiddenCard} ${isLeftAdjacent ? styles.leftAdjacent : ''} ${isRightAdjacent ? styles.rightAdjacent : ''}`}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <div className={styles.cardContent} style={typeof card.price === "string" ? {
                                            overflowY: 'auto',
                                            scrollbarWidth: 'none'
                                        } : {overflowY: 'hidden', scrollbarWidth: 'auto'}}>
                                            <div className={styles.titlePrice}>
                                                <h3>{card.title}</h3>
                                                <Field
                                                    className={typeof card.price === "string" ? 'transparentOrangePrice' : 'transparentOrange'}>
                                                    {getPrice(card.price)}
                                                </Field>
                                            </div>
                                            <p>{card.description}</p>
                                            <button className={styles.orderButton}
                                                    onClick={() => openModal(card.title)}>
                                                Заказать
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        <button className={styles.prevButton} onClick={prevSlide}>
                            ←
                        </button>
                        <button className={styles.nextButton} onClick={nextSlide}>
                            →
                        </button>
                    </div>
                </div>
                <Completed/>
                {isClient && (
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal}
                           overlayClassName={styles.overlay}>
                        <h2>Заказать консультацию</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Где ремонт: <input type="text" value={activeTab === 'repair' ? 'Ремонт' : 'Стройка'}
                                                   disabled/>
                            </label>
                            <label>
                                Тип ремонта: <input type="text" value={formData.type} disabled/>
                            </label>
                            <label>
                                Имя: <input type="text" value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                            </label>
                            <label>
                                Телефон*: <input type="tel" value={formData.phone}
                                                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                 required/>
                            </label>
                            <button type="submit">Заказать консультацию</button>
                            <button type="button" onClick={closeModal}>Закрыть</button>
                        </form>
                    </Modal>
                )}
            </section>
        </section>
    );
}
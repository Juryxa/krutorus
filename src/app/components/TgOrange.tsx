'use client';
import {useEffect, useRef, useState} from 'react';
import styles from './TgOrange.module.css';
import Image from 'next/image';
import tgForOrange from 'public/tgForOrange.svg';
import Link from 'next/link';

// Тексты и параметры для разных секций
const SECTION_CONFIG: Record<string, { text: string; param: string }> = {
    services: {
        text: "Если остались вопросы - переходите в чат.",
        param: "OrangeService"
    },
    plan: {
        text: "Мы на связи, сразу ответим на вопросы.",
        param: "OrangePlan"
    },
    howwework: {
        text: "Готовы обсудить ваш проект?",
        param: "OrangeHowWork"
    }
};

export default function TgOrange() {
    const [displayText, setDisplayText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('');
    const animationRef = useRef<NodeJS.Timeout | null>(null);

    // Наблюдатель за секциями
    useEffect(() => {
        const sectionIds = Object.keys(SECTION_CONFIG);
        const sectionElements = sectionIds.map(id => document.getElementById(id));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.id);
                        setIsVisible(true);
                    }
                });

                // Проверяем, если все секции не видны
                const allHidden = entries.every(entry => !entry.isIntersecting);
                if (allHidden) {
                    setIsVisible(false);
                }
            },
            { threshold: 0.4 }
        );

        sectionElements.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => {
            sectionElements.forEach(el => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    // Анимация текста при смене секции
    useEffect(() => {
        if (!currentSection || !isVisible) return;

        const targetText = SECTION_CONFIG[currentSection]?.text || "";
        let currentIndex = 0;

        // Сбрасываем предыдущую анимацию
        if (animationRef.current) {
            clearInterval(animationRef.current);
            setDisplayText('');
        }

        // Анимация печати текста
        animationRef.current = setInterval(() => {
            if (currentIndex <= targetText.length) {
                setDisplayText(targetText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(animationRef.current!);
            }
        }, 80);

        return () => {
            if (animationRef.current) {
                clearInterval(animationRef.current);
            }
        };
    }, [currentSection, isVisible]);

    // Получаем параметр для текущей секции
    const getCurrentParam = () => {
        return SECTION_CONFIG[currentSection]?.param || "default";
    };

    return (
        <div className={`${styles.floatingContainer} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.bubble}>
                {displayText}
                {displayText.length < (SECTION_CONFIG[currentSection]?.text.length || 0) && (
                    <span className={styles.cursor}>|</span>
                )}
            </div>

            <Link
                href={`https://t.me/BuildConsultBot?start=${getCurrentParam()}`}
                className={styles.button}
            >
                <Image
                    className={styles.tgImage}
                    src={tgForOrange}
                    alt="Telegram"
                    width={42}
                    height={36}
                />
            </Link>
        </div>
    );
}
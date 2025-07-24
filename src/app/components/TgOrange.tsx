'use client';
import {useEffect, useRef, useState} from 'react';
import styles from './TgOrange.module.css';
import Image from 'next/image';
import tgForOrange from 'public/tgForOrange.svg';
import Link from 'next/link';

const TEXTS = [
    "Если остались вопросы - переходите в чат.",
    "Мы на связи, сразу ответим на вопросы.",
    "Готовы обсудить ваш проект?"
];

export default function TgOrange() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const servicesSectionRef = useRef<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const animationRef = useRef<NodeJS.Timeout | null>(null);

    // Наблюдатель за секцией Services
    useEffect(() => {
        servicesSectionRef.current = document.getElementById('services-section');

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Секция в поле зрения - показываем кнопку
                    setIsVisible(true);
                } else {
                    // Секция ушла из поля зрения - скрываем кнопку
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 0);

                }
            },
            {threshold: 0.4}
        );

        if (servicesSectionRef.current) {
            observerRef.current.observe(servicesSectionRef.current);
        }

        return () => {
            if (observerRef.current && servicesSectionRef.current) {
                observerRef.current.unobserve(servicesSectionRef.current);
            }
            if (animationRef.current) {
                clearTimeout(animationRef.current);
            }
        };
    }, []);

    // Анимация печатания текста (только когда кнопка видима)
    useEffect(() => {
        if (!isVisible) return;

        const currentText = TEXTS[currentTextIndex];
        let timer: NodeJS.Timeout;

        if (isDeleting) {
            if (displayText.length > 0) {
                timer = setTimeout(() => {
                    setDisplayText(currentText.substring(0, displayText.length - 1));
                }, 40);
            } else {
                setIsDeleting(false);
                setCurrentTextIndex((prev) => (prev + 1) % TEXTS.length);
            }
        } else {
            if (displayText.length < currentText.length) {
                timer = setTimeout(() => {
                    setDisplayText(currentText.substring(0, displayText.length + 1));
                }, 80);
            } else {
                timer = setTimeout(() => setIsDeleting(true), 2000);
            }
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible, displayText, isDeleting, currentTextIndex]);

    return (
        <div className={`${styles.floatingContainer} ${isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.bubble}>
                {displayText}
                {/* Курсор для эффекта печати */}
                {!isDeleting && displayText.length < TEXTS[currentTextIndex].length && (
                    <span className={styles.cursor}>|</span>
                )}
            </div>

            <Link href="/" className={styles.button}>
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
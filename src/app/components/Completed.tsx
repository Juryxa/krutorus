'use client';

import {useEffect, useRef, useState} from 'react';
import styles from './Completed.module.css';
import Image from 'next/image';

const mediaFiles = [
    '/works/1.webp',
    '/works/2.webp',
    '/works/3.webp',
    '/works/4.webp',
    '/works/5.webp',
    '/works/6.webp',
    '/works/7.webp',
    '/works/8.webp',
    '/works/9.webp',
    '/works/10.webp',
    '/works/11.webp',
    '/works/12.webp',
    '/works/13.webp',
    '/works/14.webp',
    '/works/15.webp',
];

export default function Completed() {
    const [isPlaying, setIsPlaying] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const positionRef = useRef(1000); // Начальная позиция
    const speed = 1;
    const contentRef = useRef<HTMLDivElement>(null);
    const isPlayingRef = useRef(isPlaying); // Ref для актуального состояния

    // Синхронизируем ref с состоянием
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            const shouldPlay = document.visibilityState === 'visible';
            setIsPlaying(shouldPlay);
            isPlayingRef.current = shouldPlay;
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current || !innerRef.current || !contentRef.current) return;

        const inner = innerRef.current;
        const content = contentRef.current;

        const clone = content.cloneNode(true) as HTMLDivElement;
        inner.appendChild(clone);

        const animate = () => {
            if (!isPlayingRef.current) {
                // Если анимация на паузе - запрашиваем следующий кадр без изменений
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            positionRef.current -= speed;
            const contentWidth = content.offsetWidth;

            if (Math.abs(positionRef.current) >= contentWidth) {
                positionRef.current = 0;
            }

            inner.style.transform = `translateX(${positionRef.current}px)`;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            if (clone.parentNode === inner) {
                inner.removeChild(clone);
            }
        };
    }, []);

    const openInNewWindow = (src: string) => {
        window.open(src, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.completed} ref={containerRef}>
            <div className={styles.marqueeContainer} ref={innerRef}>
                <div ref={contentRef} className={styles.marqueeContent}>
                    {mediaFiles.map((src, index) => (
                        <div
                            key={`${index}-${src}`}
                            className={styles.imageContainer}
                            onClick={() => openInNewWindow(src)}
                        >
                            <Image
                                src={src}
                                alt={`Work ${index + 1}`}
                                width={330}
                                height={200}
                                quality={100}
                                className={styles.image}
                                loading="eager"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
'use client'
import styles from './Nav.module.css'
import {Button} from "@/app/components/Button";
import {useEffect, useState} from 'react';

interface NavProps {
    activeSection: string;
}

function Nav({activeSection}: NavProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // Добавим флаг монтирования

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'});
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        setIsMounted(true); // Компонент смонтирован
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
            if (window.innerWidth >= 700) {
                setIsMenuOpen(false);
            }
        };

        // Проверяем размер сразу при монтировании
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        {id: 'krutorus', label: 'РемСтройПро'},
        {id: 'calculator', label: 'Калькулятор'},
        {id: 'services', label: 'Услуги'},
        {id: 'plan', label: 'Разработка проектов'},
        {id: 'howwework', label: 'Условия работы'},
        {id: 'aboutus', label: 'О нас'}
    ];

    // На сервере и до первого рендера на клиенте не рендерим кнопки
    if (!isMounted) {
        return (
            <nav className={`${styles.nav} ${styles.skeleton}`}>
                <div className={styles.hamburgerSkeleton}></div>
            </nav>
        );
    }

    return (
        <nav className={`${styles.nav} ${isMobile ? styles.mobileNav : ''}`}>
            <div className={styles.buttons}>
                {isMobile ? (
                    <>
                        <div className={styles.hamburger} onClick={toggleMenu}>
                            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
                            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
                            <div className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></div>
                        </div>
                        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                            {navItems.map(item => (
                                    <Button
                                    key={item.id}
                                    pressed={activeSection === item.id}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.label}
                                    </Button>
                            ))}
                        </div>
                    </>
                ) : (
                    navItems.map(item => (
                        <Button
                            key={item.id}
                            pressed={activeSection === item.id}
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.label}
                        </Button>
                    ))
                )}
            </div>
        </nav>
    );
}

export default Nav;
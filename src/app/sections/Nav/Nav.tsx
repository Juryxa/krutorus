'use client'
import styles from './Nav.module.css'
import {Button} from "@/app/components/Button";

interface NavProps {
    activeSection: string;
}

function Nav({ activeSection }: NavProps) {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.buttons}>
                <Button
                    pressed={activeSection === 'krutorus'}
                    onClick={() => scrollToSection('krutorus')}
                >
                    Круторус
                </Button>
                <Button pressed={false}>Калькулятор</Button>
                <Button
                    pressed={activeSection === 'services'}
                    onClick={() => scrollToSection('services')}
                >
                    Услуги
                </Button>
                <Button
                    pressed={activeSection === 'plan'}
                    onClick={() => scrollToSection('plan')}
                >
                    Разработка проектов
                </Button>
                <Button
                    pressed={activeSection === 'howwework'}
                    onClick={() => scrollToSection('howwework')}
                >
                    Условия работы
                </Button>
                <Button
                    pressed={activeSection === 'aboutus'}
                    onClick={() => scrollToSection('aboutus')}
                >
                    О нас
                </Button>
            </div>
        </nav>
    );
}

export default Nav;
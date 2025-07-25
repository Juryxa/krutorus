'use client'
import styles from './Plan.module.css'
import Image from 'next/image'
import trianglePencil from 'public/trianglePencil.png'
import crossedPencil from 'public/crossedPencil.png'
import TitleH2 from "@/app/components/TitleH2";

function Plan() {
    return (
        <section className={styles.plan}>
            <TitleH2>Проект перепланировки и дизайн под ключ</TitleH2>
            <h3 className={styles.titleH3}>польза и выгода.</h3>
            <div className={styles.cards}>
                <span className={styles.adjacentCard}>
                    <Image className={styles.adjacentImage} src={trianglePencil} alt={'pencil'}/>
                    <p className={styles.adjacentText}>Перепланировка квартир</p>
                </span>
                <span className={styles.centralCard}>
                    <h4 className={styles.titleH4}>Создаём проекты перепланировки и дизайна — под ключ</h4>
                    <p>Разрабатываем проекты перепланировки,<br/>
                        дизайна и инженерных систем — от концепции до<br/>
                        рабочей документации. Всё в одном месте, с<br/>
                        учётом норм и ваших пожеланий.</p>
                    <p>Базовый эскиз – от 1000 ₽/м²<br/>
                        Рабочие чертежи – от 1500 ₽/м²<br/>
                        Полный проект – от 2500 ₽/м²<br/>
                        Авторский / премиум – от 4500 ₽/м²<br/>
                    </p>
                    <button className={styles.orderButton}>
                        Консультация по проекту
                    </button>
                </span>
                <span className={styles.adjacentCard}>
                    <Image className={styles.adjacentImage} src={crossedPencil} alt={'pencil'}/>
                    <p className={styles.adjacentText}>Дизайн-проект квартир и домов</p>
                </span>
            </div>
        </section>
    );
}

export default Plan;
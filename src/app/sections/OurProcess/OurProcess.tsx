'use client'
import {useEffect, useState} from 'react'
import styles from './OurProcess.module.css'
import Field from '@/app/components/Field'
import Completed from "@/app/components/Completed";

function OurProcess() {
    const [activeIndex, setActiveIndex] = useState(0)
    const fields = ['Заявка', 'Замер', 'Эскиз', 'Утверждение', 'Рабочая документация']

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev >= fields.length - 1 ? -1 : prev + 1))
        }, 3700)

        return () => clearInterval(interval)
    }, [fields.length])

    return (
        <section className={styles.process}>
            <h2 className={styles.title}>Наш процесс</h2>
            <div className={styles.fields}>
                {fields.map((field, index) => (
                    <Field
                        key={index}
                        className={activeIndex === index ? 'orangeGlow' : 'gray'}
                    >
                        {field}
                    </Field>
                ))}
            </div>
            <Completed/>
        </section>
    )
}

export default OurProcess
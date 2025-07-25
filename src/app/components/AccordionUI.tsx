'use client'

import React, {useState} from 'react';
import styles from './AccordionUI.module.css';

interface AccordionSection {
    title: string;
    content: string;
}

interface AccordionProps {
    sections: AccordionSection[];
}

const AccordionUI: React.FC<AccordionProps> = ({ sections }) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        setExpandedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index) // Удаляем индекс, если секция уже открыта
                : [...prev, index] // Добавляем индекс, если секция закрыта
        );
    };

    return (
        <div className={styles.accordion}>
            {sections.map((section, index) => (
                <div key={index} className={styles.section}>
                    <div className={styles.block} onClick={() => handleToggle(index)}>
                        <div className={styles.title}>
                            {section.title}
                            <span className={`${styles.arrow} ${expandedIndices.includes(index) ? styles.expanded : ''}`}></span>
                        </div>
                        <div className={`${styles.contentWrapper} ${expandedIndices.includes(index) ? styles.expanded : ''}`}>
                            <p className={styles.content}>{section.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionUI;
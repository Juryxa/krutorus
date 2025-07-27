'use client'

import React, {useState} from 'react';
import styles from './AccordionUI.module.css';

interface AccordionSection {
    title: string;
    content: string;
}

interface AccordionProps {
    sections: AccordionSection[];
    animate: boolean;
}

const AccordionUI: React.FC<AccordionProps> = ({ sections, animate }) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        setExpandedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className={styles.accordion}>
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`${styles.section} ${animate ? styles.animate : ''}`}
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(30px)',
                        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`
                    }}
                >
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
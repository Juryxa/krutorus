'use client'
import styles from './Field.module.css';

interface FieldProps {
    children: React.ReactNode,
    className: 'orange' | 'gray' | 'orangeTop'| 'transparentOrange' | 'transparentGray' | 'transparentOrangePrice' | 'orangeGlow';
}

function Field({children, className}: FieldProps) {
    return (
        <span className={`${styles.field} ${styles[className]}`}>
            {children}
        </span>
    );
}

export default Field;
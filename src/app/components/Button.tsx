'use client'
import {useState} from 'react';
import styles from './Button.module.css';
import {Roboto_Flex} from "next/font/google";

interface ButtonProps {
    children: React.ReactNode;
}

const robotoFlex = Roboto_Flex({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
})

export const Button = ({ children }: ButtonProps) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        setIsPressed(!isPressed);
    };

    return (
        <button
            className={`${styles.button} ${isPressed ? styles.pressed : ''} ${robotoFlex.className}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};
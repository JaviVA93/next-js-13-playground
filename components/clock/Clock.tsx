'use client'

import { useEffect, useState } from 'react';
import styles from './clock.module.css';

export default function Clock() {

    const [date, setDate] = useState<String>('');

    function updateTime () {
        const d = new Date();
        setDate(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
    }

    useEffect(() => {
        const timerInterval = setInterval(updateTime, 1000);
        
        return () => {
            // Clean when unmount component
            clearInterval(timerInterval);
        }
    }, [])

    return (
        <div className={styles.container}>
            <h2>Current time:</h2>
            <span className={styles.time}>{date}</span>
        </div>
    )
}
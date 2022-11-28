'use client'

import { useEffect, useState } from 'react';
import styles from './clock.module.css';

export default function Clock() {

    const [date, setDate] = useState<String>('00:00:00');

    function updateTime () {
        const d = new Date(),
            hours = (d.getHours() > 9) ? d.getHours() : `0${d.getHours()}`,
            minutes = (d.getMinutes() > 9) ? d.getMinutes() : `0${d.getMinutes()}`,
            seconds = (d.getSeconds() > 9) ? d.getSeconds() : `0${d.getSeconds()}`;
        
        setDate(`${hours}:${minutes}:${seconds}`);
    }

    useEffect(() => {
        updateTime();
        const timerInterval = setInterval(updateTime, 1000);
        
        return () => {
            // Clean when unmount component
            clearInterval(timerInterval);
        }
    }, []);

    return (
        <div className={styles.container}>
            <h2>Current time:</h2>
            <span className={styles.time}>{date}</span>
        </div>
    )
}
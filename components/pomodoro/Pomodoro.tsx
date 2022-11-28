'use client'

import { useEffect, useRef, useState } from "react";
import styles from "./pomodoro.module.css";
import PlayButtonSvg from "../assets/PlayButtonSvg";
import PauseButtonSvg from "../assets/PauseButtonSvg";
import StopButtonSvg from "../assets/StopButtonSvg";

export default function Pomodoro() {
    interface PomoTimeInterface {
        seconds: number,
        minutes: number
    }

    const pomo_vars = useRef({
        status: '',
        interval: {
            minutes: 25,
            seconds: 0,
        },
        timeRemain: {
            seconds: 0,
            minutes: 0,
            totalInMiliseconds: 0,
        },
        timeElapsed: {
            miliseconds: 0,
        },
        lastUpdateTimestamp: 0,
    });
    const pomoAlarm = useRef<HTMLAudioElement | null>(null)
    const [pomoTime, setPomoTime] = useState('00:00');
    const [playPauseButtonIcon, setPlayPauseButtonIcon] = useState(PlayButtonSvg);
    const pomoInterval = useRef<NodeJS.Timer | null>(null)


    function requestNotificatinoPermission() {
        console.log('requesting notification permission')
        let notifPermission = getNotificationPermission();
        console.dir(notifPermission)
        if (notifPermission !== 'default')
            return;
    
        window.Notification.requestPermission();
    }

    function getNotificationPermission() {
        return (window.Notification) ? window.Notification.permission : null;
    }

    function pomoEndNotification() {
        let notifPermission = getNotificationPermission();
        if (notifPermission === 'granted') {
            let notification = new Notification('Pomodoro finished! Time for a break :)');
            notification.onclick = () => {
                parent.focus();
                window.focus();
            }
        }
    }

    function setPlayPauseButtonBackground(value: string) {
        try {
            if (value === 'play')
                setPlayPauseButtonIcon(PlayButtonSvg);
            else if (value === 'pause')
                setPlayPauseButtonIcon(PauseButtonSvg);
            else
                throw 'setPlayPauseButtonBackground: value is no valid.';
        } catch (e) {
            console.error(e);
        }
    }

    function convertTimeToMS(minutes: number, seconds: number): number {
        return (minutes * 60000) + (seconds * 1000);
    }

    function convertMsToTime(miliseconds: number): PomoTimeInterface {
        if (miliseconds <= 0)
            return {
                seconds: 0,
                minutes: 0
            }

        let mins = Math.floor(miliseconds / 60000)
        let secs = Math.floor((miliseconds % 60000) / 1000);

        return (secs === 60) ? {
            seconds: 0,
            minutes: mins + 1
        } : {
            seconds: secs,
            minutes: mins
        }
    }

    function calculateTimeRemain() {
        let elapsedTimeSinceLastUpdate = new Date().getTime() - pomo_vars.current.lastUpdateTimestamp;
        let elapsedTimeUpdatedMs =
            elapsedTimeSinceLastUpdate + pomo_vars.current.timeElapsed.miliseconds;

        pomo_vars.current.timeElapsed.miliseconds = elapsedTimeUpdatedMs;

        let timeRemainMs = pomo_vars.current.timeRemain.totalInMiliseconds - elapsedTimeUpdatedMs;
        let timeRemain = convertMsToTime(timeRemainMs);

        pomo_vars.current.timeRemain.minutes = timeRemain.minutes;
        pomo_vars.current.timeRemain.seconds = timeRemain.seconds;

        pomo_vars.current.lastUpdateTimestamp = new Date().getTime();
    }

    function printTime() {
        let min = pomo_vars.current.timeRemain.minutes.toString();
        min = (min.length === 1) ? `0${min}` : min;
        let sec = pomo_vars.current.timeRemain.seconds.toString();
        sec = (sec.length === 1) ? `0${sec}` : sec;

        setPomoTime(`${min}:${sec}`);
    }

    function updatePomodoro() {
        if (pomo_vars.current.status === 'pause' || pomo_vars.current.status === 'stop' || pomo_vars.current.status === 'end') {
            return;
        }

        calculateTimeRemain();
        printTime();

        if (pomo_vars.current.timeRemain.seconds <= 0 && pomo_vars.current.timeRemain.minutes <= 0) {
            pomo_vars.current.timeRemain.seconds = 0;
            pomo_vars.current.timeRemain.minutes = 0;
            pomo_vars.current.status = 'end';

            pomoAlarm.current?.play();
            pomoEndNotification();
            setPlayPauseButtonBackground('play');
            if (pomoInterval.current) clearInterval(pomoInterval.current);
        }
        else if (pomo_vars.current.status === 'pause')
            setPlayPauseButtonBackground('play');
        else
            setPlayPauseButtonBackground('pause');
    }

    const startPauseResumePomodoro = () => {
        console.log('startPauseResumePomodoro')
        console.dir(pomo_vars.current)
        if (pomo_vars.current.status === 'running') {
            pomo_vars.current.status = 'pause';
            setPlayPauseButtonBackground('play');
            console.log('Pausing pomo')
            if (pomoInterval.current) clearInterval(pomoInterval.current);
        }
        else {
            if (pomo_vars.current.status !== 'pause') {
                pomo_vars.current.timeRemain = JSON.parse(JSON.stringify(pomo_vars.current.interval));
                pomo_vars.current.timeRemain.totalInMiliseconds =
                    convertTimeToMS(pomo_vars.current.timeRemain.minutes, pomo_vars.current.timeRemain.seconds);
                pomo_vars.current.timeElapsed.miliseconds = 0;
            }
            pomo_vars.current.lastUpdateTimestamp = new Date().getTime();

            pomo_vars.current.status = 'running';

            setPlayPauseButtonBackground('pause');

            pomoInterval.current = setInterval(updatePomodoro, 250);
        }
    }

    const stopPomodoro = () => {
        pomo_vars.current.status = 'stop';
        pomo_vars.current.timeRemain = JSON.parse(JSON.stringify(pomo_vars.current.interval));
        printTime();
        setPlayPauseButtonBackground('play');
        if (pomoInterval.current) clearInterval(pomoInterval.current);
        if (pomoAlarm.current) {
            pomoAlarm.current.pause();
            pomoAlarm.current.currentTime = 0;
        }
    }

    
    useEffect(() => {
        pomo_vars.current.timeRemain = JSON.parse(JSON.stringify(pomo_vars.current.interval));
        pomoAlarm.current = new Audio('/assets/clock-alarm.mp3')
        printTime();
        requestNotificatinoPermission();
    }, [])

    return (
        <div className={styles.pomoCard}>
            <h1>POMODORO</h1>
            <span className={styles.pomoTime}>{pomoTime}</span>
            <div className={styles.pomBtnsWrapper}>
                <button id="pomo-start" onClick={startPauseResumePomodoro} aria-label="Start pomodoro"
                    style={{ width: 50, height: 50 }}>
                    {playPauseButtonIcon}
                </button>
                <button id="pomo-stop" onClick={stopPomodoro} aria-label="Stop pomodoro"
                    style={{ width: 50, height: 50 }}>
                    <StopButtonSvg />
                </button>
            </div >
        </div >
    )
}
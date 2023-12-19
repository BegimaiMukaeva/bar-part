import React, {useState, useEffect} from 'react';
import styles from "./ProfileDataSchedule.module.css";
import exitImage from "../../../img/SignOut.svg";
import ExitOutModal from "../ExitOutModal/ExitOutModal";
import axios from "axios";

const ProfileDataSchedule = () => {
    const [showExitModal, setShowExitModal] = useState(false);
    const [schedule, setSchedule] = useState([]);
    // const schedule = [
    //     { day: 'Понедельник', shift: 'day', startTime: '11:00', endTime: '17:00' },
    //     { day: 'Вторник', shift: 'night', startTime: '17:00', endTime: '22:00' },
    //     { day: 'Среда', shift: 'day', startTime: '11:00', endTime: '17:00' },
    //     { day: 'Четверг', shift: 'day', startTime: '11:00', endTime: '17:00'},
    //     { day: 'Пятница', shift: 'off' },
    //     { day: 'Суббота', shift: 'off' },
    //     { day: 'Воскресенье', shift: 'off' },
    // ];

    const daysOfWeek = {
        '1': 'Понедельник',
        '2': 'Вторник',
        '3': 'Среда',
        '4': 'Четверг',
        '5': 'Пятница',
        '6': 'Суббота',
        '7': 'Воскресенье',
    };


    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is not available.');
            return;
        }

        axios.get('https://muha-backender.org.kg/accounts/my-schedule/', {
            headers: {
                'Authorization': `Token ${accessToken}`,
                'accept': 'application/json',
            },
        })
            .then(response => {
                const formattedSchedule = response.data.map(item => ({
                    day: daysOfWeek[item.workday.toString()],
                    startTime: item.start_time,
                    endTime: item.end_time,
                    shift: getShiftType(item.start_time, item.end_time),
                }));
                setSchedule(formattedSchedule);
            })
            .catch(error => {
                console.error('Ошибка при запросе расписания:', error);
            });
    }, []);

    const getShiftType = (startTime, endTime) => {
        if (!startTime || !endTime) {
            return 'off';
        }
        const startHour = parseInt(startTime.split(':')[0], 10);
        if (startHour >= 11 && startHour < 17) {
            return 'day';
        } else if (startHour >= 17) {
            return 'night';
        }
    };

    const getShiftStyle = (shift) => {
        switch (shift) {
            case 'day':
                return styles.profileScheduleBoxDay;
            case 'night':
                return styles.profileScheduleBoxNight;
            case 'off':
                return styles.profileScheduleRest;
            default:
                return '';
        }
    };

    const handleExitClick = () => {
        setShowExitModal(true);
    };
    const handleCancelExit = () => {
        setShowExitModal(false);
    };
    // const getShiftStyle = (shift) => {
    //     switch (shift) {
    //         case 'day':
    //             return styles.profileScheduleBoxDay;
    //         case 'night':
    //             return styles.profileScheduleBoxNight;
    //         case 'off':
    //             return styles.profileScheduleRest;
    //         default:
    //             return '';
    //     }
    // };

    return (
        <div className={styles.profileMain}>
            <div className={styles.profileForm}>
                <div className={styles.profileScheduleBox}>
                    <div className={styles.profileScheduleTimes}>
                        <div className={styles.profileSchedule}>
                            <div className={styles.profileScheduleBoxDay}>
                            </div>
                            <div className={styles.boxText}>
                                Дневная смена с 11:00 до 17:00
                            </div>
                        </div>
                        <div className={styles.profileSchedule}>
                            <div className={styles.profileScheduleBoxNight}>
                            </div>
                            <div className={styles.boxText}>
                                Вечерняя смена с 17:00 до 22:00
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.profileSchedule}>
                            <div className={styles.profileScheduleRest}>
                            </div>
                            <div className={styles.boxText}>
                                Выходной
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={styles.profileScheduleTheme}>График работы</p>
                </div>
                <div className={styles.profileScheduleList}>
                    <ul>
                        {schedule.map((item, index) => (
                            <li key={index}>
                                <div className={getShiftStyle(item.shift)}> </div>
                                {item.day}
                                {item.shift !== 'off' && ` с ${item.startTime} до ${item.endTime}`}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.exitPanel} onClick={handleExitClick}>
                    <img className={styles.exitPanelImage} src={exitImage} alt=""/>
                    <button className={styles.exitPanelButton}>Выход</button>
                </div>
                {showExitModal && (
                    <ExitOutModal
                        onCancel={handleCancelExit}
                    />
                )}
            </div>

        </div>
    );
};

export default ProfileDataSchedule;
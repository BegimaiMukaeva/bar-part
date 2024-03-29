import React, {useState, useEffect} from 'react';
import styles from "./ProfileDataSchedule.module.css";
import exitImage from "../../../img/SignOut.svg";
import ExitOutModal from "../ExitOutModal/ExitOutModal";
import axios from "axios";

const ProfileDataSchedule = () => {
    const [showExitModal, setShowExitModal] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const daysOfWeek = {
        '1': 'Понедельник',
        '2': 'Вторник',
        '3': 'Среда',
        '4': 'Четверг',
        '5': 'Пятница',
        '6': 'Суббота',
        '7': 'Воскресенье',
    };


   // useEffect(() => {
   //      const accessToken = localStorage.getItem('accessToken');
   //      if (!accessToken) {
   //          console.error('Access token is not available.');
   //          return;
   //      }
   //
   //      axios.get('https://muha-backender.org.kg/accounts/my-schedule/', {
   //          headers: { 'Authorization': `Bearer ${accessToken}` },
   //      })
   //      .then(response => {
   //          const formattedSchedule = response.data.workdays.map(item => ({
   //              day: daysOfWeek[item.workday.toString()],
   //              startTime: item.start_time,
   //              endTime: item.end_time,
   //              shift: getShiftType(item.start_time, item.end_time),
   //          }));
   //          setSchedule(formattedSchedule);
   //      })
   //      .catch(error => {
   //          console.error('Ошибка при запросе расписания:', error);
   //      });
   //  }, []);
useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('Access token is not available.');
        return;
    }

    axios.get('https://muha-backender.org.kg/accounts/my-schedule/', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
    })
    .then(response => {
        const fullWeekSchedule = Object.entries(daysOfWeek).map(([key, value]) => ({
            day: value,
            startTime: '',
            endTime: '',
            shift: 'off',
        }));

        response.data.workdays.forEach(item => {
            const dayIndex = fullWeekSchedule.findIndex(day => day.day === daysOfWeek[item.workday.toString()]);
            if (dayIndex !== -1) {
                fullWeekSchedule[dayIndex] = {
                    day: daysOfWeek[item.workday.toString()],
                    startTime: item.start_time,
                    endTime: item.end_time,
                    shift: getShiftType(item.start_time, item.end_time),
                };
            }
        });

        setSchedule(fullWeekSchedule);
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
        const endHour = parseInt(endTime.split(':')[0], 10);

        if (startHour >= 8 && endHour <= 17) {
            return 'day';
        } else if (startHour >= 17 && endHour <= 22) {
            return 'night';
        } else {
            return 'off';
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

    const handleExitClick = () => setShowExitModal(true);
    const handleCancelExit = () => setShowExitModal(false);

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
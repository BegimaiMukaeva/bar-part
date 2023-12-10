import React, {useState} from 'react';
import styles from "./ProfileDataSchedule.module.css";
import exitImage from "../../../img/SignOut.svg";
import ExitOutModal from "../ExitOutModal/ExitOutModal";

const ProfileDataSchedule = () => {
    const [showExitModal, setShowExitModal] = useState(false);
    const schedule = [
        { day: 'Понедельник', shift: 'day', startTime: '11:00', endTime: '17:00' },
        { day: 'Вторник', shift: 'night', startTime: '17:00', endTime: '22:00' },
        { day: 'Среда', shift: 'day', startTime: '11:00', endTime: '17:00' },
        { day: 'Четверг', shift: 'day', startTime: '11:00', endTime: '17:00'},
        { day: 'Пятница', shift: 'off' },
        { day: 'Суббота', shift: 'off' },
        { day: 'Воскресенье', shift: 'off' },
    ];
    const handleExitClick = () => {
        setShowExitModal(true);
    };
    const handleCancelExit = () => {
        setShowExitModal(false);
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
                        {/*<li><div className={styles.profileScheduleBoxDay}> </div> Понедельник</li>*/}
                        {/*<li><div className={styles.profileScheduleBoxNight}> </div> Вторник</li>*/}
                        {/*<li><div className={styles.profileScheduleRest}> </div> Среда</li>*/}
                        {/*<li><div className={styles.profileScheduleBoxDay}> </div> Четверг</li>*/}
                        {/*<li><div className={styles.profileScheduleRest}> </div> Пятница</li>*/}
                        {/*<li><div className={styles.profileScheduleBoxDay}> </div> Суббота</li>*/}
                        {/*<li><div className={styles.profileScheduleBoxDay}> </div> Воскресенье</li>*/}

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
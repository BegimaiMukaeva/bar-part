import React, { useState } from 'react';
import styles from '../../orders/AllOrders/AllOrders.module.css';
import ProfileData from '../ProfileData/ProfileData';
import ProfileDataSchedule from '../ProfileDataSchedule/ProfileDataSchedule';

const Profile = () => {
    const [activeOrderType, setActiveOrderType] = useState('profileDate');

    const handleTakeAwayClick = () => {
        setActiveOrderType('profileDate');
    };

    const handleOrderHereClick = () => {
        setActiveOrderType('profileDateSchedule');
    };

    return (
        <div>
            <div className={styles.allOrders}>
                <div className={styles.orderTakeAway}>
                    <button
                        // className={styles.orderTakeAwayButtons}
                        className={`${styles.orderTakeAwayButtons} ${activeOrderType === 'profileDate' ? styles.activeButton : ''}`}
                        onClick={handleTakeAwayClick}
                    >
                       Личные данные
                    </button>
                </div>
                <div className={styles.orderTakeAway}>
                    <button
                        className={`${styles.orderHereButtons} ${activeOrderType === 'profileDateSchedule' ? styles.activeButton : ''}`}
                        onClick={handleOrderHereClick}
                    >
                        График работы
                    </button>
                </div>
            </div>
            <div className={styles.orderBody}>
                {activeOrderType === 'profileDate' && <ProfileData />}
                {activeOrderType === 'profileDateSchedule' && <ProfileDataSchedule />}
            </div>
        </div>
    );
};

export default Profile;

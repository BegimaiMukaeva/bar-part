import React, { useState, useEffect } from 'react';
import styles from './ProfileData.module.css';
import exitImage from '../../../img/SignOut.svg';
import ExitOutModal from '../ExitOutModal/ExitOutModal';
import axios from 'axios';


const ProfileData = () => {
    const [showExitModal, setShowExitModal] = useState(false);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://muha-backender.org.kg/accounts/my-profile/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                setProfileData(response.data);
            } catch (error) {
                console.error('There was an error fetching the profile data!', error);
            }
        };

        fetchProfileData();
    }, []);


    const handleExitClick = () => {
        setShowExitModal(true);
    };
    const handleCancelExit = () => {
        setShowExitModal(false);
    };

    return (
        <div className={styles.profileMain}>
            <div className={styles.profileForm}>
                <div className={styles.profileInfo}>
                    <p className={styles.profileInfoTitle}>Личные данные</p>
                </div>
                <div  className={styles.profileInfo}>
                    <label className={styles.nameOfInput}>Имя
                        <input
                            type="text"
                            className={styles.textInput}
                            value={profileData.first_name || ''}
                            readOnly
                        />
                    </label>
                    <label className={styles.nameOfInput}>Фамилия
                        <input
                            type="text"
                            className={styles.textInput}
                            value={profileData.last_name || ''}
                            readOnly
                        />
                    </label>
                </div>
                <div className={styles.profileInfo}>
                    <label className={styles.nameOfInput}>Номер телефона
                        <input
                            type="tel"
                            className={styles.textInput}
                            value={profileData.phone_number || ''}
                            readOnly
                        />
                    </label>
                    <label className={styles.nameOfInput}>Дата рождения
                        <input
                            type="date"
                            className={styles.textInput}
                            value={profileData.birth_date || ''}
                            readOnly
                        />
                    </label>
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

export default ProfileData;
import React, { useState } from 'react';
import styles from './ProfileData.module.css';
import exitImage from '../../../img/SignOut.svg';
import ExitOutModal from '../ExitOutModal/ExitOutModal';

const ProfileData = () => {
    const [showExitModal, setShowExitModal] = useState(false);

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
                        />
                    </label>
                    <label className={styles.nameOfInput}>Фамилия
                        <input
                            type="text"
                            className={styles.textInput}
                        />
                    </label>
                </div>
                <div className={styles.profileInfo}>
                    <label className={styles.nameOfInput}>Номер телефона
                        <input
                            type="number"
                            className={styles.textInput}
                        />
                    </label>
                    <label className={styles.nameOfInput}>Дата рождения
                        <input
                            type="number"
                            className={styles.textInput}
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
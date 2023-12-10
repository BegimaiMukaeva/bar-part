import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../orders/OrderCloseModal/OrderCloseModal.module.css';
import closeOrderCard from "../../../img/X.svg";

const ExitOutModal = ({ onCancel, orderNumber }) => {
    const navigate = useNavigate();

    const exitOutPanel = () =>{
        navigate('/');
    }

    return (
        <div className={styles.modalOverlay} onClick={onCancel}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.orderCardTitle}>
                    <p className={styles.modalProfileTitle}>Выход из учетной записи</p>
                    <button onClick={onCancel} className={styles.orderCardCloseButton}>
                        <img src={closeOrderCard} alt="Close" className={styles.orderCardCloseImg}/>
                    </button>
                </div>
                <p className={styles.modalMassage}>Вы действительно хотите выйти из учетной записи?</p>
                <div className={styles.modalActions}>
                    <button onClick={exitOutPanel}className={styles.confirmButton}>Да</button>
                    <button onClick={onCancel} className={styles.rejectButton}>Нет</button>
                </div>
            </div>
        </div>
    );
};

export default ExitOutModal;

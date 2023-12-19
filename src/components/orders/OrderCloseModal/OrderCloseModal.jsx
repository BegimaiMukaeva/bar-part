import React from 'react';
import styles from './OrderCloseModal.module.css';
import closeOrderCard from "../../../img/X.svg";

const OrderCloseModal = ({ onConfirm, onCancel, orderNumber }) => {
    return (
        <div className={styles.modalOverlay} onClick={onCancel}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.orderCardTitle}>
                    <p className={styles.modalTitle}>Отменить заказ</p>
                    <button onClick={onCancel} className={styles.orderCardCloseButton}>
                        <img src={closeOrderCard} alt="Close" className={styles.orderCardCloseImg}/>
                    </button>
                </div>
                <p className={styles.modalMassage}>Вы действительно хотите отменить заказ №{orderNumber}?</p>
                <div className={styles.modalActions}>
                    <button onClick={() => onConfirm(orderNumber)}  className={styles.confirmButton}>Да</button>
                    <button onClick={onCancel} className={styles.rejectButton}>Нет</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCloseModal;

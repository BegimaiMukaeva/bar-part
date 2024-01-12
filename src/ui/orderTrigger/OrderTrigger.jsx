import React from 'react';
import styles from "./OrderTrigger.module.css";
import closeOrderCard from "../../img/X.svg";

const OrderTrigger = ({ order, onClose }) => {
    return (
        <div className={styles.triggerContainer}>
            <div className={styles.overlay} onClick={onClose} /> {/* Элемент затемнения */}
            <div className={styles.orderTrigger}>
                <div className={styles.orderHeader}>
                    <h2>Напоминание!</h2>
                    <button onClick={onClose} className={styles.closeButton}>
                        <img src={closeOrderCard} alt="Закрыть"/>
                    </button>
                </div>
                <p className={styles.orderContent}>{order.content}</p>
            </div>
        </div>
    );
};
export default OrderTrigger;

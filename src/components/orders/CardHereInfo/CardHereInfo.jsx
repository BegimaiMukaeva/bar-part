import React, { useEffect, useState } from 'react';
import styles from './CardHereInfo.module.css';
import closeOrderCard from "../../../img/X-white.svg";
import axios from "axios";

const CardHereInfo = ({ orderId, onClose }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is not available.');
            return;
        }

        axios.get(`https://muha-backender.org.kg/customers/my-orders/${orderId}/`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        })
            .then(response => {
                setOrderDetails(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении информации о заказе:', error);
            });
    }, [orderId]);

    if (!orderDetails) {
        return <div>Loading...</div>;

    }

    return (
        <div className={styles.cardInfoModal}>
            <div className={styles.cardInfoMain}>
                <div>
                    <div className={styles.notificationModalTitle}>
                        <p className={styles.notificationModalTheme}>Заказ в заведении</p>
                        <button className={styles.notificationModalCloseButton} onClick={onClose}>
                            <img src={closeOrderCard} alt="Close"/>
                        </button>
                    </div>

                    <div>
                        {orderDetails.items.map((item, index) => (
                            <div key={index} className={styles.orderInfoCard}>
                                {/*<div>*/}
                                {/*    <p>{item.id}</p>*/}
                                {/*    <p>{item.waiter_name}</p>*/}
                                {/*</div>*/}
                                <div>
                                    <img className={styles.orderInfoCardImage} src={item.item_image} alt={item.item_name}/>
                                </div>
                                <div className={styles.orderInformation}>
                                    <div className={styles.orderDescriptionButtons}>
                                        <p className={styles.orderInfoTitle}>{item.item_name}</p>
                                        <span className={styles.orderInfoTitle}>{item.quantity}</span>
                                    </div>
                                    <div className={styles.orderDescription}>
                                        <p className={styles.orderInfoPrice}>{item.item_total_price} с</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={styles.orderAllPrice}>
                        <p>Итого</p>
                        <p>{orderDetails.total_price} сом</p>
                    </div>
                    <button className={styles.orderAllPriceButton}>Закрыть счет</button>
                </div>
            </div>
        </div>
    );
};

export default CardHereInfo;

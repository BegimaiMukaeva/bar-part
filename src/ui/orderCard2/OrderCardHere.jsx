import React, { useState } from 'react';
import styles from '../orderCard1/OrderCard.module.css';
import OrderCloseModal from '../../components/orders/OrderCloseModal/OrderCloseModal';
import CardHereInfo from '../../components/orders/CardHereInfo/CardHereInfo';
import closeOrderCard from '../../img/X.svg';
import axios from "axios";

const OrderCardHere = ({ number, waiterName, items, onAccept, onCancel, onReady, onFinish, status, onOrderCancel }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCardInfoModalOpen, setCardInfoModalOpen] = useState(false);

    const handleAcceptClick = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token is not available.');
                return;
            }

            const response = await axios.get(`https://muha-backender.org.kg/web/accept-order/?order_id=${number}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (response.status === 200) {
                console.log('Order accepted:', response.data);
                onOrderCancel(number);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleCancelOrder = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token is not available.');
                return;
            }

            const response = await axios.get(`https://muha-backender.org.kg/web/cancel-order/?order_id=${number}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (response.status === 200) {
                console.log('Order canceled:', response.data);
                onOrderCancel(number);
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const handleReadyOrder = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token is not available.');
                return;
            }

            const response = await axios.get(`https://muha-backender.org.kg/web/make-order-ready/?order_id=${number}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (response.status === 200) {
                console.log('Order canceled:', response.data);
                onOrderCancel(number);
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const handleCompleteOrder = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token is not available.');
                return;
            }

            const response = await axios.get(`https://muha-backender.org.kg/web/complete-order/?order_id=${number}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (response.status === 200) {
                console.log('Order canceled:', response.data);
                onOrderCancel(number);
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    const handleCancelClick = () => {
        setModalOpen(true);
    };
    const confirmCloseOrder = () => {
        setModalOpen(false)
    };

    const handleCardClick = () => {
        setCardInfoModalOpen(true);
    };

    const closeCardClick = () => {
        setCardInfoModalOpen(false)
    };



    //
    // const handleRejectCancel = () => {
    //     setModalOpen(false);
    // };


    const renderButton = () => {
        switch (status) {
            case 'new':
                return <button onClick={handleAcceptClick} className={styles.orderStateButton1}>Принять</button>;
            case 'in_progress':
                return <button onClick={handleReadyOrder} className={styles.orderStateButton2}>Заказ готов</button>;
            case 'ready':
                return <button onClick={handleCompleteOrder} className={styles.orderStateButton3}>Завершить заказ</button>;
            case 'canceled':
                return <button className={styles.orderStateButton4}>Заказ отменен</button>;
            case 'completed':
                return <button className={styles.orderStateButton5}>Заказ завершен</button>;
            default:
                return null;
        }
    };

    return (
        <div className={styles.orderCardMain}>
            <div className={styles.orderCard}>
                <div className={styles.orderCardTitle}>
                    <p className={styles.orderNumber}>{number}</p>
                    {/*{status !== 'canceled' && status !== 'completed' && status !== 'ready' && status !== 'inProgress' && (*/}
                    {/*    <button onClick={onCancel} className={styles.orderCardCloseButton}>*/}
                    {/*        <img src={closeOrderCard} alt="Close"/>*/}
                    {/*    </button>*/}
                    {/*)}*/}
                    {(status === 'new') && (
                        <button onClick={handleCancelClick} className={styles.orderCardCloseButton}>
                            <img src={closeOrderCard} alt="Close"/>
                        </button>
                    )}
                </div>
                <div onClick={handleCardClick}>
                    <p className={styles.orderWaiterName}>{waiterName}</p>
                    <ul className={styles.orderList}>
                        {items.map((item, index) => (
                            index < 3 && <li key={item.id}><span>x{item.quantity}</span>{item.name}</li>
                        ))}
                    </ul>
                    {items.length > 3 && (
                        <button className={styles.orderListMoreButton}>Еще +{items.length - 3}</button>
                    )}
                </div>
                <div>
                    {renderButton()}
                </div>
            </div>
            {isModalOpen && (
                <OrderCloseModal
                    // onConfirm={() => {
                    //     setModalOpen(false);
                    //     onOrderCancel(number);
                    // }}
                    onConfirm={handleCancelOrder}
                    onCancel={confirmCloseOrder}
                    orderNumber={number}
                />
            )}
            {isCardInfoModalOpen && (
                <CardHereInfo
                    onClose={closeCardClick}
                />
            )}
        </div>
    );
};

export default OrderCardHere;

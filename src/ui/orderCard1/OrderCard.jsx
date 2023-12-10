import React, { useState } from 'react';
import styles from './OrderCard.module.css';
import OrderCloseModal from '../../components/orders/OrderCloseModal/OrderCloseModal';
import CardInformation from '../../components/orders/CardInformation/CardInformation'
import closeOrderCard from '../../img/X.svg';

const OrderCard = ({ number, clientNumber, items, onAccept, onCancel, onReady, onFinish, status, onOrderCancel }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCardInfoModalOpen, setCardInfoModalOpen] = useState(false);

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
                return <button onClick={onAccept} className={styles.orderStateButton1}>Принять</button>;
            case 'inProgress':
                return <button onClick={onReady} className={styles.orderStateButton2}>Заказ готов</button>;
            case 'ready':
                return <button onClick={onFinish} className={styles.orderStateButton3}>Завершить заказ</button>;
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
                    <p className={styles.orderWaiterName}>{clientNumber}</p>
                    <ul className={styles.orderList}>
                        {items.map(item => (
                            <li key={item.id}><span>x{item.quantity}</span>{item.name}</li>
                        ))}
                    </ul>
                    <button className={styles.orderListMoreButton}>Еще +2</button>
                </div>
                <div>
                    {renderButton()}
                </div>
            </div>
            {isModalOpen && (
                <OrderCloseModal
                    onConfirm={() => {
                        setModalOpen(false);
                        onOrderCancel(number);
                    }}
                    onCancel={confirmCloseOrder}
                    orderNumber={number}
                />
            )}
            {isCardInfoModalOpen && (
                <CardInformation
                    onClose={closeCardClick}
                />
            )}
        </div>
    );
};

export default OrderCard;

import React, { useState } from 'react';
import OrderCard from '../../../ui/orderCard1/OrderCard';
import styles from './OrdersTakeAway.module.css';
import img from '../../../img/UserCircle.svg'

const initialOrders = [
    { id: 1, number: 'М-47', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'new' },
    { id: 2, number: 'М-48', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'inProgress' },
    { id: 3, number: 'М-49', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'ready' },
    { id: 4, number: 'М-50', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'canceled' },
    { id: 5, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 6, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 7, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 8, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 9, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 10, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 11, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 12, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 13, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 14, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
    { id: 15, number: 'М-51', clientNumber: '+996701987766', items: [{ id: 1, name: 'Капучино', quantity: 1 }, { id: 2, name: 'Багровый закат', quantity: 1 }, { id: 3, name: 'Мохито Клубничный', quantity: 1 }], status: 'completed' },
];

const OrdersTakeAway = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [currentStatus, setCurrentStatus] = useState('new');
    const [activeStatus, setActiveStatus] = useState('new');


    const handleStatusClick = (statusLabel) => {
        const status = statusMap[statusLabel];
        setCurrentStatus(status);
        setActiveStatus(status);
    };

    const changeOrderStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setOrders(updatedOrders);
    };

    const statusMap = {
        'Новый': 'new',
        'В процессе': 'inProgress',
        'Готово': 'ready',
        'Отменено': 'canceled',
        'Завершено': 'completed',
    };
    const handleOrderCancel = (orderId) => {
        setOrders(orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: 'canceled' };
            }
            return order;
        }));
    };


    const renderOrders = () => {
        return (
            <div className={styles.orderCardsContainer}>
                {orders
                    .filter(order => order.status === currentStatus)
                    .map(order => (
                        <OrderCard
                            key={order.id}
                            number={order.number}
                            clientNumber={order.clientNumber}
                            items={order.items}
                            onAccept={() => changeOrderStatus(order.id, 'inProgress')}
                            onCancel={() => changeOrderStatus(order.id, 'canceled')}
                            onReady={() => changeOrderStatus(order.id, 'ready')}
                            onFinish={() => changeOrderStatus(order.id, 'completed')}
                            status={order.status}
                            onOrderCancel={() => handleOrderCancel(order.id)}
                        />
                    ))}
            </div>
        );
    };


    return (
        <div className={styles.takeAwayMain}>
            <div className={styles.takeAwayMainState}>
                {['Новый', 'В процессе', 'Готово', 'Отменено', 'Завершено'].map((statusLabel) => {
                    const status = statusLabel.toLowerCase().replace(' ', '');
                    return (
                        <div key={status} className={styles.takeAwayMainButtons}>
                            <span> </span>
                            <button
                                className={activeStatus === statusMap[statusLabel] ? `${styles.takeAwayMainButton} ${styles.active}` : styles.takeAwayMainButton}
                                onClick={() => handleStatusClick(statusLabel)}
                            >
                                {statusLabel}
                            </button>

                        </div>
                    );
                })}
            </div>
            {renderOrders()}
        </div>
    );
};

export default OrdersTakeAway;

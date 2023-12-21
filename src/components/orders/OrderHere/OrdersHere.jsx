import React, {useEffect, useState} from 'react';
import styles from '../OrdersTakeAway/OrdersTakeAway.module.css';
import img from '../../../img/UserCircle.svg'
import OrderCardHere from "../../../ui/orderCard2/OrderCardHere";
import axios from "axios";

const OrdersHere = () => {
    const [orders, setOrders] = useState([]);
    const [currentStatus, setCurrentStatus] = useState('new');
    const [activeStatus, setActiveStatus] = useState('new');
    const [branchId, setBranchId] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is not available.');
            return;
        }
        axios.get('https://muha-backender.org.kg/web/my-branch-id/', {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        })
            .then(response => {
                setBranchId(response.data.branch_id);
            })
            .catch(error => {
                console.error('Ошибка при получении ID филиала:', error);
            });
    }, []);



    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('Access token is not available.');
            return;
        }

        let ws;
        if (currentStatus === 'new' && branchId) {
            ws = new WebSocket(`wss://muha-backender.org.kg/ws/new-orders-institution/${branchId}/`);
            ws.onopen = () => console.log('WebSocket Connection Opened');
            ws.onerror = error => console.error('WebSocket Error', error);
            ws.onmessage = e => {
                const newOrder = JSON.parse(e.data);
                if (newOrder && newOrder.orders) {
                    setOrders(prevOrders => {
                        const existingIds = prevOrders.map(order => order.id);
                        const uniqueNewOrders = newOrder.orders.filter(order => !existingIds.includes(order.id));
                        return [...prevOrders, ...uniqueNewOrders];
                    });
                }
            };
        }

        const loadInProcessOrders = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token is not available.');
                    return;
                }
                console.log('Loading in process orders...'); // Отладочное сообщение


                const response = await axios.get('https://muha-backender.org.kg/web/institution-orders/in-process/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                if (response.status === 200 && response.data.orders) {
                    console.log('In process orders:', response.data.orders); // Отладочное сообщение
                    setOrders(response.data.orders);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error loading in process orders:', error);
            }
        };

        const loadReadyOrders = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token is not available.');
                    return;
                }

                const response = await axios.get('https://muha-backender.org.kg/web/institution-orders/ready/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                if (response.status === 200 && response.data.orders) {
                    setOrders(response.data.orders);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error loading in process orders:', error);
            }
        };

        const loadCanceledOrders = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token is not available.');
                    return;
                }

                const response = await axios.get('https://muha-backender.org.kg/web/institution-orders/canceled/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                if (response.status === 200 && response.data.orders) {
                    setOrders(response.data.orders);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error loading canceled orders:', error);
            }
        };

        const loadCompletedOrders = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token is not available.');
                    return;
                }

                const response = await axios.get('https://muha-backender.org.kg/web/institution-orders/completed/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                if (response.status === 200 && response.data.orders) {
                    setOrders(response.data.orders);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error loading canceled orders:', error);
            }
        };

        switch (currentStatus) {
            case 'in_progress':
                loadInProcessOrders();
                break;
            case 'ready':
                loadReadyOrders();
                break;
            case 'canceled':
                loadCanceledOrders();
                break;
            case 'completed':
                loadCompletedOrders();
                break;
            default:
                break;
        }
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [currentStatus, branchId]);


    const handleStatusClick = (statusLabel) => {
        const status = statusMap[statusLabel];
        setCurrentStatus(status);
        setActiveStatus(status);
    };
    const changeOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            if (currentStatus === 'new') {
                return updatedOrders.filter(order => order.id !== orderId);
            }
            return updatedOrders;
        });
    };

    const statusMap = {
        'Новый': 'new',
        'В процессе': 'in_progress',
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
        console.log('Rendering orders:', orders);
        if (!Array.isArray(orders)) {
            console.error('Orders is not an array:', orders);
            return <div>Загрузка заказов...</div>;
        }

        const filteredOrders = orders.filter(order => order.status === currentStatus);

        return (
            <div className={styles.orderCardsContainer}>
                {filteredOrders.map(order => (
                    <OrderCardHere
                        key={order.id || order.number}
                        number={order.number}
                        waiterName={order.waiterName}
                        clientNumber={order.clientNumber}
                        items={order.items}
                        handleAcceptClick={() => changeOrderStatus(order.id, 'in_progress')}
                        onCancel={() => changeOrderStatus(order.id, 'canceled')}
                        handleReadyOrder={() => changeOrderStatus(order.id, 'ready')}
                        handleCompleteOrder={() => changeOrderStatus(order.id, 'completed')}
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

export default OrdersHere;

import React, { useState, useEffect } from 'react';
import styles from './AllOrders.module.css';
import OrdersTakeAway from '../OrdersTakeAway/OrdersTakeAway';
import OrdersHere from '../OrderHere/OrdersHere';
import OrderTrigger from '../../../ui/orderTrigger/OrderTrigger'
import axios from 'axios';

const AllOrders = () => {
    const [activeOrderType, setActiveOrderType] = useState('takeAway');
    const [branchId, setBranchId] = useState(null);
    const [orderReminder, setOrderReminder] = useState(null);
    const [ws, setWs] = useState(null);

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
        if (branchId) {
            const newWs = new WebSocket(`wss://muha-backender.org.kg/ws/reminder/${branchId}/`);
            newWs.onopen = () => {
                console.log("WebSocket connection established");
            };
            newWs.onmessage = (event) => {
                console.log("Received WebSocket message:", event.data);
                const data = JSON.parse(event.data);

                const orderReminderData = {
                    id: data.id,
                    content: data.content
                };

                setOrderReminder(orderReminderData);

                setTimeout(() => {
                    setOrderReminder(null);
                }, 120000);
            };

            newWs.onclose = () => {
                console.log("WebSocket connection closed");
            };
            newWs.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            setWs(newWs);

            return () => {
                if (ws) {
                    ws.close();
                }
            };
        }
    }, [branchId]);


    const closeTrigger = () => {
        setOrderReminder(null);
    };
    const handleTakeAwayClick = () => {
        setActiveOrderType('takeAway');
    };

    const handleOrderHereClick = () => {
        setActiveOrderType('orderHere');
    };

    return (
        <div>
            <div className={styles.allOrders}>
                <div className={styles.orderTakeAway}>
                    <button
                        // className={styles.orderTakeAwayButtons}
                        className={`${styles.orderTakeAwayButtons} ${activeOrderType === 'takeAway' ? styles.activeButton : ''}`}
                        onClick={handleTakeAwayClick}
                    >
                        На вынос
                    </button>
                </div>
                <div className={styles.orderTakeAway}>
                    <button
                        className={`${styles.orderHereButtons} ${activeOrderType === 'orderHere' ? styles.activeButton : ''}`}
                        onClick={handleOrderHereClick}
                    >
                        В заведении
                    </button>
                </div>
            </div>
            <div className={styles.orderBody}>
                {activeOrderType === 'takeAway' && <OrdersTakeAway />}
                {activeOrderType === 'orderHere' && <OrdersHere />}
            </div>
            {orderReminder && <OrderTrigger order={orderReminder} onClose={closeTrigger} />}
        </div>
    );
};

export default AllOrders;

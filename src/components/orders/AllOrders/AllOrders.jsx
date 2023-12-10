import React, { useState } from 'react';
import styles from './AllOrders.module.css';
import OrdersTakeAway from '../OrdersTakeAway/OrdersTakeAway';
import OrdersHere from '../OrderHere/OrdersHere';

const AllOrders = () => {
    const [activeOrderType, setActiveOrderType] = useState('takeAway');

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
        </div>
    );
};

export default AllOrders;

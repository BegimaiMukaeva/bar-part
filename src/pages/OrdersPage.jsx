import React from 'react';
import SideBar from "../components/SideBar/SideBar";
import AllOrders from "../components/orders/AllOrders/AllOrders";
import styles from '../styles/AllOrdersPage.module.css';

const OrdersPage = () => {
    return (
        <div className={styles.allOrderMain}>
            <div>
                <SideBar/>
            </div>
            <div className={styles.allOrders}>
                <AllOrders/>
            </div>
        </div>
    );
};

export default OrdersPage;
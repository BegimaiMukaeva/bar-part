import React from 'react';
import styles from '../styles/AllOrdersPage.module.css';
import SideBar from "../components/SideBar/SideBar";
import Profile from "../components/profile/Profile/Profile";

const ProfileBaristaPage = () => {
    return (
        <div className={styles.allOrderMain}>
            <div>
                <SideBar/>
            </div>
            <div className={styles.allOrders}>
                <Profile/>
            </div>
        </div>
    );
};

export default ProfileBaristaPage;
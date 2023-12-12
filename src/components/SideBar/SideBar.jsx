import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import NotificationModal from '../orders/NotificationModal/NotificationModal';
import notificationImg from '../../img/notifications.svg';
import styles from './SideBar.module.css';
import navBarOrder from "../../img/navBar/navOrder.svg";
import navMenu from "../../img/navBar/navMenu.svg"
import navProfile from "../../img/navBar/navProfile.svg"
import navOrderActive from "../../img/navBar/navOrderActive.svg"
import navMenuActive from "../../img/navBar/navMenuActive.svg"
import navProfActive from "../../img/navBar/navProfileActive.svg"

const SideBar = () => {
    const [drawer, setDrawer] = useState(false)

    const {pathname}  = useLocation()
    console.log(pathname)
    const navigate = useNavigate()

    const redirectFunc = (p)=>{
        navigate(p)
    }

    return (
        <div className={styles.main} onClick={()=>setDrawer(!drawer)} >
            <div className={styles.sideBarNavi} >
                <img src={notificationImg} alt=""/>
            </div>
            <div className={styles.sidebarMenu}>
                <button onClick={()=>redirectFunc("/all-orders")} className={pathname === "/all-orders" ?styles.linkBtnActive:styles.linkBtn}>
                    <img src={pathname === "/all-orders"? navOrderActive :navBarOrder} alt="" />
                    <p>Заказы</p>
                </button>
                <button onClick={()=>redirectFunc("/menu")} className={pathname === "/menu" ?styles.linkBtnActive:styles.linkBtn}>
                    <img src={pathname === "/menu"?navMenuActive:navMenu} alt="" />
                    <p>Меню</p>
                </button>
                <button onClick={()=>redirectFunc("/profile-page")} className={pathname === "/profile-page" ?styles.linkBtnActive:styles.linkBtn}>
                    <img src={pathname === "/profile-page" ? navProfActive :navProfile} alt="" />
                    <p>Профиль</p>
                </button>
            </div>
            <NotificationModal open={drawer} close={()=>setDrawer(false)}/>
        </div>
    );
};

export default SideBar;

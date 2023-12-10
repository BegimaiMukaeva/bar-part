import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import NotificationModal from '../orders/NotificationModal/NotificationModal';
// import notificationImg from '../../img/notifications.svg';
// import notepad from '../../img/Notepad.svg';
// import bookOpen from '../../img/BookOpen.svg';
// import userCircle from '../../img/UserCircle.svg';
import styles from './SideBar.module.css';
// import { Link } from "react-router-dom";
import navbarRing from "../../img/navBar/navbarRing.svg";
import navBarOrder from "../../img/navBar/navOrder.svg";
import navMenu from "../../img/navBar/navMenu.svg"
import navProfile from "../../img/navBar/navProfile.svg"
import navOrderActive from "../../img/navBar/navOrderActive.svg"
import navMenuActive from "../../img/navBar/navMenuActive.svg"
import navProfActive from "../../img/navBar/navProfileActive.svg"

const SideBar = () => {

    const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
    const {pathname}  = useLocation()
        console.log(pathname)
        const navigate = useNavigate()

        const redirectFunc = (p)=>{
            navigate(p)
        }

    const toggleNotificationModal = () => {
        setNotificationModalOpen(!isNotificationModalOpen);
    };

    return (

        <div className={styles.main}>
      <button className={styles.btnRing}>
        <img src={navbarRing} alt="ring" />
      </button>
      <div className={styles.navBarDiv}>
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
    </div>
    );
};

export default SideBar;

      // <div>
      //       <div className={styles.sideBarMain}>
      //           <div className={styles.sideBarNavi} onClick={toggleNotificationModal}>
      //               <img src={notificationImg} alt=""/>
      //           </div>
      //           <div className={styles.sidebarMenu}>
      //               <Link to='/all-orders'>
      //                   <div className={styles.sideBarNavi}>
      //                       <img src={notepad} alt=""/>
      //                       <p className={styles.sideBarNavigate}>Заказы</p>
      //                   </div>
      //               </Link>
      //               <div className={styles.sideBarNavi}>
      //                   <img src={bookOpen} alt=""/>
      //                   <p className={styles.sideBarNavigate}>Меню</p>
      //               </div>
      //               <Link to='/profile-page'>
      //                   <div className={styles.sideBarNavi}>
      //                       <img src={userCircle} alt=""/>
      //                       <p className={styles.sideBarNavigate}>Профиль</p>
      //                   </div>
      //               </Link>
      //           </div>
      //       </div>
      //       {isNotificationModalOpen && (
      //           <NotificationModal onClose={toggleNotificationModal} />
      //       )}
      //   </div>
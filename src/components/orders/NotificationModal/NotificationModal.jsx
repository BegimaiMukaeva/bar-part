import React, { useState, useEffect } from "react";
import axios from "axios";
import { Drawer } from "@mui/material";
import styles from "./NotificationModal.module.css";
import closeOrderCard from "../../../img/X-white.svg";
import OrderTrigger from '../../../ui/orderTrigger/OrderTrigger';

const NotificationModal = ({ onClose, open, close }) => {
  const [notifications, setNotifications] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
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



  // useEffect(() => {
  //   if (!branchId) return;
  //   const ws = new WebSocket(`wss://muha-backender.org.kg/ws/to-baristas/branch/${branchId}/`);
  //   ws.onopen = () => console.log('Соединение установлено');
  //   ws.onerror = () => console.log('Ошибка соединения');
  //   ws.onmessage = (e) => {
  //     const data = JSON.parse(e.data);
  //     console.log('Получено сообщение:', data);
  //     setNotifications(data.notifications || []);
  //     if (data.newOrder) {
  //       setNewOrder(data.newOrder);
  //     }
  //   };
  //
  //   ws.onclose = () => console.log('Соединение закрыто');
  //
  //   return () => {
  //     ws.close();
  //   };
  // }, [branchId]);




  useEffect(() => {
    // const ws = new WebSocket(`wss://muha-backender.org.kg/ws/to-baristas/branch/${branchId}/`);
    const ws = new WebSocket(`wss://muha-backender.org.kg/ws/to-baristas/branch/${branchId}/`);

    ws.onopen = () => console.log('Соединение установлено');
    ws.onerror = (error) => console.log('Ошибка соединения', error);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Получено сообщение:', data);

      setNotifications(prevNotifications => {
        const newNotifications = data.notifications || [];
        const filteredNewNotifications = newNotifications.filter(newItem =>
            !prevNotifications.some(prevItem => prevItem.id === newItem.id)
        );
        return [...prevNotifications, ...filteredNewNotifications];
      });
    };

    ws.onclose = () => console.log('Соединение закрыто');

    return () => {
      ws.close();
    };
  }, [branchId]);


  const handleDeleteNotification = (notificationId) => {
    const accessToken = localStorage.getItem('accessToken');
    axios.get(`https://muha-backender.org.kg/notices/delete-barista-notification?id=${notificationId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    })
        .then(response => {
          setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== notificationId));
        })
        .catch(error => {
          console.error('Ошибка при удалении уведомления:', error);
        });
  };



  const handleAcceptOrder = (orderId) => {
    setNewOrder(null);
  };

  return (
      <>
        {newOrder && <OrderTrigger order={newOrder} onAccept={handleAcceptOrder} />}
        <Drawer anchor="left" open={open} onClose={close}>
          <div className={styles.notificationModal}>
            <div className={styles.notificationModalTitle}>
              <p className={styles.notificationModalTheme}>Уведомления</p>
              <button className={styles.notificationModalCloseButton} onClick={onClose}>
                <img src={closeOrderCard} alt=""/>
              </button>
            </div>
            <div className={styles.notificationMainCards}>
              {notifications.map((notification, index) => (
                  <div key={index} className={styles.notificationMainCard}>
                    <div className={styles.notificationMainCardTitle}>
                      {/*<p className={styles.notificationMainCardTable}>Стол №10</p>*/}
                      <p className={styles.notificationMainCardTable}>{notification.exactly_time}</p>
                      <img
                          className={styles.notificationImg}
                          src={closeOrderCard}
                          alt="Удалить"
                          onClick={() => handleDeleteNotification(notification.id)}
                      />
                    </div>
                    <div>
                      <p className={styles.notificationNumberOfCard}>М-{notification.order_id} <span>{notification.title}</span></p>
                    </div>
                    <div className={styles.notificationCardOrder}>
                      <p className={styles.notificationCardOrderList}>{notification.body}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </Drawer>
      </>
  );
};

export default NotificationModal;

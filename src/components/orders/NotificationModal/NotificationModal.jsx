import { Drawer } from "@mui/material";

import styles from "./NotificationModal.module.css";
import closeOrderCard from "../../../img/X-white.svg";
import React from "react";

const NotificationModal = ({onClose, open, close }) => {


  return (
    <Drawer anchor="left" open={open} onClose={close}>
      <div className={styles.notificationModal}>
                <div className={styles.notificationModalTitle}>
                    <p className={styles.notificationModalTheme}>Уведомления</p>
                    <button className={styles.notificationModalCloseButton} onClick={onClose}>
                        <img src={closeOrderCard} alt=""/>
                    </button>
                </div>
                <div>
                    <div className={styles.notificationMainCard}>
                        <div className={styles.notificationMainCardTitle}>
                            <p className={styles.notificationMainCardTable}>Стол №10</p>
                            <p className={styles.notificationMainCardTable}>19:02</p>
                        </div>
                        <div>
                            <p className={styles.notificationNumberOfCard}>М-234 <span>(На вынос)</span></p>
                        </div>
                        <div className={styles.notificationCardOrder}>
                            <ul className={styles.notificationCardOrderList}>
                                <li>Капучино <span>х1</span>,</li>
                                <li>Латте <span>х1</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.notificationMainCard}>
                        <div className={styles.notificationMainCardTitle}>
                            <p className={styles.notificationMainCardTable}>Стол №10</p>
                            <p className={styles.notificationMainCardTable}>19:02</p>
                        </div>
                        <div>
                            <p className={styles.notificationNumberOfCard}>М-234 <span>(На вынос)</span></p>
                        </div>
                        <div className={styles.notificationCardOrder}>
                            <ul className={styles.notificationCardOrderList}>
                                <li>Капучино <span>х1</span>,</li>
                                <li>Латте <span>х1</span></li>
                            </ul>
                        </div>

                        <div className={styles.notificationMainCard}>
                            <div className={styles.notificationMainCardTitle}>
                                <p className={styles.notificationMainCardTable}>Стол №10</p>
                                <p className={styles.notificationMainCardTable}>19:02</p>
                            </div>
                            <div>
                                <p className={styles.notificationNumberOfCard}>М-234 <span>(На вынос)</span></p>
                            </div>
                            <div className={styles.notificationCardOrder}>
                                <ul className={styles.notificationCardOrderList}>
                                    <li>Капучино <span>х1</span>,</li>
                                    <li>Латте <span>х1</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Drawer>
  );
};

export default NotificationModal;

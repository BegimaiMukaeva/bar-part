import React, { useState } from 'react';
import styles from './CardHereInfo.module.css';
import closeOrderCard from "../../../img/X-white.svg";
import testOrderImg from '../../../img/testFoto.png';

const CardHereInfo = ({onClose}) => {
    const [orderQuantity, setOrderQuantity] = useState(5);

    return (
        <div className={styles.cardInfoModal}>
            <div className={styles.cardInfoMain}>
                <div>
                    <div className={styles.notificationModalTitle}>
                        <p className={styles.notificationModalTheme}>Заказ в заведении</p>
                        <button className={styles.notificationModalCloseButton} onClick={onClose}>
                            <img src={closeOrderCard} alt=""/>
                        </button>
                    </div>

                    <div>
                        <div className={styles.orderInfoCard}>
                            <div>
                                <img className={styles.orderInfoCardImage} src={testOrderImg} alt=""/>
                            </div>
                            <div className={styles.orderInformation}>
                                <div className={styles.orderDescriptionButtons}>
                                    <p className={styles.orderInfoTitle}>Капучино</p>
                                    <span className={styles.orderInfoTitle}>{orderQuantity}</span>
                                </div>
                                <div className={styles.orderDescription}>
                                    <div className={styles.orderDescriptionList}>
                                        <ul>
                                            <li>соевое молоко</li>
                                            <li>клубничный сироп</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className={styles.orderInfoPrice}>140 с</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className={styles.orderAllPrice}>
                        <p>Итого</p>
                        <p>570 сом</p>
                    </div>
                    <button className={styles.orderAllPriceButton}>Закрыть счет</button>
                </div>
            </div>
        </div>
    );
};

export default CardHereInfo;
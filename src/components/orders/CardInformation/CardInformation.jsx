import React, { useState } from 'react';
import styles from './CardInformation.module.css';
import closeOrderCard from "../../../img/X-white.svg";
import testOrderImg from '../../../img/testFoto.png';
import minusOrder from '../../../img/minus.svg';
import plusOrder from '../../../img/plus.svg';
import trashOrder from '../../../img/Trash.svg';

const staticOrderData = [
  {
    id: 1,
    orderNumber: "M-47",
    phoneNumber: "+996701987766",
    // image:''
    items: [
      {
        name: "Капучино",
        price: 140,
        options: ["соевое молоко", "клубничный сироп"],
        quantity: 1,
      },
    ],
    total: 570,
  },
];


const CardInformation = ({onClose}) => {
    const [orders, setOrders] = useState(staticOrderData);
    const [orderQuantity, setOrderQuantity] = useState(5);
    const [showTrash, setShowTrash] = useState(false);

    const increaseQuantity = () => {
        if (showTrash) setShowTrash(false);
        setOrderQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setOrderQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                return prevQuantity - 1;
            } else {
                setShowTrash(true);
                return prevQuantity;
            }
        });
    };

    const handleSwipeToDelete = () => {
        console.log("Handle swipe to delete");
    };

    return (
       <div className={styles.cardInfoModal}>
            <div className={styles.cardInfoMain}>
                <div>
                    <div className={styles.notificationModalTitle}>
                        <p className={styles.notificationModalTheme}>Заказ на вынос</p>
                        <button className={styles.notificationModalCloseButton} onClick={onClose}>
                            <img src={closeOrderCard} alt=""/>
                        </button>
                    </div>

                    <div>
                        <div className={styles.orderDescription}>
                            <p className={styles.orderInfoTitle}>M-47</p>
                            <p className={styles.orderInfoTitle}>+996701987766</p>
                        </div>
                        <div className={styles.orderInfoCard}>
                            <div>
                                <img className={styles.orderInfoCardImage} src={testOrderImg} alt=""/>
                            </div>
                            <div className={styles.orderInformation}>
                                <p className={styles.orderInfoTitle}>Капучино</p>
                                <p className={styles.orderInfoPrice}>140 с</p>
                                <div className={styles.orderDescription}>
                                    <div className={styles.orderDescriptionList}>
                                        <ul>
                                            <li>соевое молоко</li>
                                            <li>клубничный сироп</li>
                                        </ul>
                                    </div>
                                    <div className={styles.orderDescriptionButtons}>
                                        <button onClick={decreaseQuantity} className={styles.orderDescriptionButton}>
                                            <img src={minusOrder} alt=""/>
                                        </button>
                                        <span className={styles.orderInfoTitle}>{orderQuantity}</span>
                                        <button onClick={increaseQuantity} className={styles.orderDescriptionButton}>
                                            <img src={plusOrder} alt=""/>
                                        </button>
                                        {showTrash && (
                                            <div className={styles.deleteOrderBlock}>
                                                <button onClick={handleSwipeToDelete} className={styles.orderDescriptionButton}>
                                                    <img src={trashOrder} alt="Trash"/>
                                                </button>
                                            </div>
                                        )}
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

export default CardInformation;


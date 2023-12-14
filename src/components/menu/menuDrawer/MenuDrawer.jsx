import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import closeOrderCard from "../../../img/X-white.svg";
import axios from "axios";

import styles from "./MenuDarwer.module.css";
import MenuDrawerEmpty from "../../../ui/menu/MenuDarwerEmpry/MenuDarwerEmpry";
import MenuDrawerItem from "../../../ui/menu/MenuDrawerItem/MenuDrawerItem";

const MenuDrawer = ({  open, close, cartItems, onAdd, onRemove, total, setCartItems, setTotal  }) => {


    const handleCreateOrder = async () => {
        const itemsForOrder = cartItems.map((cartItem) => ({
            item_id: cartItem.id,
            is_ready_made_product: cartItem.is_ready_made_product,
            quantity: cartItem.quantity,
        }));
        const orderData = {
            total_price: total,
            spent_bonus_points: 0,
            in_an_institution: true,
            items: itemsForOrder,
        };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(
                'https://muha-backender.org.kg/ordering/create-order/',
                orderData,
                {
                    headers: { 'Authorization': `Bearer ${accessToken}` },

                }
            );
            if (response.status === 201) {
                console.log('Заказ создан:', response.data);
                resetCart();
                close();
            }
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
        }
    };

    const resetCart = () => {
        setCartItems([]);
        setTotal(0);
    };

    return (
        <Drawer anchor="right" open={open} onClose={close}>
            <div className={styles.main}>
                <div className={styles.menuDraw}>
                    <div className={styles.drawHead}>
                        <p>Заказ на вынос</p>
                        <IconButton className={styles.x} onClick={close}>
                            <img src={closeOrderCard} alt="Close"/>
                        </IconButton>
                    </div>
                    {cartItems.length === 0 ? (
                        <MenuDrawerEmpty />
                    ) : (
                        cartItems.map((item, index) => (
                            <MenuDrawerItem
                                key={index}
                                item={item}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        ))
                    )}
                </div>
                <div className={styles.drawFot}>
                    <div>
                        <p>Итого</p>
                        <p>{total}с</p>
                    </div>
                    <button onClick={handleCreateOrder}>Закрыть счет</button>
                </div>
            </div>
        </Drawer>
    );
};

export default MenuDrawer;

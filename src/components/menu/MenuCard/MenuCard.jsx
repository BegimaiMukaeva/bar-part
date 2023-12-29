import React, { useState , useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItemDescModal from "../MenuItemDescModal/MenuItemDescModal";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";
import plusIconModal from '../../../img/Group 2.svg'
import minusIcon from "../../../img/minus.svg";
import axios from "axios";

import styles from "./MenuCard.module.css";

const MenuCard = ({ item, addToCart, removeFromCart , isReadyMade }) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [menuItemDetails, setMenuItemDetails] = useState(null);

    // const fetchMenuItemDetails = async () => {
    //     try {
    //         const accessToken = localStorage.getItem('accessToken');
    //         const response = await axios.get(`https://muha-backender.org.kg/customers/menu/${item.id}/`, {
    //             headers: { 'Authorization': `Bearer ${accessToken}` },
    //         });
    //         setMenuItemDetails(response.data);
    //     } catch (error) {
    //         console.error('Ошибка при получении данных блюда:', error);
    //     }
    // };

    const fetchMenuItemDetails = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`https://muha-backender.org.kg/customers/menu/${item.id}/`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
                params: { is_ready_made_product: isReadyMade }
            });
            setMenuItemDetails(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных блюда:', error);
        }
    };


    const handleOpenModal = () => {
        fetchMenuItemDetails();
        console.log("Opening modal for item:", item.name);
        setOpen(true);
    };


    useEffect(() => {
        setQuantity(item.quantity || 0);
        setShowControls(item.quantity > 0);
    }, [item.quantity]);

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        if (!showControls) {
            setShowControls(true);
        }
        addToCart(item);
    };

    const decreaseQuantity = () => {
        removeFromCart(item.name);
        setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    return (
        <div className={styles.main}>
            <img className={styles.img} src={item.image} alt={item.name} />
            <div className={styles.descDiv} >
                <p onClick={handleOpenModal}>{item.name}</p>
                <div className={styles.priceDiv}>
                    <p onClick={() => setOpen(true)}>{item.price}</p>
                    <IconButton onClick={increaseQuantity}>
                        <div className={styles.plusIcon}>
                            <img src={plusIcon} alt="Add" />
                        </div>
                    </IconButton>
                </div>
            </div>
            {showControls && item.quantity > 0 && (
                <div className={styles.quantityControlsOverlay}>
                    <IconButton onClick={decreaseQuantity} disabled={quantity === 0}>
                        <img src={minusIcon} alt="Decrease" />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton onClick={increaseQuantity}>
                        <img src={plusIconModal} alt="Increase" />
                    </IconButton>
                </div>
            )}
            {menuItemDetails && (
                <MenuItemDescModal
                    open={open}
                    handleClose={() => setOpen(false)}
                    itemDetails={menuItemDetails}
                    addToCart={addToCart}
                />
            )}
        </div>
    );
};

export default MenuCard;


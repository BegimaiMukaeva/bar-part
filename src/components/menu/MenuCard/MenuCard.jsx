import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItemDescModal from "../MenuItemDescModal/MenuItemDescModal";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";
import plusIconModal from '../../../img/Group 2.svg'
import minusIcon from "../../../img/minus.svg";

import styles from "./MenuCard.module.css";

const MenuCard = ({ item, addToCart, removeFromCart  }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showControls, setShowControls] = useState(false);

    const itemQuantity = item.quantity || 0;

  const toggleQuantityControls = () => {
    setShowControls(!showControls);
  };
  //
  //   const increaseQuantity = () => {
  //   addToCart(item);
  //   if (!showControls) {
  //     setShowControls(true);
  //   }
  // };
  //
  // const decreaseQuantity = () => {
  //   removeFromCart(item.name);
  // };

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
      <div className={styles.descDiv}>
        <p onClick={() => setOpen(true)}>
          {item.name}
        </p>
        <div className={styles.priceDiv}>
          <p>{item.price}</p>
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
      <MenuItemDescModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default MenuCard;


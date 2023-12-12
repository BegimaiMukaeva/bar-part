import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuItemDescModal from "../MenuItemDescModal/MenuItemDescModal";

import menuCardImg from "../../../img/menu/menuCard/menuCardImg.svg";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";

import styles from "./MenuCard.module.css";

const menuItems = [
    {
        name: "Капучино",
        price: "140c",
        image: "https://via.placeholder.com/150",
        description: "Rich and creamy cappuccino with a smooth foam top.",
        category: "Coffee"
    },
    {
        name: "Эспрессо",
        price: "120c",
        image: "https://via.placeholder.com/150",
        description: "Strong and bold espresso, perfect for a quick energy boost.",
        category: "Coffee"
    },
    {
        name: "Латте",
        price: "150c",
        image: "https://via.placeholder.com/150",
        description: "Smooth and milky latte with a hint of espresso.",
        category: "Coffee"
    },
    {
        name: "Американо",
        price: "130c",
        image: "https://via.placeholder.com/150",
        description: "Classic Americano, a perfect balance of espresso and hot water.",
        category: "Coffee"
    },
    {
        name: "Мокачино",
        price: "160c",
        image: "https://via.placeholder.com/150",
        description: "Delicious mochaccino with a perfect blend of chocolate and coffee.",
        category: "Coffee"
    },
    {
        name: "Тирамису",
        price: "180c",
        image: "https://via.placeholder.com/150",
        description: "Authentic Italian tiramisu, rich and flavorful.",
        category: "Desserts"
    },
    {
        name: "Чизкейк",
        price: "170c",
        image: "https://via.placeholder.com/150",
        description: "Creamy cheesecake with a crispy crust, served with berry sauce.",
        category: "Desserts"
    },
    {
        name: "Круассан",
        price: "100c",
        image: "https://via.placeholder.com/150",
        description: "Freshly baked croissant, light and flaky.",
        category: "Bakery"
    },
    {
        name: "Маффин",
        price: "110c",
        image: "https://via.placeholder.com/150",
        description: "Delicious muffin available in various flavors.",
        category: "Bakery"
    },
    {
        name: "Мохито",
        price: "150c",
        image: "https://via.placeholder.com/150",
        description: "Refreshing mojito cocktail with mint and lime.",
        category: "Cocktails"
    },
    {
        name: "Фруктовый чай",
        price: "130c",
        image: "https://via.placeholder.com/150",
        description: "Aromatic fruit tea with a blend of seasonal fruits.",
        category: "Tea"
    },
];

const MenuCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.main}>
      <img className={styles.img} src={menuCardImg} alt="" />
      <div className={styles.descDiv}>
        <p onClick={() => setOpen(true)}>
          {item.name}
        </p>
        <div className={styles.priceDiv}>
          <p>{item.price} с</p>
          <IconButton>
            <div className={styles.plusIcon}>
              <img src={plusIcon} alt="" />
            </div>
          </IconButton>
        </div>
      </div>
      <MenuItemDescModal open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default MenuCard;

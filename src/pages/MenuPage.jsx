import React, { useState } from "react";

import MenuCategorySelect from '../components/menu/menuCategorySelect/menuCategorySelect';

import styles from "../styles/Menu.module.css";
import MenuCard from "../components/menu/MenuCard/MenuCard";
import MenuDrawer from "../components/menu/menuDrawer/MenuDrawer";
import SideBar from "../components/SideBar/SideBar";

const menuItems = [
    {
        name: "Капучино",
        price: "140c",
        image: "https://via.placeholder.com/150",
        description: "Rich and creamy cappuccino with a smooth foam top.",
        category: "coffee"
    },
    {
        name: "Эспрессо",
        price: "120c",
        image: "https://via.placeholder.com/150",
        description: "Strong and bold espresso, perfect for a quick energy boost.",
        category: "coffee"
    },
    {
        name: "Латте",
        price: "150c",
        image: "https://via.placeholder.com/150",
        description: "Smooth and milky latte with a hint of espresso.",
        category: "coffee"
    },
    {
        name: "Американо",
        price: "130c",
        image: "https://via.placeholder.com/150",
        description: "Classic Americano, a perfect balance of espresso and hot water.",
        category: "coffee"
    },
    {
        name: "Мокачино",
        price: "160c",
        image: "https://via.placeholder.com/150",
        description: "Delicious mochaccino with a perfect blend of chocolate and coffee.",
        category: "coffee"
    },
    {
        name: "Тирамису",
        price: "180c",
        image: "https://via.placeholder.com/150",
        description: "Authentic Italian tiramisu, rich and flavorful.",
        category: "dessert"
    },
    {
        name: "Чизкейк",
        price: "170c",
        image: "https://via.placeholder.com/150",
        description: "Creamy cheesecake with a crispy crust, served with berry sauce.",
        category: "dessert"
    },
    {
        name: "Круассан",
        price: "100c",
        image: "https://via.placeholder.com/150",
        description: "Freshly baked croissant, light and flaky.",
        category: "bakery"
    },
    {
        name: "Маффин",
        price: "110c",
        image: "https://via.placeholder.com/150",
        description: "Delicious muffin available in various flavors.",
        category: "bakery"
    },
    {
        name: "Мохито",
        price: "150c",
        image: "https://via.placeholder.com/150",
        description: "Refreshing mojito cocktail with mint and lime.",
        category: "cocktail"
    },
    {
        name: "Фруктовый чай",
        price: "130c",
        image: "https://via.placeholder.com/150",
        description: "Aromatic fruit tea with a blend of seasonal fruits.",
        category: "tea"
    },
];

const MenuPage = () => {
    const [category, setCategory] = useState("coffee");
    const [drawer, setDrawer] = useState(false)

    const filteredMenuItems = menuItems.filter(item => item.category === category);

    return (
        <div className={styles.allOrderMain}>
            <div>
                <SideBar/>
            </div>
            <div className={styles.allOrders}>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <p>Меню</p>
                    </div>
                    <div className={styles.content}>
                        <MenuCategorySelect category={category} setCategory={setCategory} />
                        <div className={styles.cardDiv}>
                            {filteredMenuItems.map((item, index) => (
                                <MenuCard key={index} item={item} /> // Make sure item is passed here
                            ))}
                        </div>
                    </div>
                    <button onClick={()=>setDrawer(!drawer)} className={styles.cardButton}>
                        <p>Заказ на вынос</p>
                        <p>0</p>
                    </button>
                    <MenuDrawer open={drawer} close={()=>setDrawer(false)}/>
                </div>
            </div>
        </div>

    );
};

export default MenuPage;

import React, { useState, useEffect } from "react";
import axios from 'axios';

import MenuCategorySelect from '../components/menu/menuCategorySelect/menuCategorySelect';

import styles from "../styles/Menu.module.css";
import MenuCard from "../components/menu/MenuCard/MenuCard";
import MenuDrawer from "../components/menu/menuDrawer/MenuDrawer";
import SideBar from "../components/SideBar/SideBar";

import cakeIcon from "../img/menu/MenuCategory/cake.svg";
import coffeeIcon from "../img/menu/MenuCategory/coffee.svg"
import coffeeActiveIcon from "../img/menu/MenuCategory/coffeeActive.svg"
import cakeActiveIcon from "../img/menu/MenuCategory/cakeActive.svg"
import bakeryIcon from "../img/menu/MenuCategory/bakary.svg"
import bakeryActiveIcon from "../img/menu/MenuCategory/bakaryActive.svg"
import cocktailIcon from "../img/menu/MenuCategory/cocktail.svg"
import cocktailActiveIcon from "../img/menu/MenuCategory/cocktailActive.svg"
import teaIcon from "../img/menu/MenuCategory/tea.svg"
import teaActiveIcon from "../img/menu/MenuCategory/teaActive.svg"


const MenuPage = () => {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [drawer, setDrawer] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const filteredMenuItems = menuItems.filter(item => item.category.id === selectedCategoryId);

    useEffect(() => {
        console.log("Filtered menu items:", filteredMenuItems);
    }, [filteredMenuItems]);

    useEffect(() => {
        const fetchCategories = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get('https://muha-backender.org.kg/customers/categories/', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                setCategories(response.data.map(cat => ({
                    ...cat,
                    icon: getImageForCategory(cat.name),
                    activeIcon: getActiveImageForCategory(cat.name)
                })));
                setSelectedCategoryId(response.data[0]?.id);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };


        const fetchMenuItems = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await axios.get('https://muha-backender.org.kg/customers/menu', {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });

                setMenuItems(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchCategories();
        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategoryId(categories[0].id);
        }
    }, [categories]);

    const getImageForCategory = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case 'кофе':
                return coffeeIcon;
            case 'десерты':
                return cakeIcon;
            case 'выпечка':
                return bakeryIcon;
            case 'коктейли':
                return cocktailIcon;
            case 'чай':
                return teaIcon;
            default:
                return '';
        }
    };

    const getActiveImageForCategory = (categoryName) => {
        switch (categoryName.toLowerCase()) {
            case 'кофе':
                return coffeeActiveIcon;
            case 'десерты':
                return cakeActiveIcon;
            case 'выпечка':
                return bakeryActiveIcon;
            case 'коктейли':
                return cocktailActiveIcon;
            case 'чай':
                return teaActiveIcon;
            default:
                return '';
        }
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    const addToCart = (itemToAdd) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.name === itemToAdd.name);
            if (existingItemIndex >= 0) {
                return prevItems.map((item, index) =>
                    index === existingItemIndex ? {...item, quantity: item.quantity + 1} : item
                );
            } else {
                return [...prevItems, {...itemToAdd, quantity: 1}];
            }
        });
    };

    const removeFromCart = (itemName) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.name === itemName);
            if (existingItemIndex >= 0 && prevItems[existingItemIndex].quantity > 1) {
                return prevItems.map((item, index) =>
                    index === existingItemIndex ? {...item, quantity: item.quantity - 1} : item
                );
            } else {
                return prevItems.filter(item => item.name !== itemName);
            }
        });
    };

    const calculateTotal = () => {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * parseInt(item.price, 10), 0);
        setTotal(totalAmount);
    };

    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    const itemsWithQuantities = filteredMenuItems.map(item => {
        const cartItem = cartItems.find(i => i.name === item.name);
        return { ...item, quantity: cartItem ? cartItem.quantity : 0 };
    });

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
                        <MenuCategorySelect
                            categories={categories}
                            selectedCategoryId={selectedCategoryId}
                            handleCategoryChange={handleCategoryChange}
                        />
                        <div className={styles.cardDiv}>
                            {filteredMenuItems.map((item, index) => {
                                const cartItem = cartItems.find(cartItem => cartItem.name === item.name);
                                return (
                                    <MenuCard
                                        // key={index}
                                        key={item.id}
                                        item={cartItem || item}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <button onClick={()=>setDrawer(!drawer)} className={styles.cardButton}>
                        <p>Заказ на вынос</p>
                        <p>{total} сом</p>
                    </button>
                    <MenuDrawer
                        open={drawer}
                        close={() => setDrawer(false)}
                        cartItems={cartItems}
                        setCartItems={setCartItems}
                        setTotal={setTotal}
                        onAdd={addToCart}
                        onRemove={removeFromCart}
                        total={total}
                    />
                </div>
            </div>
        </div>

    );
};

export default MenuPage;

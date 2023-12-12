import React, { useState , useEffect} from "react";

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
    const [drawer, setDrawer] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const filteredMenuItems = menuItems.filter(item => item.category === category);

    // const addToCart = (itemToAdd) => {
    //     setCartItems(prevItems => {
    //         const itemIndex = prevItems.findIndex(i => i.name === itemToAdd.name);
    //         if (itemIndex > -1) {
    //             // Update quantity if item already exists
    //             let newItems = [...prevItems];
    //             newItems[itemIndex].quantity += 1;
    //             return newItems;
    //         } else {
    //             // Add new item to cart
    //             return [...prevItems, { ...itemToAdd, quantity: 1 }];
    //         }
    //     });
    // };
    //
    // const removeFromCart = (itemNameToRemove) => {
    //     setCartItems(prevItems => {
    //         const itemIndex = prevItems.findIndex(i => i.name === itemNameToRemove);
    //         if (itemIndex > -1 && prevItems[itemIndex].quantity > 1) {
    //             // Decrease quantity
    //             let newItems = [...prevItems];
    //             newItems[itemIndex].quantity -= 1;
    //             return newItems;
    //         } else {
    //             // Remove item from cart
    //             return prevItems.filter(i => i.name !== itemNameToRemove);
    //         }
    //     });
    // };

    const addToCart = (item) => {
  setCartItems((prevItems) => {
    const itemIndex = prevItems.findIndex((i) => i.name === item.name);
    if (itemIndex > -1) {
      // Item exists, update the quantity
      const newItems = [...prevItems];
      newItems[itemIndex].quantity += 1;
      return newItems;
    } else {
      // Item doesn't exist, add new item with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    }
  });
};

// Function to remove an item from the cart or decrease its quantity
const removeFromCart = (itemName) => {
  setCartItems((prevItems) => {
    const itemIndex = prevItems.findIndex((i) => i.name === itemName);
    if (itemIndex > -1 && prevItems[itemIndex].quantity > 1) {
      // Decrease quantity
      const newItems = [...prevItems];
      newItems[itemIndex].quantity -= 1;
      return newItems;
    } else {
      // Remove item from cart
      return prevItems.filter((i) => i.name !== itemName);
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
                        <MenuCategorySelect category={category} setCategory={setCategory} />
                        <div className={styles.cardDiv}>
                            {itemsWithQuantities.map((item, index) =>(
                                <MenuCard key={index} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
                            ))}
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

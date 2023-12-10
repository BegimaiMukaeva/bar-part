import { useState } from "react";

import MenuCategorySelect from "../components/menu/menuCategorySelect/MenuCategorySelect";

import styles from "../styles/Menu.module.css";
import MenuCard from "../components/menu/menuCard/MenuCard";
import MenuDrawer from "../components/menu/menuDrawer/MenuDrawer";

const MenuPage = () => {
  const [category, setCategory] = useState("coffee");
  const [drawer, setDrawer] = useState(false)

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p>Меню</p>
      </div>
      <div className={styles.content}>
        <MenuCategorySelect category={category} setCategory={setCategory} />
        <div className={styles.cardDiv}>
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
          <MenuCard />
        </div>
      </div>
      <button onClick={()=>setDrawer(!drawer)} className={styles.cardButton}>
        <p>Заказ на вынос</p>
        <p>0</p>
      </button>
      <MenuDrawer open={drawer} close={()=>setDrawer(false)}/>
    </div>
  );
};

export default MenuPage;

import cakeIcon from "../../../img/menu/MenuCategory/cake.svg";
import coffeeIcon from "../../../img/menu/MenuCategory/coffee.svg"
import coffeeActiveIcon from "../../../img/menu/MenuCategory/coffeeActive.svg"
import cakeActiveIcon from "../../../img/menu/MenuCategory/cakeActive.svg"
import bakeryIcon from "../../../img/menu/MenuCategory/bakary.svg"
import bakeryActiveIcon from "../../../img/menu/MenuCategory/bakaryActive.svg"
import cocktailIcon from "../../../img/menu/MenuCategory/cocktail.svg"
import cocktailActiveIcon from "../../../img/menu/MenuCategory/cocktailActive.svg"
import teaIcon from "../../../img/menu/MenuCategory/tea.svg"
import teaActiveIcon from "../../../img/menu/MenuCategory/teaActive.svg"


import styles from "./MenuCategorySelect.module.css";

const MenuCategorySelect = ({category, setCategory}) => {
  return (
    <div className={styles.main}>
      <button onClick={()=>setCategory("coffee")} className={category==="coffee"?styles.buttonActive:styles.button}>
        <img src={category==="coffee"?coffeeActiveIcon:coffeeIcon} alt="" />
        <p>Кофе</p>
      </button>
      <button onClick={()=>setCategory("dessert")}  className={category==="dessert"?styles.buttonActive:styles.button}>
        <img src={category==="dessert"?cakeActiveIcon:cakeIcon} alt="" />
        <p>Десерты</p>
      </button>
      <button onClick={()=>setCategory("bakary")}  className={category==="bakary"?styles.buttonActive:styles.button}>
        <img src={category==="bakary"?bakeryActiveIcon:bakeryIcon} alt="" />
        <p>Выпечка</p>
      </button>
      <button onClick={()=>setCategory("cocktail")}  className={category==="cocktail"?styles.buttonActive:styles.button}>
        <img src={category==="cocktail"?cocktailActiveIcon:cocktailIcon} alt="" />
        <p>Коктейли</p>
      </button>
      <button onClick={()=>setCategory("tea")}  className={category==="tea"?styles.buttonActive:styles.button}>
        <img src={category==="tea"?teaActiveIcon:teaIcon} alt="" />
        <p>Чай</p>
      </button>
    </div>
  );
};

export default MenuCategorySelect;

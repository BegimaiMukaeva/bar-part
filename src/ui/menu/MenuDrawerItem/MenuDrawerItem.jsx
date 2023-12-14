import { IconButton } from "@mui/material";
import img from "../../../img/menu/menuCard/menuCardImg.svg";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";
import minusIcon from "../../../img/menu/menuCard/minusIcon.svg";

import styles from "./MenuDrawerItem.module.css";

const MenuDrawerItem = ({ item, onAdd, onRemove }) => {
  return (
      <div className={styles.main}>
        <img src={item.image} alt={item.name} />
        <div className={styles.orderDesc}>
          <p>{item.name}</p>
          <p>{item.price}с</p>
          <div className={styles.optionAndPlus}>
            <div>
              {item.options && item.options.map((option, index) => (
                  <p key={index}>{option}</p>
              ))}
            </div>
            <div className={styles.plusMinusBtn}>
              <IconButton onClick={() => onRemove(item.name)}>
                <div className={styles.minus}>
                  <img src={minusIcon} alt="Decrease" />
                </div>
              </IconButton>
              <p>{item.quantity}</p>
              <IconButton onClick={() => onAdd(item)}>
                <div className={styles.plus}>
                  <img src={plusIcon} alt="Increase" />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MenuDrawerItem;
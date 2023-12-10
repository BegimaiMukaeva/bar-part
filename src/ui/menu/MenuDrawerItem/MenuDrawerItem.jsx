import { IconButton } from "@mui/material";
import img from "../../../img/menu/menuCard/menuCardImg.svg";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";
import minusIcon from "../../../img/menu/menuCard/minusIcon.svg";

import styles from "./MenuDrawerItem.module.css";

const MenuDrawerItem = () => {
  return (
    <div className={styles.main}>
      <img src={img} alt="" />
      <div className={styles.orderDesc}>
        <p>Капучино</p>
        <p>160p</p>
        <div className={styles.optionAndPlus}>
          <div>
            <p>коровье молоко</p>
            <p>карамельный сироп</p>
          </div>
          <div className={styles.plusMinusBtn}>
            <IconButton >
              <div className={styles.minus}>
                <img src={minusIcon} alt="" />
              </div>
            </IconButton>
            <p>1</p>
            <IconButton>
              <div className={styles.plus}>
                <img src={plusIcon} alt="" />
              </div>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawerItem;

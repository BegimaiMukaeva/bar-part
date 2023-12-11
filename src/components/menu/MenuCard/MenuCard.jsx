import IconButton from "@mui/material/IconButton";
import MenuItemDescModal from "../MenuItemDescModal/MenuItemDescModal";
import { useState } from "react";

import menuCardImg from "../../../img/menu/menuCard/menuCardImg.svg";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";

import styles from "./MenuCard.module.css";

const MenuCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.main}>
      <img className={styles.img} src={menuCardImg} alt="" />
      <div className={styles.descDiv}>
        <p onClick={() => setOpen(true)}>
          Капучино
        </p>
        <div className={styles.priceDiv}>
          <p>140c</p>
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

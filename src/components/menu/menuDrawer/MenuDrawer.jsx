import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import closeOrderCard from "../../../img/X-white.svg";

import styles from "./MenuDarwer.module.css";
import MenuDrawerEmpty from "../../../ui/menu/MenuDarwerEmpry/MenuDarwerEmpry";
import MenuDrawerItem from "../../../ui/menu/MenuDrawerItem/MenuDrawerItem";

const MenuDrawer = ({ open, close, cartItems, onAdd, onRemove, total }) => {
  return (
      <Drawer anchor="right" open={open} onClose={close}>
        <div className={styles.main}>
            <div className={styles.menuDraw}>
                <div className={styles.drawHead}>
              <p>Заказ на вынос</p>
              <IconButton className={styles.x} onClick={close}>
                <img src={closeOrderCard} alt="Close"/>
              </IconButton>
            </div>
            {cartItems.length === 0 ? (
                <MenuDrawerEmpty />
            ) : (
                cartItems.map((item, index) => (
                    <MenuDrawerItem
                        key={index}
                        item={item}
                        onAdd={onAdd}
                        onRemove={onRemove}
                    />
                ))
            )}
            </div>
          <div className={styles.drawFot}>
            <div>
              <p>Итого</p>
              <p>{total}с</p>
            </div>
            <button>Закрыть счет</button>
          </div>
        </div>
      </Drawer>
  );
};

export default MenuDrawer;

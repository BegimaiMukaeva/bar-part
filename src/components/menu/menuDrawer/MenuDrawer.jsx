import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./MenuDarwer.module.css";
import MenuDarwerEmpry from "../../../ui/menu/menuDrawerEmpty/MenuDarwerEmpry";
import MenuDrawerItem from "../../../ui/menu/menuDrawerItem/MenuDrawerItem";

const MenuDrawer = ({ open, close }) => {
  return (
    <Drawer anchor="right" open={open} onClose={close}>
      <div className={styles.main}>
        <div className={styles.drawHead}>
          <p>Заказ на вынос</p>
          <IconButton className={styles.x} onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        <MenuDrawerItem/>
        {/* <MenuDarwerEmpry /> */}
        <div className={styles.drawFot}>
          <div>
            <p>Итого</p>
            <p>0</p>
          </div>
          <button>Закрыть счет</button>
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;

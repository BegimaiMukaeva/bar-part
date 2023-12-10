import menuDrawerEmpty from "../../../img/menu/menuDrawer/menuDrawerEmpty.svg";

import styles from "./MenuEmpty.module.css";

const MenuDarwerEmpry = () => {
  return (
    <div className={styles.main}>
      <p>Вы еще ничего не добавили</p>
      <img src={menuDrawerEmpty} alt="" />
    </div>
  );
};

export default MenuDarwerEmpry;

import { IconButton } from "@mui/material";
import img from "../../../img/menu/menuCard/menuCardImg.svg";
import plusIcon from "../../../img/menu/menuCard/plusIcon.svg";
import minusIcon from "../../../img/menu/menuCard/minusIcon.svg";

import styles from "./MenuDrawerItem.module.css";

const MenuDrawerItem = ({ item, onAdd, onRemove }) => {
    const itemQuantity = item.quantity || 0;

  return (
      <div className={styles.main}>
        <img src={item.image} alt={item.name} />
        <div className={styles.orderDesc}>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <div className={styles.optionAndPlus}>
            {/* Render options if any */}
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

// // <div className={styles.main}>
// //   <img src={img} alt="" />
// //   <div className={styles.orderDesc}>
// //     <p>Капучино</p>
// //     <p>160с</p>
// //     <div className={styles.optionAndPlus}>
// //       <div>
// //         <p>коровье молоко</p>
// //         <p>карамельный сироп</p>
// //       </div>
// //       <div className={styles.plusMinusBtn}>
// //         <IconButton >
// //           <div className={styles.minus}>
// //             <img src={minusIcon} alt="" />
// //           </div>
// //         </IconButton>
// //         <p>1</p>
// //         <IconButton>
// //           <div className={styles.plus}>
// //             <img src={plusIcon} alt="" />
// //           </div>
// //         </IconButton>
// //       </div>
// {/*    </div>*/}
// {/*  </div>*/}
// {/*</div>*/}
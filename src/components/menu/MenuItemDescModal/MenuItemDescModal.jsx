import { IconButton, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import img from "../../../img/menu/menuCard/menuCardImg.svg";

import styles from "./MenuItemDescModal.module.css";
import MenuOptionModal from "../menuOptionModal/MenuOptionModal";

const MenuItemDescModal = ({ open, handleClose }) => {
  const [optionalOpen, setOptionalOpen] = useState(false)

  const makeRedir = ()=>{
    handleClose()
    setOptionalOpen(true)
  }

  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        border: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.main}>
        <div className={styles.head}>
          <p>Чизкейк</p>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.itemDesc}>
          <img src={img} alt="" />
          <p>
            Чизкейк - сладкий десерт, состоящий из одного или нескольких слоев.
          </p>
        </div>
        <div className={styles.ingrid}>
            <p>Основные ингредиенты</p>
            <ul>
                <li>печеньки 3 - гр</li>
                <li>печеньки 3 - гр</li>
                <li>печеньки 3 - гр</li>
            </ul>
        </div>
        <button onClick={makeRedir}   className={styles.btn}>
            Добавить
        </button>
      </div>
    </Modal>

      <MenuOptionModal open={optionalOpen} handleClose={()=>setOptionalOpen(false)}/>
    </div>
  );
};

export default MenuItemDescModal;

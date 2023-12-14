import { IconButton, Modal } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import img from "../../../img/menu/menuCard/menuCardImg.svg";

import styles from "./MenuItemDescModal.module.css";
import MenuOptionModal from "../MenuOptionModal/MenuOptionModal";

const MenuItemDescModal = ({ open, handleClose, itemDetails, addToCart }) => {
    const [optionalOpen, setOptionalOpen] = useState(false)

    const handleAddToCart = () => {
        addToCart(itemDetails);
        handleClose();
    };

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
                        <p>{itemDetails?.name}</p>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <div className={styles.itemDesc}>
                        <img src={itemDetails?.image} alt={itemDetails?.name} />
                        <p>{itemDetails?.description}</p>
                    </div>
                    {itemDetails?.compositions?.length > 0 && (
                        <div className={styles.ingrid}>
                            <p>Основные ингредиенты</p>
                            <ul>
                                {itemDetails.compositions.map((composition, index) => (
                                    <li key={index}>{composition.ingredient} - {composition.quantity} гр</li>
                                ))}
                            </ul>
                        </div>
                    )}
                   <button onClick={handleAddToCart} className={styles.btn}>
                        Добавить
                    </button>
                </div>
            </Modal>

            {/*<MenuOptionModal open={optionalOpen} handleClose={()=>setOptionalOpen(false)}/>*/}
        </div>
    );
};

export default MenuItemDescModal;

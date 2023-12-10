import { Modal } from "@mui/material";

const MenuOptionModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div>
        <h1>fghjkl</h1>
      </div>
    </Modal>
  );
};

export default MenuOptionModal;

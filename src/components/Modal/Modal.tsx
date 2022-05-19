import React from "react";
import { Modal as MuiModal } from "@mui/material";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { CloseButton, ModalContent } from "./Modal.style";
import { IntroModal, SettingsModal } from "./components";

type Props = {
  type: "intro" | "settings";
  open: boolean;
  onClose: () => void;
};
const Modal = ({ type, open, onClose: closeModal }: Props) => {
  const renderContent = () => {
    switch (type) {
      case "intro":
        return <IntroModal />;
      case "settings":
        return <SettingsModal />;
    }
  };

  return (
    <MuiModal disableAutoFocus open={open} onClose={closeModal}>
      <ModalContent>
        <CloseButton icon={faXmark} onClick={closeModal} />
        {renderContent()}
      </ModalContent>
    </MuiModal>
  );
};

export default Modal;

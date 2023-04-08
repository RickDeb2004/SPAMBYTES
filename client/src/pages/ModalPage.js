// To use this modal component we have to add a div with class "modal-container" in index.html becuase this uses react portals
import React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

const ModalPage = () => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const actionBar = (
        <div>
            <Button primary onClick={handleClose}>
                Click
            </Button>
        </div>
    );

    const modal = (
        <Modal onClose={handleClose} actionBar={actionBar}>
            <p>Text in modal</p>
        </Modal>
    );

    return (
        <div>
            <Button primary onClick={handleClick}>
                Open Modal
            </Button>
            {showModal && modal}
        </div>
    );
};

export default ModalPage;

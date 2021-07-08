import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>{props.children}</div>
      <footer className={styles.actions}>
        <button onClick={props.onConfirm}>Okay</button>
      </footer>
    </Card>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay title={props.title} onConfirm={props.onConfirm}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;

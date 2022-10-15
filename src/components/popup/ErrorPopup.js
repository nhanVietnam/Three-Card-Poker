import { createPortal } from "react-dom";

export const ErrorPopup = ({ open = false, handleClose = () => {}, ...props }) => {
    if (typeof document === "undefined") return <div className="popup"></div>;
    return createPortal(
        <div className="popup">
            <div className="overlay" onClick={handleClose}></div>
            <div className="modal-content">
                <h1 className="title">The deck is over!</h1>
                {/* <p className="total">Desk Cark: {props.totalCard}</p> */}
                <button className="reset" onClick={props.shuffleCard}>
                    Get new deck
                </button>
            </div>
        </div>,
        document.querySelector("body")
    );
};
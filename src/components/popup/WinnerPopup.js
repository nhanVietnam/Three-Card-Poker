import { createPortal } from "react-dom";

export const WinnerPopup = ({
    open = false,
    handleClose = () => {},
    ...props
}) => {
    if (typeof document === "undefined") return <div className="popup"></div>;
    return createPortal(
        <div className="popup">
            <div className="overlay" onClick={handleClose}></div>
            <div className="modal-content">
                <h1 className="title" style={{ alignItem: "center" }}>
                    Congratulation! <br></br> You are WINNER.
                </h1>
                <button className="reset" onClick={props.handleReset}>
                    Play Again
                </button>
            </div>
        </div>,
        document.querySelector("body")
    );
};

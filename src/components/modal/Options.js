import { createPortal } from "react-dom";

export const Options = ({ open = false, handleClose = () => {}, ...props }) => {
    if (typeof document === "undefined") return <div className="modal"></div>;
    return createPortal(
        <div className="modal">
            <div
                className="overlay"
                onClick={props.totalCard ? handleClose : () => {}}></div>
            <div className="modal-content">
                <h1 className="title">three card poker</h1>
                {!props.totalCard && (
                    <button className="play" onClick={props.shuffleCard}>
                        PLAY NOW
                    </button>
                )}

                {props.totalCard && props.deckId && (
                    <>
                        <p className="total">Desk Cark: {props.totalCard}</p>
                        <div className="options">
                            <button
                                className="shuffle"
                                onClick={props.shuffleCard}>
                                Shuffle
                            </button>
                            <button className="draw" onClick={props.drawCard}>
                                Draw
                            </button>
                            <button
                                className="reveal"
                                onClick={props.handleResult}>
                                Reveal
                            </button>
                        </div>
                        <button className="reset" onClick={props.handleReset}>
                            Reset
                        </button>
                    </>
                )}
            </div>
        </div>,
        document.querySelector("body")
    );
};

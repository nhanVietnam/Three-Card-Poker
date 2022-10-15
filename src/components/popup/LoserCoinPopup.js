import React from "react";
import { createPortal } from "react-dom";
import Button from "../button/Button";

const LoserCoinPopup = ({ players, handleClose = () => {}, ...props }) => {
    console.log(
        "🚀 ~ file: LoserCoinPopup.js ~ line 5 ~ LoserCoinPopup ~ players",
        players
    );

    if (typeof document === "undefined") return <div className="popup"></div>;
    return createPortal(
        <div className="popup">
            <div className="overlay" onClick={handleClose}></div>
            <div className="modal-content">
                {players.filter((player) => player.id === 1).length > 0 && (
                    <>
                        <h1 className="title">You lose</h1>
                        <button
                            className="continue"
                            onClick={props.handleReset}>
                            Play again
                        </button>
                    </>
                )}
                {players &&
                    players.filter((player) => player.id === 1).length ===
                        0 && (
                        <>
                            <h1
                                className="title"
                                style={{ textAlign: "center" }}>
                                Someone don't have enough coin
                            </h1>
                            <button
                                className="continue"
                                onClick={props.drawCard}>
                                Ok! Continue without{" "}
                                {players &&
                                    players.map((player, ind) => {
                                        return (
                                            <span key={ind}>
                                                {player.name}
                                                {ind + 1 === players.length
                                                    ? " "
                                                    : " ,"}
                                            </span>
                                        );
                                    })}
                            </button>
                            <Button
                                className="reset"
                                onClick={props.handleReset}>
                                Play Again
                            </Button>
                        </>
                    )}
                {/* <p className="total">Desk Cark: {props.totalCard}</p> */}
            </div>
        </div>,
        document.querySelector("body")
    );
};

export default LoserCoinPopup;

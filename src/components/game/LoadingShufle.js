import React from "react";

export default function LoadingShuffle({ drawCard = () => {} }, ...props) {
    return (
        <div className="loading-shuffle">
            <img
                src="https://i.giphy.com/media/3orieMHl3j2MgK5xAc/200.webp"
                style={{ width: "400px" }}
                alt=""
            />
            <h2>Shuffle Time...</h2>
            <button className="draw" onClick={() => drawCard()}>
                Draw
            </button>
        </div>
    );
}

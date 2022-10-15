import React from "react";
import { v4 } from "uuid";
import CardBack from "./CardBack";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const Player = ({
    player,
    index,
    showCards,
    winnerScore,
    isPlaying,
    ...props
}) => {
    return (
        <div className={`player player-${player.id}`} key={v4()}>
            <div className="player-info">
                <h2 className="player-name">{player.name}</h2>
                <p className="player-score">Số tiền: {player.coins}</p>
            </div>
            <div className="cards">
                {showCards && winnerScore && (
                    <span
                        className={`show-result ${
                            player.score === winnerScore ? "win" : "lose"
                        }`}>
                        {player.score === winnerScore ? "win" : "lose"}
                    </span>
                )}
                {isPlaying &&
                    player.cards.length > 0 &&
                    player.cards.map((card) => {
                        if (index + 1 === 1 || showCards === true) {
                            return (
                                <div className="card" key={v4()}>
                                    <img
                                        className="card-img"
                                        src={card.image}
                                        alt=""
                                    />
                                </div>
                            );
                        }
                        return <CardBack key={v4()}></CardBack>;
                    })}
            </div>
        </div>
    );
};

Player.propTypes = {
    player: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        coins: PropTypes.number,
        score: PropTypes.number,
        card: PropTypes.arrayOf(PropTypes.number),
    }),
};

function FallbackComponent() {
    return (
        <p className="bg-red text-red-">
            Something went wrong with Player component
        </p>
    );
}

export default withErrorBoundary(Player, {
    FallbackComponent,
});

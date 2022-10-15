//library
import { useRef, useState } from "react";
import { v4 } from "uuid";

//style
import "./reset.scss";
import "./index.scss";

//components
import { ErrorPopup } from "./components/popup/ErrorPopup";
import { Options } from "./components/modal/Options";
import LoserCoinPopup from "./components/popup/LoserCoinPopup";
import { WinnerPopup } from "./components/popup/WinnerPopup";
import LoadingShuffle from "./components/game/LoadingShufle";
import Player from "./components/game/Player";
import Button from "./components/button/Button";
import { Rules } from "./components/modal/Rules";

//util (helper)
import playersReset from "./util/playerReset";

//data
import { fakeData } from "./data/fakeData";

//API
import { getInit, nextMatch, getDraw } from "./api/getAPI.js";

// Please check console or reload page if game is bug. Thank you
function App() {
    const [deckId, setDeckId] = useState(0);
    const [totalCard, setTotalCard] = useState(null);
    const [showOption, setShowOption] = useState(true);

    //Clone data with map to prevent reference type change data
    const [players, setPlayers] = useState(
        fakeData.map((item) => {
            return { ...item };
        })
    );
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [winnerScore, setWinnerScore] = useState(false);
    const [winner, setWinner] = useState(false);
    const [loser, setLosers] = useState(null);
    const [rules, setRules] = useState(false);

    const handleShuffle = useRef(); //fix re-render infinitive by useRef
    handleShuffle.current = () => {
        // Get new deck and not reset coin
        if (!deckId) {
            getInit().then((res) => {
                setDeckId(res.deck_id);
                setTotalCard(res.remaining);
            });
        } else {
            //Reset player cards
            const resetCard = playersReset(players);
            setPlayers(resetCard);
            //end reset
            if (totalCard <= 4) {
                getInit().then((res) => {
                    setShowCards(false);
                    setDeckId(res.deck_id);
                    setTotalCard(res.remaining);
                });
            } else {
                nextMatch(deckId).then((res) => {
                    setShowCards(false);
                    setTotalCard(res.remaining);
                    setIsPlaying(true);
                    console.log(
                        "App is bug when run nextMatch. Right? - App.js - Line 67 "
                    ); //check bug
                });
            }
        }
    };

    // Handle when button "Shuffle" is clicked
    const shuffleCard = (e) => {
        setShowOption(false);
        setIsPlaying(false);
        setTotalCard(null);
        handleShuffle.current();
    };

    // Handle when button "Draw" is clicked
    const drawCard = (e) => {
        //check Coin and show notifation ('dont have enought coin')
        checkCoin(players);
        if (loser) {
            setLosers(null);
            return;
        }

        setShowOption(false);
        setShowCards(false);
        setIsPlaying(true);
        const resetCard = playersReset(players);
        setPlayers(resetCard);

        //Calculation Score
        let getCards, totalScore;
        const updatePlayers = players.map((player) => {
            getDraw(deckId)
                .then((res) => {
                    getCards = res.cards;
                    totalScore = res.cards.reduce((total, card) => {
                        let getValue = !Number.isNaN(Number(card.value))
                            ? Number(card.value)
                            : card.value === "ACE"
                            ? 1
                            : 10;
                        const result = total + getValue;
                        return result >= 10
                            ? Number(String(result).slice(-1))
                            : result;
                    }, 0);
                    player.cards = getCards;
                    player.score = totalScore;
                    if (deckId === res.deck_id) {
                        setTotalCard(res.remaining);
                    }
                })
                .catch((err) => console.log(err));
            return player;
        });
        setPlayers(updatePlayers);
    };

    //Check coin of players and update current players
    const checkCoin = (players) => {
        let loser;
        const updatePlayers = players
            .map((player) => {
                if (player.coins <= 0) {
                    loser = player.id;
                }
                return player;
            })
            .filter((player) => player.coins > 0);

        //Check and handle the loser
        if (loser) {
            setLosers(players.filter((player) => player.coins < 0));
            if (
                updatePlayers.length === 1 &&
                updatePlayers.filter((player) => player.id === 1).length === 1
            ) {
                setWinner(true);
            }
            setPlayers(updatePlayers);
        }
    };

    // Handle when button "Reveal" is clicked
    const handleResult = (e) => {
        setShowCards(true);

        //Calculation max score
        const calcScore = players.reduce((player, value) => {
            return (player = player > value.score ? player : value.score);
        }, 0);

        setWinnerScore(calcScore);

        // Get the winner
        let winners = 1;
        winners = players.filter((player) => {
            return player.score === calcScore;
        }).length;

        // Update coin
        const updateCoins = players.map((player) => {
            if (player.score === calcScore) {
                player.coins = player.coins + 900 / winners;
            } else {
                player.coins = player.coins - 900;
            }
            return player;
        });
        setPlayers(updateCoins);
    };

    // Handle when button "Reset" is clicked
    const handleReset = (e) => {
        setLosers(null);
        setPlayers(
            fakeData.map((item) => {
                return { ...item };
            })
        );
        setDeckId(null);
        setIsPlaying(false);
        setShowCards(false);
        setTotalCard(null);
        setWinnerScore(null);
        setShowOption(true);
        setWinner(false);
    };

    return (
        <div className="main">
            {!isPlaying && totalCard && (
                <LoadingShuffle drawCard={drawCard}></LoadingShuffle>
            )}
            {isPlaying && totalCard > 4 && showCards && (
                <Button className="draw centerPage" onClick={() => drawCard()}>
                    Draw
                </Button>
            )}
            {!rules && (
                <Button className="showRulesBtn" onClick={() => setRules(true)}>
                    Rules
                </Button>
            )}
            {/* playerList */}
            {players &&
                isPlaying &&
                players.map((player, index) => {
                    return (
                        <Player
                            key={v4()}
                            index={index}
                            player={player}
                            showCards={showCards}
                            winnerScore={winnerScore}
                            isPlaying={isPlaying}></Player>
                    );
                })}
            <Button className="pause" onClick={() => setShowOption(true)}>
                Pause
            </Button>
            {isPlaying && !showCards && (
                <Button className="resultBtn" onClick={() => handleResult()}>
                    Reveal
                </Button>
            )}
            <div>
                {showOption && (
                    <Options
                        shuffleCard={shuffleCard}
                        totalCard={totalCard}
                        drawCard={() => drawCard()}
                        handleReset={() => handleReset()}
                        handleClose={() => setShowOption(!showOption)}
                        handleResult={handleResult}
                        deckId={deckId}></Options>
                )}
            </div>
            {totalCard && totalCard <= 4 && winnerScore && !loser && (
                <ErrorPopup shuffleCard={shuffleCard}></ErrorPopup>
            )}
            {loser && !winner && (
                <LoserCoinPopup
                    players={loser}
                    handleReset={handleReset}
                    shuffleCard={shuffleCard}
                    drawCard={drawCard}></LoserCoinPopup>
            )}
            {winner && <WinnerPopup handleReset={handleReset}></WinnerPopup>}
            {rules && <Rules handleClose={() => setRules(false)}></Rules>}
        </div>
    );
}

export default App;

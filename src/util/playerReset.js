export default function playersReset(arrObj) {
    const reset = arrObj.map((player, index) => {
        return {
            ...player,
            cards: [],
        };
    });
    return reset;
}

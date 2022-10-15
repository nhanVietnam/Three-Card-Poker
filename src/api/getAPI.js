import axios from "axios";

const domainAPI = `https://deckofcardsapi.com/api/deck`;

export const getInit = async (desk_count = 1) => {
    try {
        const response = await axios.get(
            `${domainAPI}/new/shuffle/?deck_count=${desk_count}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        console.log("Please reload page if has bug. Thank you so much. :D");
    }
};

export const nextMatch = async (deckId, count = 3) => {
    try {
        const response = await axios.get(
            `${domainAPI}/${deckId}/draw/?count=${count}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        console.log("Please reload page if has bug. Thank you so much. :D");
    }
};

//something wrong with this function,
export const getDraw = async (deckId, count = 3) => {
    try {
        const response = await axios.get(
            `${domainAPI}/${deckId}/draw/?count=${count}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        console.log("Please reload page if has bug. Thank you so much. :D");
    }
};

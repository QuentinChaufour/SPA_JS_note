import fetchData from "./fetcher";
import{ API_URL_ENDPOINT } from "../config";

export default class FactionProvider {

    /**
     * fetch a faction by id
     * @param {number} id - the id of the faction to fetch
     * @returns {Object} the faction data
     */
    static async getFaction(id) {

        if (!id) {
            return null;
        }

        const url = `${API_URL_ENDPOINT}/factions/${id} `;
        const data = await fetchData(url);

        return data ? data : {};
    }

    /**
     * fetch all factions
     * @returns {Array[Object]} all the factions available
     */
    static async getFactions() {
        const url = `${API_URL_ENDPOINT}/factions`;
        const data = await fetchData(url);

        return data ? data : [];
    }

    /**
     * fetch a chapter by id
     * @param {int} id - the id of the chapter to fetch
     * @returns {Object} the chapter data
     */
    static async getChapter(id){
        if (!id) {
            return null;
        }

        const url = `${API_URL_ENDPOINT}/sub_factions/${id}`;
        const data = await fetchData(url);

        return data;
    }

    /**
     * fetch all chapters
     * @returns {Array[Object]} all chapters available
     */
    static async getChaptersByFaction(factionId){
        const url = `${API_URL_ENDPOINT}/sub_factions?factionId=${factionId}`;
        const data = await fetchData(url);

        return data;
    }



}
import Character from "../_models/character";
import fetchData from "./fetcher";
import FactionProvider from "./faction_provider";
import RoleProvider from "./role_provider";
import { API_URL_ENDPOINT } from "../config";

export default class CharacterProvider {

    /**
     * fetch all characters from the database
     * @returns {Array} an array of characters
     */
    static async getAllCharacters() {
        const url = `${API_URL_ENDPOINT}/characters`;
        const data = await fetchData(url);
        if (data) {
            return await Promise.all(
                data.map(async element => {
                    let character = Character.fromJson(element);
                    character.faction = await FactionProvider.getFaction(element.factionId);
                    character.chapter = await FactionProvider.getChapter(element.sub_factionId);
                    character.role = await RoleProvider.getRole(element.rankId);
                    return character;
            })
        );
        } else {
            return [];
        }
    }

}
import Character from "../_models/character";
import fetchData from "./fetcher";
import FactionProvider from "./faction_provider";
import RoleProvider from "./role_provider";
import WeaponArmourProvider from './weapon_armour_provider'
import { API_URL_ENDPOINT } from "../config";

export default class CharacterProvider {

    /**
     * fetch all characters from the database, with minimal data
     * @returns {Array} an array of characters
     */
    static async getCharacters() {
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

    /**
     * Get all data related to the character
     * @param {int} id the character's id 
     */
    static async getCharacter(id){
        const url = `${API_URL_ENDPOINT}/characters/${id}`;
        const data = await fetchData(url);
        if(data){
            let character = Character.fromJson(data);
            character.faction = await FactionProvider.getFaction(data.factionId);
            character.chapter = await FactionProvider.getChapter(data.sub_factionId);
            character.role = await RoleProvider.getRole(data.rankId);

            character.range_weapon = await WeaponArmourProvider.getWeapon(data.rangedWeaponId);
            character.melee_weapon = await WeaponArmourProvider.getWeapon(data.meleeWeaponId);

            return character;
        }
        return {}
    }

}
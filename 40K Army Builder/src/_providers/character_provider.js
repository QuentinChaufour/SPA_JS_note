import Character from "../_models/character.js";
import fetchData from "./fetcher.js";
import FactionProvider from "./faction_provider.js";
import RoleProvider from "./role_provider.js";
import WeaponArmorProvider from './weapon_armor_provider.js';
import { API_URL_ENDPOINT } from "../config.js";
import CharacterViewModel from "../_view_model/character_view_model.js";

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

            character.range_weapon = await WeaponArmorProvider.getWeapon(data.rangedWeaponId);
            character.melee_weapon = await WeaponArmorProvider.getWeapon(data.meleeWeaponId);
            character.armor = await WeaponArmorProvider.getarmor(data.armorId);

            return character;
        }
        return {}
    }

    static async createCharacter(characterData){
        const url = `${API_URL_ENDPOINT}/characters`;
    
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(characterData)
        });
    }

    static async updateCharacterWeapon(character, weapon){

        const url = `${API_URL_ENDPOINT}/characters/${character.id}`;
        const tag = weapon.isRanged ? "rangedWeaponId" : "meleeWeaponId";

        let weaponId = weapon.id;
        if(weapon.id == character.weapons.melee?.id || weapon.id == character.weapons.range?.id){
            weaponId = null;
        }

        const body = {
            [tag]: weaponId
        }
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    static async updateCharacterArmor(character, armor){
        const url = `${API_URL_ENDPOINT}/characters/${character.id}`;

        let armorId = armor.id;
        if(armor.id == character.armor?.id){
            armorId = null;
        }

        const body = {
            "armorId": armorId
        }
        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    static async deleteCharacter(id){
        const url = `${API_URL_ENDPOINT}/characters/${id}`;

        await fetch(url, {
            method: "DELETE"
        });

        const characterViewModel = await CharacterViewModel.getInstance();
        await characterViewModel.refreshCharacters();
    }

}
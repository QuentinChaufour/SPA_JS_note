import fetchData from "./fetcher";
import{ API_URL_ENDPOINT } from "../config";
import Weapon from "../_models/weapon";
import Armor from "../_models/armor.js";

export default class WeaponArmorProvider{

    static async getWeapons(){

    }

    static async getMeleWeapons(){
        const url = `${API_URL_ENDPOINT}/weapons?ranged=false`;
        const data = await fetchData(url);
        return data.map((item) => Weapon.fromJson(item));
    }

    static async getRangedWeapons(){
        const url = `${API_URL_ENDPOINT}/weapons?ranged=true`;
        const data = await fetchData(url);
        return data.map((item) => Weapon.fromJson(item));
    }

    static async getWeapon(id){
        if(!id){
            return null;
        }

        const url = `${API_URL_ENDPOINT}/weapons/${id}`;
        const data = await fetchData(url);

        return Weapon.fromJson(data);
    }

    static async getarmors(){
        const url = `${API_URL_ENDPOINT}/armors`;
        const data = await fetchData(url);
        return data.map((item) => Armor.fromJson(item));
    }

    static async getarmor(id) {

        if(!id){
            return null;
        }

        const url = `${API_URL_ENDPOINT}/armors/${id}`;
        const data = await fetchData(url);

        return Armor.fromJson(data);
    }


}
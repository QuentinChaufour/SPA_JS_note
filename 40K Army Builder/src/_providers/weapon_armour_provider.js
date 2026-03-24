import fetchData from "./fetcher";
import{ API_URL_ENDPOINT } from "../config";
import Weapon from "../_models/weapon";

export default class WeaponArmourProvider{

    static async getWeapons(){

    }

    static async getMeleWeapons(){

    }

    static async getRangedWeapons(){

    }

    static async getWeapon(id){
        if(!id){
            return null;
        }

        const url = `${API_URL_ENDPOINT}/weapons/${id}`;
        const data = await fetchData(url);

        return Weapon.fromJson(data);


    }

    static async getArmours(){

    }

    static async getArmour(id) {
        
    }


}
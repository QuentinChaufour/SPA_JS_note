import fetchData from "./fetcher";
import{ API_URL_ENDPOINT } from "../config";

export default class RoleProvider {

    static async getRole(id) {

        if (!id) {
            return null;
        }

        const url = `${API_URL_ENDPOINT}/ranks/${id}`;
        const data = await fetchData(url);
        
        return data;
    }

    static async getRolesByFaction(factionId){
        if(!factionId){
            return [];
        }

        const url = `${API_URL_ENDPOINT}/ranks?factionId=${factionId}`;
        const data = await fetchData(url);

        return data;
    }


}
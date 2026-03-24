
export default class Armor {

    /**
     * 
     * @param {int} id the id of the armor 
     * @param {string} name the name of the armor
     * @param {string} description  the description of the armor
     * @param {int} save  the save of the armor
     * @param {int} invulnerable_save  the invulnerable save of the armor
     * @param {int} wounds  the wounds of the armor
     * @param {string} image_url  the url of the armor's image
     */
    constructor(
        id,
        name,
        description,
        save,
        invulnerable_save,
        wounds,
        image_url
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.save = save;
        this.invulnerable_save = invulnerable_save;
        this.wounds = wounds;
        this.image_url = image_url;
    }

    static fromJson(json){
        return new Armor(
            json.id,
            json.name,
            json.description,
            json.save,
            json.invulnerable_save,
            json.wounds,
            json.imageUrl
        );
    }

}

export default class Armour {

    /**
     * 
     * @param {int} id the id of the armour 
     * @param {string} name the name of the armour
     * @param {string} description  the description of the armour
     * @param {int} save  the save of the armour
     * @param {int} invulnerable_save  the invulnerable save of the armour
     * @param {int} wounds  the wounds of the armour
     * @param {string} image_url  the url of the armour's image
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

}
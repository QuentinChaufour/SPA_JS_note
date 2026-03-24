
export default class Weapon {

    #id;
    #name;
    #isRange;
    #description;
    #stats;
    #image_url;

    /**
     * 
     * @param {int} id the id of the weapon 
     * @param {string} name  the name of the weapon
     * @param {boolean} range  true if the weapon is a range weapon, false if it is a close combat weapon
     * @param {string} description  the description of the weapon
     * @param {Object} stats  the stats of the weapon, with the following properties: range, S, AP, D
     * @param {string} image_url  the url of the weapon's image
     */
    constructor(
        id,
        name,
        range,
        description,
        stats,
        image_url
    ){
        this.#id = id;
        this.#name = name;
        this.#isRange = range;
        this.#description = description;
        this.#stats = stats;
        this.#image_url = image_url;
    }

    /**
     * Gets the id of the weapon.
     * @return {int} The id of the weapon.
     */
    get id() {
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    /**
     * Gets the name of the weapon.
     * @return {string} The name of the weapon.
     */
    get name() {
        return this.#name;
    }

    set name(name){
        this.#name = name;
    }

    /**
     * Get if the weapon is a ranged weapon.
     * @returns {boolean} True if the weapon is a range weapon, false if it is a close combat weapon.
     */
    get isRange() {
        return this.#isRange;
    }

    set isRange(is_range){
        this.#isRange = is_range;
    }

    /**
     * Gets the description of the weapon.
     * @returns {string} The description of the weapon.
     */
    get description() {
        return this.#description;
    }
    set description(description){
        this.#description = description;
    }

    /**
     * Gets the stats of the weapon.
     * @returns {Object} The stats of the weapon, with the following properties: range, S, AP, D
     */
    get stats() {
        return this.#stats;
    }

    set stats(stats){
        this.#stats = stats;
    }

    /**
     * Gets the URL of the weapon's image.
     * @returns {string} The URL of the weapon's image.
     */
    get image_url() {
        return this.#image_url;
    }

    set image_url(url){
        this.#image_url = url;
    }

    /**
     * Creates a Weapon instance from a JSON object.
     * @param {Object} json The JSON object representing the weapon.
     * @returns {Weapon} A new Weapon instance.
     */
    static fromJson(json) {
        return new Weapon(
            json.id,
            json.name,
            json.ranged,
            json.description,
            json.stats,
            json.imageUrl
        );
    }
}
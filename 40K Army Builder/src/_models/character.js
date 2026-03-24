import Armor from "./armor";
import Weapon from "./weapon";

export default class Character {

    /**
     * 
     * @param {int} id character's id
     * @param {string} name the name of the character
     * @param {Object} faction the name and the logo of the faction
     * @param {Object} chapter the name and the icon of the subfaction
     * @param {string} role the role of the character in the army
     * @param {string} rank the rank of the character in the army
     * @param {Object} stats the stats of the character (WS, BS, S, T, W, A, Ld, Sv)
     * @param {Weapon} range_weapon the range weapons of the character
     * @param {Weapon} melee_weapon the close combat weapons of the character
     * @param {Armor} armor the armor of the character
     * @param {int} points the points cost of the character
     * @param {string} lore the lore of the character
     * @param {string} image_url the url of the character's image
     */
    constructor(
        id,
        name,
        faction,
        chapter,
        role,
        rank,
        stats,
        range_weapon,
        melee_weapon,
        armor,
        points,
        lore,
        image_url
    ){
        this._id = id;
        this._name = name;
        this._faction = faction;
        this._chapter = chapter;
        this._role = role;
        this._rank = rank;
        this._stats = stats;
        this._range_weapon = range_weapon;
        this._melee_weapon = melee_weapon;
        this._armor = armor;
        this._points = points;
        this._lore = lore;
        this._image_url = image_url;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get faction() {
        return this._faction;
    }

    set faction(faction) {
        this._faction = faction;
    }

    get chapter() {
        return this._chapter;
    }

    set chapter(chapter) {
        this._chapter = chapter;
    }

    get role() {
        return this._role;
    }

    set role(role) {
        this._role = role;
    }

    get rank() {
        return this._rank;
    }

    set rank(rank) {
        this._rank = rank;
    }

    get stats() {
        return this._stats;
    }

    set stats(stats) {
        this._stats = stats;
    }

    /**
     * @returns {Object} the range and close combat weapons of the character
     */
    get weapons() {
        return {
            range: this._range_weapon,
            melee: this._melee_weapon
        };
    }

    /**
     * @param {Weapon} weapon the range weapon of the character
     */
    set range_weapon(weapon) {
        this._range_weapon = weapon;
    }

    /**
     * @param {Weapon} weapon the close combat weapon of the character
     */
    set melee_weapon(weapon) {
        this._melee_weapon = weapon;
    }

    /**
     * @returns {Armor} the armor of the character
     */
    get armor() {
        return this._armor;
    }

    /**
     * @param {Armor} armor the armor of the character
     */
    set armor(armor) {
        this._armor = armor;
    }

    /**
     * @returns {int} the points cost of the character
     */
    get points() {
        return this._points;
    }

    set points(points) {
        this._points = points;
    }

    /**
     * @returns {string} the lore of the character
     */
    get lore() {
        return this._lore;
    }

    set lore(lore) {
        this._lore = lore;
    }

    /**
     * @returns {string} the url of the character's image
     */
    get image_url() {
        return this._image_url;
    }

    set image_url(image_url) {
        this._image_url = image_url;
    }

    /**
     * Creates a Character instance from a JSON object.
     * @param {Object} json  the JSON object representing the character, with the following properties: id, name, faction, subfaction, role, rank, stats, range_weapon, close_combat_weapon, armor, points, lore, image_url
     * @returns {Character} the Character instance created from the JSON object
     */
    static fromJson(json) {
        return new Character(
            json.id,
            json.name,
            null,
            null,
            json.role,
            json.rank,
            json.stats,
            null,
            null,
            null,
            json.points,
            json.lore,
            json.imageUrl
        );
    }
}
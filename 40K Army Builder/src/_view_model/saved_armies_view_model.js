import Army from "../_models/army.js";
import Character from "../_models/character.js";
import CharacterProvider from "../_providers/character_provider.js";
import router from "../router.js";

export default class SavedArmiesViewModel {

    /**
     * Singleton pattern implementation to ensure only one instance of SavedArmiesViewModel exists
     */
    static #instance = null;
    static armyIdCounter = 0;

    static getInstance(){
        if(!SavedArmiesViewModel.#instance){
            SavedArmiesViewModel.#instance = new SavedArmiesViewModel();
        }
        return SavedArmiesViewModel.#instance;
    }

    constructor(){
        this.savedArmies = [];
        this._init();
    }

    /**
     * Load saved armies from localStorage
     */
    async _init(){
        const savedArmies = localStorage.getItem("saved_armies");

        if(!savedArmies){
            return;
        }

        const armies = JSON.parse(savedArmies);
        this.savedArmies = armies.map(async army => {
            let units = army.units.map(unitId => CharacterProvider.getInstance().getCharacter(unitId));

            return new Army(army.id, army.name, await Promise.all(units), army.points)
        });

    }

    /**
     * Create a new army and save it to localStorage
     * @param {string} name - The name of the army
     * @param {Array} units - An array of unit IDs to be included in the army
     * @param {number} points - The total points of the army
     */
    createArmy(name, units, points){

        const checkArmyName = this.savedArmies.find(army => army.name === name);
        if(checkArmyName){
            throw new Error("An army with this name already exists. Please choose a different name.");
        }

        const newArmy = new Army(SavedArmiesViewModel.armyIdCounter, name, units, points);
        SavedArmiesViewModel.armyIdCounter++;
        this.savedArmies.push(newArmy);
        this._saveToLocalStorage();

        router();
    }

    /**
     * Update an existing army based on its ID and save the changes to localStorage
     * @param {Number} id 
     * @param {String} name 
     * @param {Array[Character]} units 
     * @param {Number} points 
     */
    updateArmy(id, name, units, points){
        const army = this.savedArmies.find(army => army.id === id);
        if(!army){
            throw new Error("Army not found.");
        }

        army.name = name;
        army.units = units;
        army.points = points;
        this._saveToLocalStorage();

        router();
    }

    /**
     * Remove an army based on its ID and update localStorage
     * @param {Number} id 
     */
    removeArmy(id){
        this.savedArmies = this.savedArmies.filter(army => army.id !== id);
        this._saveToLocalStorage();

        router();
    }

    _saveToLocalStorage(){
        const armiesToSave = this.savedArmies.map(army => JSON.stringify({
            name: army.name,
            units: army.units.map(unit => unit.id),
            points: army.points
        }));

        localStorage.setItem("saved_armies", armiesToSave.join(","));
    }

    getSavedArmies(){
        return this.savedArmies;
    }
}
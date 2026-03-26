import Character from '../_models/character';
import CharacterProvider from '../_providers/character_provider.js';
import router from '../router.js';

export default class SavedCharactersViewModel {

    /**
     * Singleton pattern implementation to ensure only one instance of SavedCharactersViewModel exists
     */
    static #instance = null;

    static getInstance(){
        if(!SavedCharactersViewModel.#instance){
            SavedCharactersViewModel.#instance = new SavedCharactersViewModel();
        } 
        return SavedCharactersViewModel.#instance;
    }

    constructor(){
        this.savedCharacters = [];
        this._init();
    }

    /**
     * Initializes the view model by loading the saved characters from local storage and fetching their details
     */
    async _init(){
        const savedCharactersId = localStorage.getItem("saved_characters");
        if(savedCharactersId){
            const characterIds = savedCharactersId.split(",");
            this.savedCharacters = await Promise.all(characterIds.map(id => CharacterProvider.getCharacter(id)));
        }
    }

    /**
     * Adds a character to the list of saved characters and updates local storage
     * @param {Character} character 
     */
    addCharacter(character){
        this.savedCharacters.push(character);
        this._updateLocalStorage();
        router();
    }

    /**
     * Removes a character from the list of saved characters and updates local storage
     * @param {Character} character the character to remove from the list 
     */
    removeCharacter(character){
        this.savedCharacters = this.savedCharacters.filter(characterElem => characterElem.id != character.id);
        this._updateLocalStorage();
        router();
    }

    _updateLocalStorage(){
        const characterIds = this.savedCharacters.map(character => character.id);
        localStorage.setItem("saved_characters", characterIds.join(","));
    }

    containsCharacter(character){
        return this.savedCharacters.filter(characterElem => characterElem.id == character.id).length > 0;
    }
}
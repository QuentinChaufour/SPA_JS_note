
import Character from "../_models/character.js";
import CharacterProvider from "../_providers/character_provider.js";

export default class CharacterViewModel {
    /**
     * Singleton pattern implementation to ensure only one instance of CharacterViewModel exists
     */
    static #instance = null;

    constructor(){

        this.characters = [];
        this.currentPage = 1;
        this.pageSize = 9;
    }

    async #init(){
        this.characters = await CharacterProvider.getCharacters();
    }

    static async getInstance(){
        if(!CharacterViewModel.#instance){
            CharacterViewModel.#instance = new CharacterViewModel();
            
            // Cache the characters data on the instance to avoid multiple fetches
            await CharacterViewModel.#instance.#init();
        }

        return CharacterViewModel.#instance;
    }

    /**
     * Gets the characters for the current page based on the page size
     * @returns {Array} the characters to display onto the page
     */
    getPaginatedCharacters(){
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.characters.slice(startIndex, endIndex);
    }

    /**
     * Adds a character to the list of characters
     * @param {Character} character the character to add to the list
     */
    addCharacter(character){
        this.characters.push(character);
    }

    /**
     * Moves to the next page of characters if there are more characters to display
     */
    nextPage(){
        if(this.currentPage < this.maxPage()){
            this.currentPage++;
        }
    }

    /**
     * Moves to the previous page of characters if not on the first page
     */
    previousPage(){
        if(this.currentPage > 1){
            this.currentPage--;
        }
    }

    /**
     * Calculates the maximum number of pages based on the total number of characters and the page size
     * @returns {int} the max amount of page possible
     */
    ["maxPage"](){
        return Math.ceil(this.characters.length / this.pageSize);
    }



}

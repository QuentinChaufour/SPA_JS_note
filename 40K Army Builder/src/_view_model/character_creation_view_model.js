import CharacterProvider from "../_providers/character_provider";
import CharacterViewModel from "./character_view_model.js";

export default class CharacterCreationViewModel {

    static #instance = null;

    static getInstance(){
        if(CharacterCreationViewModel.#instance == null){
            CharacterCreationViewModel.#instance = new CharacterCreationViewModel();
        }
        return CharacterCreationViewModel.#instance;
    }

    constructor(){
        this.stats = {};
        this.image_url = "";
        this.name = "";
        this.selected_faction = null;
        this.selected_chapter = null;
        this.character_lore = "";
        this.weapons = {
            melee: null,
            range: null
        };
        this.armor = null;
        this.points = 0;
    }

    async saveCharacter(){

        if(!this.name || !this.selected_faction){
            throw new Error("Please provide a name and select a faction for your character.");
        }

        if(this.points <= 0){
            throw new Error("Please allocate positive points to your character's stats.");
        }

        const characterData = {
            id : await this.nextId(),
            name: this.name,
            imageUrl: this.image_url,
            stats: this.stats,
            factionId: this.selected_faction.id,
            sub_factionId: this.selected_chapter ? this.selected_chapter.id : null,
            lore: this.character_lore,
            meleeWeaponId: this.weapons.melee ? this.weapons.melee.id : null,
            rangeWeaponId: this.weapons.range ? this.weapons.range.id : null,
            armorId: this.armor ? this.armor.id : null,
            points: this.points,
            typeId:  null,
            rankId: null
        };

        await CharacterProvider.createCharacter(characterData)
        
        const characterViewModel = await CharacterViewModel.getInstance();
        await characterViewModel.refreshCharacters();
    }

    /**
     * Resets the character creation form to its default state
     */
    reset(){
        this.stats = {};
        this.image_url = "";
        this.name = "";
        this.selected_faction = null;
        this.selected_chapter = null;
        this.character_lore = "";
        this.weapons = {
            melee: null,
            range: null
        };
        this.armor = null;
        this.points = 0;
    }

    /**
     * Calculates the next character id, or 1 if no characters exist yet
     * @returns {Number} the next character id to be created
     */
    async ["nextId"](){
        const characterViewModel = await CharacterViewModel.getInstance();
        const last_id =  await characterViewModel.characters.at(-1)?.id;
        return last_id ? parseInt(last_id) + 1 : 1;
    }
}
import './styles/saved_characters_armies.css';

import CharacterOneLine from "../_components/characters/card/charcter_oneline";
import ArmyOneLine from "../_components/armies/army_oneline.js";
import SavedCharactersViewModel from "../_view_model/saved_characters_view_model";
import SavedArmiesViewModel from "../_view_model/saved_armies_view_model.js";

export default class Saved{

    constructor(){
        this.saved_characters = SavedCharactersViewModel.getInstance().getSavedCharacters();
        this.saved_armies = SavedArmiesViewModel.getInstance().getSavedArmies();
    }

    async render(){

        return `
        <div>
            <h1>Saved Characters</h1>
        </div>

        <div class="saved-characters-container">
            ${this.saved_characters.length > 0 ? this.saved_characters.map(
                (character) => CharacterOneLine(character)
            ).join('') 
            : '<p class="empty-roster-msg">No saved characters.</p>'}
        </div>

        <div class="saved-characters-container">
            <h1> Saved Armies</h1>
            ${this.saved_armies.length > 0 ? 
                this.saved_armies.map(
                    army => ArmyOneLine(army)
                ).join('')
            : '<p class="empty-roster-msg">No saved armies.</p>'}
        </div>
        `;
    }

    async post_render(){
        for(let character of this.saved_characters){
            document.querySelector(`#character-${character.id}`)?.addEventListener('click', () => {
                window.location.hash = `/characters/${character.id}`;
            });
        }

        const armyElements = document.querySelectorAll('.army-oneline');
        armyElements.forEach(armyElement => {
            armyElement.addEventListener('click', () => {
                window.location.hash = `/armies/${armyElement.id.split('-')[1]}`;
            });
        });
    }
}
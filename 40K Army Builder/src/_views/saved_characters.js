import './styles/saved_characters_armies.css';

import CharacterOneLine from "../_components/characters/card/charcter_oneline";
import ArmyOneLine from "../_components/armies/army_oneline.js";
import ArmyExpanded from "../_components/armies/army_expended.js";
import SavedCharactersViewModel from "../_view_model/saved_characters_view_model";
import SavedArmiesViewModel from "../_view_model/saved_armies_view_model.js";
import CharacterProvider from '../_providers/character_provider.js';

export default class Saved{

    static expanded_army_id = 0;

    constructor(){
        this.saved_characters = SavedCharactersViewModel.getInstance().getSavedCharacters();
        this.saved_armies = SavedArmiesViewModel.getInstance().getSavedArmies();
        this.army_expanded_id = this.saved_armies.length > 0 ? this.saved_armies[0].id : 0;
    }

    render(){

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

        <div>
            <h1> Saved Armies</h1>
        </div>

        <div class="saved-armies-container">
            ${this.saved_armies.length > 0 ? this.saved_armies.map(
                (army) => `
                    <div class="saved-army-card" id="army-${army.id}">
                        ${army.id == this.army_expanded_id ? 
                            ArmyExpanded(army) :
                            ArmyOneLine(army)
                        }
                    </div>
                `
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

        await SavedArmiesViewModel.getInstance().createArmy("Test Army", await Promise.all([CharacterProvider.getCharacter(1), CharacterProvider.getCharacter(2)]), 1000);
        await SavedArmiesViewModel.getInstance().createArmy("Test Army 2", await Promise.all([CharacterProvider.getCharacter(1), CharacterProvider.getCharacter(2)]), 1000);
        console.log("Saved Armies after creation:", SavedArmiesViewModel.getInstance().getSavedArmies());
    }
}
import './panel_selection.css';

import weapon_component from "./weapon_component";
import armor_component from "./armor_component";
import Character from '../../../_models/character';
import Weapon from '../../../_models/weapon';
import CharacterProvider from '../../../_providers/character_provider';
import router from '../../../router.js';
import CharacterCreationViewModel from '../../../_view_model/character_creation_view_model.js';

export function ItemListSidePanel(type, items) {

    if(items.length == 0){
        return "";
    }

    const itemTemplate = type == "range_weapon" ?
        (item) => weapon_component(item, true) :
        type == "melee_weapon" ?
        (item) => weapon_component(item, false) :
        (item) => armor_component(item);

    return `
        <div class="side-panel-container">
            <div class="side-panel-header">
                <button id="close-side-panel" class="close-button">&times;</button>
            </div>
            <ul class="side-panel-list">
                ${items.map((item) =>
                    itemTemplate(item)
                ).join('')}
            </ul>
        </div>
    `;
}

export function ItemListSidePanelListener(type, items) {

    if(items.length == 0){
        return "";
    }

    const itemTemplate = type == "range_weapon" ?
        (item) => weapon_component(item, true) :
        type == "melee_weapon" ?
        (item) => weapon_component(item, false) :
        (item) => armor_component(item);

    return `
        <div class="side-panel-container">
            <div class="side-panel-header">
                <button id="close-side-panel" class="close-button">&times;</button>
            </div>
            <ul class="side-panel-list">
                ${items.map((item) =>
                    itemTemplate(item)
                ).join('')}
            </ul>
        </div>
    `;
}

/**
 * Adds event listeners to the items in the side panel for selection.
 * @param {Array} items 
 * @param {Character} character 
 * @param {boolean} isForm - indicates if the side panel is opened from the form view or the detail view
 */
export function ItemSelectionPanelListener(items, character, isForm = false) {

    for(let item of items){
        const weapon = item instanceof Weapon;
        const element = document.querySelector(`#${weapon? "weapon" : "armor"}-${item.id}`);
        if(element){
            element.addEventListener("click", async () => {
                if(!weapon){
                    isForm ?
                    CharacterCreationViewModel.getInstance().armor = item :
                    await CharacterProvider.updateCharacterArmor(character, item);
                }
                else if(!item.isRanged){
                    isForm ?
                    CharacterCreationViewModel.getInstance().weapons.melee = item :
                    await CharacterProvider.updateCharacterWeapon(character, item);
                }
                else if(item.isRanged){
                    isForm ?
                    CharacterCreationViewModel.getInstance().weapons.range = item :
                    await CharacterProvider.updateCharacterWeapon(character, item);
                }
                router();
            });
        }
    }

}
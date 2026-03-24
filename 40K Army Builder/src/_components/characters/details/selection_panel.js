import './panel_selection.css';

import weapon_component from "./weapon_component";
import armor_component from "./armor_component";

export default function ItemListSidePanel(type, items) {

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
import './styles/army_detail.css';

import CharacterOneLine from "../_components/characters/card/charcter_oneline";
import CharacterViewModel from "../_view_model/character_view_model";
import SavedArmiesViewModel from "../_view_model/saved_armies_view_model";
import lazyloadImages from "../_utils/lazyloading";

export default class ArmyPreview{
    async render(){
        const army = await SavedArmiesViewModel.getInstance().getArmy(window.location.hash.split('/').at(-1));

        if(!army){
            return `
            <div class="loading-state">Loading army dataslate...</div>
            `;
        }

        return `
        <div id="side-panel-root"></div>

        <div>
            <h1>Army Deployment</h1>
        </div>

        <div class="army-preview-container">
            <div class="army-header-block">
                <h2>${army.name}</h2>
                <div class="army-points-display">
                    Points: <span class="points-value">${army.armyPoints()} / ${army.points}</span>
                </div>
            </div>

            <div class="army-units-block">
                <h3>Assigned Units</h3>
                <div class="units-list-container">
                    ${army.units.length > 0 ? army.units.map(unit => 
                        `
                        <div class="combat-unit-row">
                            <div class="unit-card-wrapper">
                                ${CharacterOneLine(unit)}
                            </div>
                            <button class="remove-unit-button theme-btn-danger" id="remove-unit-${unit.id}">Remove</button>
                        </div>
                        `).join('') 
                    : '<p class="empty-roster-msg">No units deployed in this detachment.</p>'}
                </div>
            </div>

            <div class="army-actions-block">
                <button id="add-unit-button" class="theme-btn-primary">Add Unit</button>
                <button id="delete-army-button" class="theme-btn-danger">Delete Army</button>
            </div>
        </div>
        `;
    }

    async post_render(){
        const army = await SavedArmiesViewModel.getInstance().getArmy(window.location.hash.split('/').at(-1));
    
        const units = document.querySelectorAll('.remove-unit-button');
        units.forEach(button => {
            button.addEventListener('click', async (event) => {
                if(!confirm("Are you sure you want to remove this unit from the army?")){
                    return;
                }

                const unitId = parseInt(button.id.split('-').at(-1));
                const armyId = parseInt(window.location.hash.split('/').at(-1));
                const army = await SavedArmiesViewModel.getInstance().getArmy(armyId);
                army.removeUnit(army.units.find(unit => unit.id == unitId));
                SavedArmiesViewModel.getInstance().updateArmy(armyId, army.name, army.units, army.points);
            });
        });

        document.querySelector('#delete-army-button').addEventListener('click', async () => {
            if(!confirm("Are you sure you want to delete this army?")){
                return;
            }
            SavedArmiesViewModel.getInstance().removeArmy(army.id);
            window.location.hash = '/saved';
        });

        const addUnitButton = document.querySelector('#add-unit-button');

        let model = await CharacterViewModel.getInstance();
        let items = model.characters.filter(item => army.units.every(unit => unit.id != item.id));

        if(addUnitButton){
            addUnitButton.addEventListener('click', async() => {
                await this._openSidePanel(items);
                await this._initSidePanelListeners(army, items);
                lazyloadImages();
            });
        }
    }

    _openSidePanel(items) {
        const sidePanelRoot = document.querySelector("#side-panel-root");
        const overlay = document.createElement('div');
        overlay.className = 'side-panel-overlay';
        overlay.innerHTML = `
        <div class="side-panel-container">
            <div class="side-panel-header">
                <h3>Available Requisition</h3>
                <button id="close-side-panel" class="close-button">&times;</button>
            </div>
            <ul class="side-panel-list">
                ${items.length > 0 ? items.map((item) =>
                    `<li class="side-panel-item" id="side-panel-item-${item.id}">${CharacterOneLine(item)}</li>`
                ).join('') : '<p class="empty-roster-msg" style="margin-top:2rem;">No remaining units available.</p>'}
            </ul>
        </div>
        `;

        sidePanelRoot.appendChild(overlay);

        overlay.querySelector("#close-side-panel").addEventListener("click", () => {
            sidePanelRoot.innerHTML = '';
        });

        overlay.addEventListener('click', (e) => {
            if (e.target == overlay) {
                sidePanelRoot.innerHTML = '';
            }
        });
}

    async _initSidePanelListeners(army, items){
    
    document.querySelectorAll(`.side-panel-item`).forEach(item => {
            item.addEventListener('click', async () => {
                const itemId = parseInt(item.id.split('-').at(-1));
                const selectedItem = items.find(i => i.id == itemId);
                try{
                    army.addUnit(selectedItem);
                } catch (error) {
                    alert(error.message);
                }
                SavedArmiesViewModel.getInstance().updateArmy(army.id, army.name, army.units, army.points);
            });
        });
    }
}
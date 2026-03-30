import "./styles/character_form.css";

import StatsFormComponent from '../_components/characters/form/stats_form_component.js';
import CharacterCreationViewModel from "../_view_model/character_creation_view_model.js";
import CharacterViewModel from "../_view_model/character_view_model.js";
import FactionProvider from '../_providers/faction_provider.js';
import WeaponArmorProvider from '../_providers/weapon_armor_provider.js';
import weapon_component from '../_components/characters/details/weapon_component.js';
import armor_component from '../_components/characters/details/armor_component.js';
import {ItemListSidePanel, ItemSelectionPanelListener} from '../_components/characters/details/selection_panel.js';

export default class Form {

    constructor(){
        this.statComponent = new StatsFormComponent();
        this.factions = [];
        this.chapters = [];
    }

    async render(){
        const viewModel = CharacterCreationViewModel.getInstance();
        this.factions = await FactionProvider.getFactions();
        viewModel.selected_faction = this.factions.length > 0 ? this.factions[0] : null;
        this.chapters = await FactionProvider.getChaptersByFaction(viewModel.selected_faction.id);

        return `
        <div>
            <h1>Character Creation Form</h1>
        </div>

        <div id="side-panel-root"></div>
        <div class="detail-page-container form-page-container">

            <div class="character-identity-column">
                <img id="character-image-preview" src="${viewModel.image_url}" alt="No image provided">
                <input type="text" id="character-image" placeholder="Enter image URL" value="${viewModel.image_url}">
                <input type="text" id="character-name" placeholder="Enter character name" value="${viewModel.name}">
            
                <div class="form-actions">
                    <button id="save-character">Save Character</button>
                    <button id="cancel-character">Cancel</button>
                </div>
            </div>

            <div class="character-details-column">

                <div class="top-details-container">
                    <div class="character-stats-container">
                        ${this.statComponent.render()}
                    </div>

                    <div class="character-meta-info">
                        <div class="meta-item">
                            <span>Faction: </span>
                            <select id="faction-select" value="${viewModel.selected_faction_id}">
                                ${this.factions.map(faction => `<option value="${faction.id}">${faction.name}</option>`).join('')}
                            </select>
                        </div>

                        <div class="meta-item" id="chapter-selector-container">
                            <span>Chapter: </span>
                            <select id="chapter-select">
                                ${this.chapters.map(chapter => `<option value="${chapter.id}">${chapter.name}</option>`).join('')}
                            </select>
                        </div>

                        <div class="meta-item">
                            <span>Points: </span>
                            <input type="number" id="points-input" value="${viewModel.points}" min="0">
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: row; gap: 30px; margin-top: 20px; align-items: stretch; width: 100%;">
                    <div class="character-gear-container" style="flex: 1; min-width: 0;">
                        <h2>Gear</h2>
                        ${weapon_component(viewModel.weapons.melee, false)}
                        ${weapon_component(viewModel.weapons.range, true)}
                        ${armor_component(viewModel.armor)}
                    </div>
                    <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; background-color: #252525; border: 2px solid #5a4a3b; border-radius: 5px; padding: 20px;">
                        <textarea style="flex-grow: 1; min-height: 400px; width: 100%; box-sizing: border-box; resize: none; background-color: #1f1f1f; color: #c8c8c8; border: 1px solid #4a4a4a; padding: 15px; outline: none; font-family: inherit; font-size: 1.1em;">
                            ${viewModel.character_lore}
                        </textarea>
                    </div>

                </div>
            </div>
        </div>
        `;
    }

    post_render(){

        const viewModel = CharacterCreationViewModel.getInstance();
        this.statComponent.post_render();

        document.querySelector("#character-image").addEventListener("input", (event) => {
            viewModel.image_url = event.target.value;
            document.querySelector("#character-image-preview").src = event.target.value;
        });

        document.querySelector("#character-name").addEventListener("input", (event) => {
            viewModel.name = event.target.value;
        });

        document.querySelector("#faction-select").addEventListener("change", async (event) => {
            const selectedFactionId = event.target.value;
            viewModel.selected_faction_id = selectedFactionId;

            const selectedFaction = this.factions.find(faction => faction.id == selectedFactionId);
            CharacterCreationViewModel.getInstance().selected_faction = selectedFaction;
            this.chapters = await FactionProvider.getChaptersByFaction(selectedFaction.id);

            const chapterSelector = document.querySelector("#chapter-selector-container");

            if(this.chapters.length > 0){
                const chapterSelect = document.createElement("select");
                chapterSelect.id = "chapter-select";
                chapterSelect.innerHTML = this.chapters.map(chapter => `<option value="${chapter.id}">${chapter.name}</option>`).join('');


                chapterSelector.innerHTML = `
                    <span>Chapter: </span>
                `;
                chapterSelector.appendChild(chapterSelect);
                CharacterCreationViewModel.getInstance().selected_chapter_id = this.chapters[0].id;
            }
            else{
                chapterSelector.innerHTML = "";
            }
            
        });

        document.querySelector("#chapter-select").addEventListener("change", async (event) => {
            const selectedChapterId = event.target.value;
            CharacterCreationViewModel.getInstance().selected_chapter_id = selectedChapterId;
        });

        document.querySelector("#points-input").addEventListener("input", (event) => {
            const points = parseInt(event.target.value);
            viewModel.points = points;
        });

        document.querySelector(".range-weapon")?.addEventListener("click", async () => {
            const rangedWeapons = await WeaponArmorProvider.getRangedWeapons();
            this._openSidePanel("range_weapon", rangedWeapons);
        });

        document.querySelector(".melee-weapon")?.addEventListener("click", async () => {
            const meleeWeapons = await WeaponArmorProvider.getMeleWeapons();
            this._openSidePanel("melee_weapon", meleeWeapons);
        });

        document.querySelector(".armor")?.addEventListener("click", async () => {
            const armors = await WeaponArmorProvider.getarmors();
            this._openSidePanel("armor", armors);
        });


        document.querySelector("#save-character").addEventListener("click", async () => {
            
            const characterViewModel = await CharacterViewModel.getInstance();

            try{
                await viewModel.saveCharacter();    
                window.location.hash = "#/characters";
            }
            catch(error){
                alert("Error saving character: " + error.message);
            }
        });

        document.querySelector("#cancel-character").addEventListener("click", () => {
            viewModel.reset();
            window.location.hash = "#/characters";
        });
    }

    _openSidePanel(item_type, items) {
        const sidePanelRoot = document.querySelector("#side-panel-root");
        const overlay = document.createElement('div');
        overlay.className = 'side-panel-overlay';
        overlay.innerHTML = ItemListSidePanel(item_type, items);

        sidePanelRoot.appendChild(overlay);
        ItemSelectionPanelListener(items,null, true);

        overlay.querySelector("#close-side-panel").addEventListener("click", () => {
            sidePanelRoot.innerHTML = '';
        });

        overlay.addEventListener('click', (e) => {
            if (e.target == overlay) {
                sidePanelRoot.innerHTML = '';
            }
        });
    }
}
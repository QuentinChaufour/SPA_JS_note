import './styles/character_detail.css';
import deleteImg from '../assets/crane.png';

import StatsComponent from '../_components/characters/details/stats_component.js'
import weapon_component from '../_components/characters/details/weapon_component.js';
import armor_component from '../_components/characters/details/armor_component.js';
import CharacterProvider from '../_providers/character_provider.js';
import WeaponArmorProvider from '../_providers/weapon_armor_provider.js';
import {ItemListSidePanel, ItemSelectionPanelListener} from '../_components/characters/details/selection_panel.js';
import SavedCharactersViewModel from '../_view_model/saved_characters_view_model.js';

export default class Detail {

    constructor(){
        this.character = null;
    }

    async _init(){
        // get the character's id
        const character_id = location.hash.split("/").at(-1);
        this.character = await CharacterProvider.getCharacter(character_id);
    }

    async render(){
        await this._init();
        const saved = SavedCharactersViewModel.getInstance().containsCharacter(this.character);

        return `
        <div id="side-panel-root"></div>
        <div class="detail-page-container">

            <div class="character-identity-column">
                <img src="${this.character.image_url}" alt="${this.character.name}">
                <h2>${this.character.name}</h2>
                <div class="save-badge ${saved ? 'saved' : 'unsaved'}">
                    <svg class="save-badge__sword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.5 2.5l-1 1L6 11l-1.5 4.5L9 14l7.5-7.5 1-1L14.5 2.5zM6.5 13.5l-1 1-.5 1.5 1.5-.5 1-1-1-1zM17 3l-1.5 1.5 1 1L18 4l-1-1z"/>
                        <path d="M4 18l-1.5 1.5a.7.7 0 0 0 1 1L5 19l-1-1z"/>
                    </svg>
                    <span class="save-badge__label">${saved ? 'Saved' : 'Unsaved'}</span>
                </div>
                <div id="delete-character">
                    <img src=${deleteImg} alt="delete character">
                    <span>Delete Character</span>
                </div>
            </div>

            <div class="character-details-column">

                <div class="top-details-container">
                    <div class="character-stats-container">
                        ${StatsComponent(this.character.stats)}
                    </div>

                    <div class="character-meta-info">
                        <div class="meta-item">
                            <span>${this.character.faction?.name || "Unknown"}</span>
                            <img src="${this.character.faction.iconUrl}" alt="${this.character.faction.name} icon">
                        </div>
                        ${
                            this.character.chapter ? 
                            `<div class="meta-item">
                                <span>${this.character.chapter?.name || "Unknown"}</span>
                                <img src="${this.character.chapter?.iconUrl}" alt="${this.character.chapter?.name} icon">
                            </div>`
                            : ""
                        } 
                        <div class="meta-item">
                            <span>${this.character.role?.name || "Unknown"}</span>
                        </div>
                        <div class="meta-item">
                            <span>Points: ${this.character.points}</span>
                        </div>
                    </div>
                </div>

                <div class="character-gear-container">
                    ${weapon_component(this.character.weapons.melee, false)}
                    ${weapon_component(this.character.weapons.range, true)}
                    ${armor_component(this.character.armor)}
                </div>
            </div>

            <div class="character-lore-container">
                <textarea class="character-lore" disabled>
                    ${this.character.lore}
                </textarea>
            </div>

        </div>
        `;
    }

    async post_render(){

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

        document.querySelector(".save-badge")?.addEventListener("click", () => {
            const savedCharactersViewModel = SavedCharactersViewModel.getInstance();
            savedCharactersViewModel.containsCharacter(this.character) ?
            savedCharactersViewModel.removeCharacter(this.character) :
            savedCharactersViewModel.addCharacter(this.character);
        });

        document.querySelector("#delete-character")?.addEventListener("click", async () => {
            if(confirm("Are you sure you want to delete this character? This action cannot be undone.")){
                await CharacterProvider.deleteCharacter(this.character.id);
                location.hash = "/characters";
            }
        });
    }


    _openSidePanel(item_type, items) {
        const sidePanelRoot = document.querySelector("#side-panel-root");
        const overlay = document.createElement('div');
        overlay.className = 'side-panel-overlay';
        overlay.innerHTML = ItemListSidePanel(item_type, items);

        sidePanelRoot.appendChild(overlay);
        ItemSelectionPanelListener(items,this.character);

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
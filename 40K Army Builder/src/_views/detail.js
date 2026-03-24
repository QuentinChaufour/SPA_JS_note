import './styles/character_detail.css';
import StatsComponent from '../_components/characters/details/stats_component.js'
import weapon_component from '../_components/characters/details/weapon_component.js';
import armor_component from '../_components/characters/details/armor_component.js';
import CharacterProvider from '../_providers/character_provider.js';
import WeaponArmorProvider from '../_providers/weapon_armor_provider.js';
import ItemListSidePanel from '../_components/characters/details/selection_panel.js';

export default class Detail {

    async render(){

        // get the character's id
        const character_id = location.hash.split("/").at(-1);
        const character = await CharacterProvider.getCharacter(character_id);

        return `
        <div id="side-panel-root"></div>
        <div class="detail-page-container">

            <div class="character-identity-column">
                <img src="${character.image_url}" alt="${character.name}">
                <h2>${character.name}</h2>
            </div>

            <div class="character-details-column">

                <div class="top-details-container">
                    <div class="character-stats-container">
                        ${StatsComponent(character.stats)}
                    </div>

                    <div class="character-meta-info">
                        <div class="meta-item">
                            <span>${character.faction?.name || "Unknown"}</span>
                            <img src="${character.faction.iconUrl}" alt="${character.faction.name} icon">
                        </div>
                        ${
                            character.chapter ? 
                            `<div class="meta-item">
                                <span>${character.chapter.name}</span>
                                <img src="${character.chapter.iconUrl}" alt="${character.chapter.name} icon">
                            </div>`
                            : ""
                        } 
                        <div class="meta-item">
                            <span>${character.role.name}</span>
                        </div>
                        <div class="meta-item">
                            <span>Points: ${character.points}</span>
                        </div>
                    </div>
                </div>

                <div class="character-gear-container">
                    ${weapon_component(character.weapons.melee, false)}
                    ${weapon_component(character.weapons.range, true)}
                    ${armor_component(character.armor)}
                </div>
            </div>

            <div class="character-lore-container">
                <textarea class="character-lore" disabled>
                    ${character.lore}
                </textarea>
            </div>

        </div>
        `;
    }

    async post_render(){

        const sidePanelRoot = document.querySelector("#side-panel-root");

        const openSidePanel = (item_type, items) => {
            const overlay = document.createElement('div');
            overlay.className = 'side-panel-overlay';
            overlay.innerHTML = ItemListSidePanel(item_type, items);
            sidePanelRoot.appendChild(overlay);

            overlay.querySelector("#close-side-panel").addEventListener("click", () => {
                sidePanelRoot.innerHTML = '';
            });
            
            // Optional: Close when clicking outside the panel
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    sidePanelRoot.innerHTML = '';
                }
            });
        };

        document.querySelector("#range-weapon")?.addEventListener("click", async () => {
            const rangedWeapons = await WeaponArmorProvider.getRangedWeapons();
            openSidePanel("range_weapon", rangedWeapons);
        });

        document.querySelector("#melee-weapon")?.addEventListener("click", async () => {
            const meleeWeapons = await WeaponArmorProvider.getMeleWeapons();
            openSidePanel("melee_weapon", meleeWeapons);
        });

        document.querySelector("#armor")?.addEventListener("click", async () => {
            const armors = await WeaponArmorProvider.getarmors();
            openSidePanel("armor", armors);
        });
    }
}
import './character_card.css';

import Character from '../../../_models/character';

/**
 * render a character card short
 * @param {Character} character 
 * @returns the representation of a character short card
 */
export default function CharacterShort(character){
    return `
        <li class="character-card" id="character-${character.id}">
            <img src="${character.image_url}" alt="${character.name}">
            <h2>${character.name}</h2>
            
            <div class="faction-info">
                <p>Faction:  <span>${character.faction?.name || "Unknown"}</span></p>
                <img src="${character.faction.iconUrl}" alt="${character.faction.name} icon">
            </div>
            ${
                character.chapter ? 
                `<div class="chapter-info">
                    <p>Chapter:  <span>${character.chapter.name}</span></p>
                    <img src="${character.chapter.iconUrl}" alt="${character.chapter.name} icon">
                </div>`
                : ""
            }
            <div class="rank-info">
                <p>Role: <span>${character.role?.name || 'N/A'}</span></p>
            </div>
        </li>
    `;
}
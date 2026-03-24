import StatsComponent from '../_components/characters/details/stats_component'
import weapon_component from '../_components/characters/details/weapon_component';
import CharacterProvider from '../_providers/character_provider';

export default class Detail {

    async render(){

        // get the character's id
        const character_id = location.hash.split("/").at(-1);
        const character = await CharacterProvider.getCharacter(character_id);

        return `
        <div>
            <img src="${character.image_url}" alt="${character.name}" width=400px>
            <h2>${character.name}</h2>
        </div>
            
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div class="faction-info">
                                <p>${character.faction?.name || "Unknown"}</p   >
                                <img src="${character.faction.iconUrl}" alt="${character.faction.name} icon">
                            </div>
                        </td>
                        ${
                            character.chapter ? 
                            `
                            <td>
                                <div class="chapter-info">
                                    <p>${character.chapter.name}</p>
                                    <img src="${character.chapter.iconUrl}" alt="${character.chapter.name} icon">
                                </div>
                            </td>`
                            : ""
                        }   
                    <tr>
                </tbody>
            </table>
        </div>

        <textarea disabled cols="100" rows="10">
            ${character.lore}
        </textarea>

        <div>
            ${StatsComponent(character.stats)}
        </div>

        ${
            weapon_component(character.weapons.melee)
        }
        ${
            weapon_component(character.weapons.range)
        }
        `;
    }
}
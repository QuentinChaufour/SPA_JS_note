import './character_oneline.css';

export default function CharacterOneLine(character) {

    return `
    <div class="character-one-line" id="character-${character.id}">
        <img src="placeholder" data-src="${character.image_url}" alt="${character.name}">
        <span>${character.name}</span>
    </div>
    `;

}
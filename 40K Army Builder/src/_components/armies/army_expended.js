import CharacterOneLine from '../characters/card/charcter_oneline.js';

export default function ArmyExpended(army) {
    return `
    <div class="army-expended">
        <h2>${army.name}</h2>
        <p>${army.units.length} units, ${army.armyPoints()} points</p>
        <ul>
            ${army.units.map(unit => CharacterOneLine(unit)).join('')}
        </ul>
    </div>
    `;
}
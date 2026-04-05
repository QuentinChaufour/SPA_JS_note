import './army_oneline.css';
import Army from "../../_models/army.js";

/**
 * Generates an HTML string for displaying an army on a single line, including its name, unit count, and total points.
 * @param {Army} army 
 * @returns html string of an army oneline, with the name, number of units and total points
 */
export default function ArmyOneline(army) {
    return `
    <div class="army-oneline" id="army-${army.id}">
        <h3>${army.name}</h3>
        <p>${army.units.length} units, ${army.armyPoints()} points</p>
    </div>
    `;
}
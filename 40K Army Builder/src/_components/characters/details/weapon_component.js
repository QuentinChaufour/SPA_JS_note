
import './item_detail.css';
import Weapon from "../../../_models/weapon";

/**
 * 
 * @param {Weapon} weapon the weapon to display
 * @param {boolean} isRanged whether the weapon is a ranged weapon or not
 * @returns {string} the html to display the weapon
 */
export default function(weapon, isRanged = false){

    return !weapon ?
    `
    <div class="item-container ${isRanged ? "range-weapon" : "melee-weapon"}">
        <p>No weapon</p>
    </div>
    ` 
    :
    `
    <div class="item-container ${isRanged ? "range-weapon" : "melee-weapon"}" id="weapon-${weapon.id}">
        <div class="item-info">
            <h3>${weapon.name}</h3>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Range</th>
                        <th scope="col">S</th>
                        <th scope="col">AP</th>
                        <th scope="col">D</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${weapon.stats.Range}</td>
                        <td>${weapon.stats.S}</td>
                        <td>${weapon.stats.AP}</td>
                        <td>${weapon.stats.D}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <img src="${weapon.image_url}" alt="${weapon.name}">
    </div>
    `;
}
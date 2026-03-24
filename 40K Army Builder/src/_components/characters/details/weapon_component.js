
import Weapon from "../../../_models/weapon";

/**
 * 
 * @param {Weapon} weapon the weapon to display 
 */
export default function(weapon){

    return !weapon ?
    `
    <div>
        <p>No weapon</p>
    </div>
    ` 
    :
    `
    <div>
        <p>${weapon.name}</p>
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
        <table>

        <img src="${weapon.image_url}" alt="${weapon.name}">
    </div>
    `;
}
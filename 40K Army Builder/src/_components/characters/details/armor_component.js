import './item_detail.css';
import Armor from "../../../_models/armor.js";

/**
 * 
 * @param {Armor} armor the armor to display 
 */
export default function armor_component(armor){

    return !armor ?
    `
    <div class="item-container armor">
        <p>No armor</p>
    </div>
    ` 
    :
    `
    <div class="item-container armor" id="armor-${armor.id}">
        <div class="item-info">
            <h3>${armor.name}</h3>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Save</th>
                        <th scope="col">Invulnerable Save</th>
                        <th scope="col">Wounds</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${armor.save}</td>
                        <td>${armor.invulnerable_save ? armor.invulnerable_save : '0'}</td>
                        <td>${armor.wounds}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <img src="${armor.image_url}" alt="${armor.name}">
    </div>
    `;
}
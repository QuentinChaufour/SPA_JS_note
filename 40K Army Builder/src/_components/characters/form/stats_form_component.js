import "./stat_input.css"
import CharacterCreationViewModel from "../../../_view_model/character_creation_view_model.js";

export default class StatsFormComponent{

    render(){
        const stats = CharacterCreationViewModel.getInstance().stats;

        return `
        <div class="item-container">
            <div class="item-info">
                <h3>Unit Stats</h3>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" >M</th>
                            <th scope="col" >T</th>
                            <th scope="col" >SV</th>
                            <th scope="col" >W</th>
                            <th scope="col" >LD</th>
                            <th scope="col" >OC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input id="M-stat" type="number" value="${stats.M || 0}" ></td>
                            <td><input id="T-stat" type="number" value="${stats.T || 0}" ></td>
                            <td><input id="SV-stat" type="number" value="${stats.SV || 0}" ></td>
                            <td><input id="W-stat" type="number" value="${stats.W || 0}" ></td>
                            <td><input id="LD-stat" type="number" value="${stats.LD || 0}" ></td>
                            <td><input id="OC-stat" type="number" value="${stats.OC || 0}" ></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    }

    post_render(){

        const stats = CharacterCreationViewModel.getInstance().stats;

        document.getElementById('M-stat').addEventListener('input', (e) => {
            stats.M = parseInt(e.target.value) + "\"";
        });

        document.getElementById('T-stat').addEventListener('input', (e) => {
            stats.T = parseInt(e.target.value);
        });

        document.getElementById('SV-stat').addEventListener('input', (e) => {
            stats.SV = parseInt(e.target.value);
        });

        document.getElementById('W-stat').addEventListener('input', (e) => {
            stats.W = parseInt(e.target.value);
        });

        document.getElementById('LD-stat').addEventListener('input', (e) => {
            stats.LD = parseInt(e.target.value);
        });

        document.getElementById('OC-stat').addEventListener('input', (e) => {
            stats.OC = parseInt(e.target.value);
        });

    }

}
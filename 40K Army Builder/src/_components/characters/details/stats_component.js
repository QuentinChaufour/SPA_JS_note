import './item_detail.css';

/**
 * display the character stats
 * @param {Object} stats the chararcter stats
 */
export default function StatsComponent(stats){
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
                        <td>${stats.M}</td>
                        <td>${stats.T}</td>
                        <td>${stats.SV}</td>
                        <td>${stats.W}</td>
                        <td>${stats.LD}</td>
                        <td>${stats.OC}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `;
}
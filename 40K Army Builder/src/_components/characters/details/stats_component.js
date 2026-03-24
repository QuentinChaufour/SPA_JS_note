

/**
 * display the character stats
 * @param {Object} stats the chararcter stats
 */
export default function StatsComponent(stats){
    return `
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
                    <td>${stats.Sv}</td>
                    <td>${stats.W}</td>
                    <td>${stats.Ld}</td>
                    <td>Modif stats OC</td>
                </tr>
            <tbody>
        </table>
    `;
}
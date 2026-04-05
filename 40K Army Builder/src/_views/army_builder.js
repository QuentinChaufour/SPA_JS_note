import './styles/army_builder.css';
import SavedArmiesViewModel from "../_view_model/saved_armies_view_model";

export default class ArmyBuilder {

    render(){
        return `
        <div>
            <h1>Army Builder</h1>
        </div>

        <div class="army-builder-container">
            <label>Army Name:</label>
            <input type="text" id="army-name-input" placeholder="Enter army name"/>
            <label>Army Points:</label>
            <input type="number" id="army-points-input" placeholder="Enter army points"/>
            <input type="button" value="Create Army" id="create-army-button"/>
        </div>
        `;
    }

    post_render(){
        const createArmyButton = document.querySelector('#create-army-button');

        createArmyButton.addEventListener('click', async () => {
            const nameInput = document.querySelector('#army-name-input').value.trim();
            const pointsInput = document.querySelector('#army-points-input').value.trim();

            console.log("Creating army with name:", nameInput, "and points:", pointsInput);

            if(!nameInput || !pointsInput){
                alert("Please fill in both the army name and points.");
                return;
            }

            if(pointsInput <= 0){
                alert("Points must be a positive number.");
                return;
            }

            try {
                const armyId = await SavedArmiesViewModel.getInstance().createArmy(nameInput, [], pointsInput);
                window.location.hash = `#/army/${armyId}`;
            } catch (error) {
                alert("Error creating army: " + error.message);
            }
        });
    }
}
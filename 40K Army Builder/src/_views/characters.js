import './styles/character_list.css';

import CharacterViewModel from "../_view_model/character_view_model";
import CharacterShort from "../_components/characters/character_short";
import router from "../router";

export default class Characters{

    async render(){

        // Get the paginated characters from the CharacterViewModel
        const model = await CharacterViewModel.getInstance();
        const characters = model.getPaginatedCharacters();
        return `
    <div>
        <h1>Characters</h1>
        <ul class="character-list">
            ${characters.map(character => CharacterShort(character)).join('')}
        </ul>
    </div>

    <div class="pagination">
        <button ${model.currentPage <= 1 ? 'disabled' : ''} id="prev_page">Previous</button>
        <span>Page ${model.currentPage} of ${model.maxPage()}</span>
        <button ${model.currentPage >= model.maxPage() ? 'disabled' : ''} id="next_page">Next</button>
    </div>
    `;
    }


    async post_render() {
        const model = await CharacterViewModel.getInstance();

        document.querySelector('#prev_page').addEventListener('click', async () => {
            model.previousPage();
            // Re-route to the same page to force a re-render
            router(); 
        });

        document.querySelector('#next_page').addEventListener('click', async () => {
            model.nextPage();
            // Re-route to the same page to force a re-render
            router();
        });
    }
}
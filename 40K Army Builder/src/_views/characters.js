import './styles/character_list.css';

import CharacterViewModel from "../_view_model/character_view_model";
import CharacterShort from "../_components/characters/card/character_short";
import router from "../router";

export default class Characters{

    async render(){

        // Get the paginated characters from the CharacterViewModel
        const model = await CharacterViewModel.getInstance();
        const characters = model.getPaginatedCharacters();
        return `
    <div>
        <h1>Characters</h1>
        <input id="search-bar" type="text" value="${model.currentSearch}" placeholder="Ex : Dante">
        <button id="create-character">Create New Character</button>
        ${ characters.length == 0 ? `<p id="no-results-message" >No characters found.</p>` : '' }
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
        const characters = model.getPaginatedCharacters();

        document.querySelector('#prev_page').addEventListener('click', () => {
            model.previousPage();
            // Re-route to the same page to force a re-render
            router(); 
        });

        document.querySelector('#next_page').addEventListener('click', () => {
            model.nextPage();
            // Re-route to the same page to force a re-render
            router(); 
        });

        // add listeners to all character cards for their detail redirection on click
        for(let character of characters){
            document.querySelector(`#character-${character.id}`).addEventListener('click', () => {
                window.location.hash = `/characters/${character.id}`;
            });
        }

        document.querySelector('#create-character').addEventListener('click', () => {
            window.location.hash = '/characters/new';
        });

        // set the focus on the input & place the cursor at the end
        const searchBar = document.querySelector("#search-bar"); 
        searchBar.focus();
        searchBar.selectionStart = model.currentSearch.length;
        searchBar.addEventListener("input", (event) => {
            model.currentSearch = event.target.value;

            // reload the page for the list to be updated
            router();
        })
    }
}
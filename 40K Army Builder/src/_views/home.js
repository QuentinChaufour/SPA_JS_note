import './styles/home.css';
import LegionCard from '../_components/_home_lore/legion_card';
import FactionProvider from '../_providers/faction_provider';

export default class Home {

    async render(){

        const legions = await FactionProvider.getLegions();

        return `
        <div class="home-container">
            <div class="home-header">
                <h1>Warhammer 40,000</h1>
                <p class="subtitle">"In the grim darkness of the far future, there is only <strong>war</strong>."</p>
            </div>

            <div id="introduction-container">
                <section class="lore-section">
                    <h2>The 41st Millennium</h2>
                    <p>
                        It is the 41st Millennium. For more than a hundred centuries The Emperor has sat immobile on the Golden Throne of Earth. 
                        He is the Master of Mankind by the will of the gods, and master of a million worlds by the might of his inexhaustible armies. 
                        He is a rotting carcass writhing invisibly with power from the Dark Age of Technology. 
                        He is the Carrion Lord of the Imperium for whom a thousand souls are sacrificed every day, so that he may never truly die.
                    </p>
                </section>

                <section class="lore-section">
                    <h2>The Horus Heresy</h2>
                    <p>
                        Ten thousand years ago, the Emperor walked among men. He launched the Great Crusade to reunite the scattered worlds of humanity, 
                        led by his genetically engineered sons, the Primarchs. But the Ruinous Powers of Chaos corrupted the Emperor's most favored son, 
                        Horus the Warmaster. The ensuing civil war, known as the Horus Heresy, tore the galaxy apart, crippled the Emperor, and 
                        doomed humanity to an eternity of stagnation and endless war.
                    </p>
                </section>

                <section class="lore-section">
                    <h2>The Black Library</h2>
                    <p>
                        The expansive universe of Warhammer 40,000 is chronicled in the Black Library, a vast collection of novels, audio dramas, and short stories. 
                        At the heart of this literary collection lies the epic <em>Horus Heresy</em> series, a monumental saga spanning over fifty novels that details the tragic civil war that forged the 41st Millennium. From the superhuman Space Marines to the endless ranks of the Astra Militarum, these stories delve into the bloody triumphs and absolute despair of a galaxy at war.
                    </p>
                </section>

                <a class="wiki-link" href="https://warhammer40k.fandom.com/wiki/Warhammer_40k_Wiki" target="_blank">Explore the Lexicanum</a>
            </div>
        </div>

        <div id="legions-container">
            <h2>The Legions</h2>
                ${await Promise.all(legions.map(
                    async (legion) => await LegionCard(legion)
                )).then(cards => cards.join(''))
            }
        </div>
        `;
    }
}
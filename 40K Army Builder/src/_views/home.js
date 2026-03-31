import './styles/home.css';

export default class Home {

    render(){
        return `
        <div>
            <h1>Home</h1>
        </div>
        <div id="introduction-container">
            <h2>Introduction a l'univers de WARHAMMER 40K</h2>
            <p id="introduction">
            Warhammer 40 000 (souvent abrégé en Warhammer 40K, WH40K, voire simplement 40K) est un jeu de figurines produit depuis 1987 par la société Games Workshop, 
            et situé dans un univers de fiction dystopique de type science fantasy.
            Créé par Rick Priestley en 1987 en tant qu'extension futuriste de Warhammer Fantasy Battle, Warhammer 40,000 partage beaucoup de ses mécanismes de jeu 
            avec son aîné. Des extensions pour Warhammer 40,000 sont publiées de temps à autre, qui fournissent des règles de combat urbain, sièges 
            de planètes et combats à grande échelle. Le jeu en est actuellement à sa dixième édition, publiée en juin 2023. 
            </p>
            <a href="https://fr.wikipedia.org/wiki/Warhammer_40,000">Wikipedia</a>
        </div>
        `;
    }
}
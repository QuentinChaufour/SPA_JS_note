
import Home from "./_views/home.js";
import Characters from "./_views/characters.js";
import Detail from "./_views/detail.js";
import Form from "./_views/form.js";
import ArmyBuilder from "./_views/army_builder.js";
import Saved from "./_views/saved_characters.js";
import NotFound404 from "./_views/404_notfound.js";
import init_app from "./main.js";

const routes = {
    "/" : Home,
    "/characters" : Characters,
    "/characters/:id" : Detail,
    "/characters/new" : Form,
    "/saved/army-builder" : ArmyBuilder,
    "/saved" : Saved
};

const router = async () => {

    const content = null || document.querySelector('#content');

    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[1]
    request.id          = r[2]
    request.verb        = r[3]

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id && request.id.match(/^[0-9]+$/) ? '/:id' : request.id ? '/' + request.id : '') + (request.verb ? '/' + request.verb : '')

    console.log("Parsed URL:", parsedURL);
    let page = routes[parsedURL] ? new routes[parsedURL]() : NotFound404;
    
    content.innerHTML = await page.render();
}

window.addEventListener('hashchange', router);

window.addEventListener('load', () => {
    const app = document.querySelector("#app");

    init_app(app);
    router();
});
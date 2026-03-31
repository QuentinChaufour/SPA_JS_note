import './assets/global.css';

import Home from "./_views/home.js";
import Characters from "./_views/characters.js";
import Detail from "./_views/detail.js";
import Form from "./_views/form.js";
import ArmyBuilder from "./_views/army_builder.js";
import Saved from "./_views/saved_characters.js";
import NotFound404 from "./_views/404_notfound.js";
import init_app from "./main.js";
import lazyloadImages from './_utils/lazyloading.js';

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

    let parsedURL = [];

    for(let k of r){
        k.match(/^[0-9]+$/) ? parsedURL.push(':id') : parsedURL.push(k);
    }

    parsedURL = parsedURL.join("/");

    console.log("Parsed URL:", parsedURL);
    let page = routes[parsedURL] ? new routes[parsedURL]() : NotFound404;
    
    // render the page
    content.innerHTML = await page.render();

    // If the page has an after_render method, call it
    // to init listeners etc ...
    if (page.post_render) {
        await page.post_render();
    }

    lazyloadImages();
}

window.addEventListener('hashchange', router);

window.addEventListener('load', () => {
    const app = document.querySelector("#app");

    init_app(app);
    router();
});

export default router;
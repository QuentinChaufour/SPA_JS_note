import "./assets/global.css";

/**
 * Build the main app layout
 * 
 * @param {HTMLElement} element the base app component
 */
export default function init_app(element) {
  
  const header = document.createElement("header");
  header.innerHTML = `
    <h1>40K Army Builder</h1>
    <nav>
      <a href="#/">Home</a>
      <a href="#/characters">Characters</a>
      <a href="#/saved/army-builder">Army Builder</a>
      <a href="#/saved">Saved Characters & Armies</a>
    </nav>
  `;
  const content = document.createElement("div");
  content.id = "content";

  element.appendChild(header);
  element.appendChild(content);
}

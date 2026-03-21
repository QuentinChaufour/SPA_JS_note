
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
      <a href="#/" data-link>Home</a>
      <a href="#/characters" data-link>Characters</a>
      <a href="#/saved/army-builder" data-link>Army Builder</a>
      <a href="#/saved" data-link>Saved Characters & Armies</a>
    </nav>
  `;
  const content = document.createElement("div");
  content.id = "content";

  element.appendChild(header);
  element.appendChild(content);
}

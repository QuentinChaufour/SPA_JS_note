
export default function lazyloadImages(){

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.isIntersecting ? lazyloadImage(entry.target) : null;
            console
        });
    });

    const images = document.querySelectorAll('img[src="placeholder"]');

    images.forEach((img) => observer.observe(img));
}

/**
 * 
 * @param {HTMLElement} target 
 */
function lazyloadImage(target){
    target.setAttribute("src", target.getAttribute("data-src"));
}
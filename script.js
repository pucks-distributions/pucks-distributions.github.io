const colors = [
    "#8B0000", "#8B0000",
    "#1F3A93", "#1F3A93",
    "#2E7D32", "#2E7D32",
    "#00695C", "#00695C",
    "#6A1B9A", "#6A1B9A",
    "#7B1E57", "#7B1E57",
    "#5D4037", "#5D4037",
    "#424242", "#424242",
    "#B3541E", "#B3541E",

    "#C62828",
    "#E65100",
    "#D4A017",
    "#00A651",
    "#00ACC1",
    "#1565C0",
    "#3949AB",
    "#8E24AA",
    "#C2185B"
];

function randomColor(previous = null) {
    let color;
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === previous && colors.length > 1);
    return color;
}

function colorTextNode(textNode) {
    const fragment = document.createDocumentFragment();
    let previousColor = null;

    for (const char of textNode.textContent) {

        if (char === " ") {
            fragment.appendChild(document.createTextNode(" "));
            continue;
        }

        const span = document.createElement("span");

        const startColor = randomColor(previousColor);

        span.textContent = char;
        span.style.color = startColor;
        span.style.transition = "color .25s ease";

        span.addEventListener("mouseenter", () => {
            span.style.color = randomColor(span.style.color);
        });

        previousColor = startColor;

        fragment.appendChild(span);
    }

    textNode.replaceWith(fragment);
}

function walk(node) {

    if (node.nodeType === Node.TEXT_NODE) {

        if (node.textContent.trim() !== "") {
            colorTextNode(node);
        }

        return;
    }

    Array.from(node.childNodes).forEach(walk);
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("body").forEach(walk);

});

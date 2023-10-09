export function getElem(id) {
    return document.getElementById(id);
}

export function createElementWithClass(tagName, ...classNames) {
    const elem = document.createElement(tagName);
    elem.classList.add(...classNames);
    return elem;
}

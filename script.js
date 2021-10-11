"use strict";
// These variables only control theme switcher
const checkbox = document.getElementById("checkbox");
const toggleBackground = document.querySelector(".toggle__background");
const banner = document.querySelector(".banner");
let rotation = 0;
let animationRunning = false;
checkbox.checked = false;
checkbox.addEventListener("click", switchTheme);
// Theme switcher
function switchTheme() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (animationRunning) {
        return;
    }
    rotateToggleBackground();
    changeBanner();
    (_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.classList.toggle("body--dark");
    (_b = document.querySelector("body")) === null || _b === void 0 ? void 0 : _b.classList.toggle("body--light");
    (_c = document.querySelector("header")) === null || _c === void 0 ? void 0 : _c.classList.toggle("header--dark");
    (_d = document.querySelector("header")) === null || _d === void 0 ? void 0 : _d.classList.toggle("header--light");
    (_e = document.querySelector("main")) === null || _e === void 0 ? void 0 : _e.classList.toggle("main--dark");
    (_f = document.querySelector("main")) === null || _f === void 0 ? void 0 : _f.classList.toggle("main--light");
    (_g = document.querySelector("footer")) === null || _g === void 0 ? void 0 : _g.classList.toggle("footer--dark");
    (_h = document.querySelector("footer")) === null || _h === void 0 ? void 0 : _h.classList.toggle("footer--light");
}
// Change between sun and moon icon
function rotateToggleBackground() {
    animationRunning = true;
    rotation = rotation + 180;
    toggleBackground.style.transition = "2s";
    toggleBackground.style.transform = `rotate(${rotation}deg)`;
}
toggleBackground.addEventListener("transitionend", () => {
    if (rotation == 360) {
        rotation = 0;
        toggleBackground.style.transition = "0s";
        toggleBackground.style.transform = `rotate(${rotation}deg)`;
    }
    animationRunning = false;
});
// Change between light and dark version of banner image
function changeBanner() {
    banner.style.opacity = "0";
    banner.addEventListener("transitionend", () => {
        banner.style.opacity = "1";
        if (rotation / 360 == 0.5) {
            banner.classList.add("banner--dark");
            banner.classList.remove("banner--light");
        }
        else if (rotation / 360 == 0 || rotation / 360 == 1) {
            banner.classList.remove("banner--dark");
            banner.classList.add("banner--light");
        }
    });
}
// Buttons, items and other variables that control the app
let items = document.querySelectorAll(".todo__item");
let itemsCompleted = document.querySelectorAll(".todo__item--completed");
let checkButtons = document.querySelectorAll(".item__button--check");
let closeButtons = document.querySelectorAll(".item__button--close");
const counter = document.querySelector(".menu__counter");
const clearAllButton = document.querySelector(".menu__button--clear");
const browseButtons = document.querySelector(".menu__browse").children;
const showAllButton = document.getElementById("showAll");
const showActiveButton = document.getElementById("showActive");
const showCompletedButton = document.getElementById("showCompleted");
const addNewButton = document.querySelector(".newItem__button--new");
const input = document.getElementById("input");
const list = document.querySelector(".todo__list");
let userInput = input.value;
let idToken = 0;
input.value = "";
// Update the variables
function setVariables() {
    items = document.querySelectorAll(".todo__item");
    itemsCompleted = document.querySelectorAll(".todo__item--completed");
    checkButtons = document.querySelectorAll(".item__button--check");
    closeButtons = document.querySelectorAll(".item__button--close");
}
// Add event listeners to new items
function setListeners() {
    checkButtons.forEach(button => button.addEventListener("click", markAsCompleted));
    closeButtons.forEach(button => button.addEventListener("click", close));
    items.forEach(item => item.addEventListener("dragstart", event => {
        dragStart(event, item);
    }));
    items.forEach(item => item.addEventListener("dragover", event => {
        dragOver(event, item);
    }));
    items.forEach(item => item.addEventListener("drop", event => {
        drop(event, item);
    }));
}
setListeners();
// Toggle whether an item's completed or not
function markAsCompleted() {
    this.parentElement.classList.toggle("todo__item--completed");
    setVariables();
    setCounter();
}
// Close a completed item
function close() {
    this.parentElement.remove();
    setVariables();
    setCounter();
}
// Count the number of uncompleted items
function setCounter() {
    let itemsLeft = items.length - itemsCompleted.length;
    counter.innerHTML = `${itemsLeft} items left`;
}
setCounter();
// Clear all completed items
clearAllButton.addEventListener("click", () => {
    itemsCompleted.forEach(item => item.remove());
    setVariables();
    setCounter();
});
// Browse menu
showAllButton.addEventListener("click", function () {
    showAll();
    markActiveButton(this);
});
showActiveButton.addEventListener("click", function () {
    showActive();
    markActiveButton(this);
});
showCompletedButton.addEventListener("click", function () {
    showCompleted();
    markActiveButton(this);
});
function showAll() {
    items.forEach(item => item.style.display = "flex");
}
function showActive() {
    items.forEach(item => {
        if (item.classList.contains("todo__item--completed")) {
            item.style.display = "none";
        }
        else {
            item.style.display = "flex";
        }
    });
}
function showCompleted() {
    items.forEach(item => {
        if (item.classList.contains("todo__item--completed")) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    });
}
function markActiveButton(button) {
    Array.from(browseButtons).forEach(item => item.classList.remove("menu__button--clicked"));
    button.classList.add("menu__button--clicked");
}
// Set an id for every item
items.forEach(item => {
    item.setAttribute("id", idToken.toString());
    idToken++;
});
// Add new memos
addNewButton.addEventListener("click", createNewItem);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        createNewItem();
    else
        return;
});
function createNewItem() {
    userInput = input.value;
    if (userInput == "") {
        input.value = "Please enter the todo first...";
        return;
    }
    if (userInput == "Please enter the todo first...") {
        input.value = "I see what you did there...";
        return;
    }
    if (userInput == "I see what you did there...") {
        input.value = "This is not acceptable.";
        return;
    }
    if (userInput == "This is not acceptable.") {
        console.log("Seriously dude, just stop dicking around.");
        return;
    }
    let newItem = document.createElement("div");
    let newCompletedButton = document.createElement("button");
    let newCloseButton = document.createElement("button");
    let newTitle = document.createElement("p");
    let newText = document.createTextNode(userInput);
    newItem.classList.add("todo__item");
    newCompletedButton.classList.add("item__button");
    newCompletedButton.classList.add("item__button--check");
    newCloseButton.classList.add("item__button");
    newCloseButton.classList.add("item__button--close");
    newTitle.classList.add("item__title");
    newItem.appendChild(newCompletedButton);
    newTitle.appendChild(newText);
    newItem.appendChild(newTitle);
    newItem.appendChild(newCloseButton);
    newItem.setAttribute("draggable", true);
    list.appendChild(newItem);
    newItem.setAttribute("id", idToken.toString());
    idToken++;
    input.value = "";
    setVariables();
    setCounter();
    setListeners();
}
// Show item's overflown text
// Reorder items by dragging
let dropPosition;
let isDragging = false;
// Drag and drop functions
// Start dragging
function dragStart(event, item) {
    event.dataTransfer.setData("text/plain", item.getAttribute("id"));
    item.classList.add("todo__item--dragging");
    item.style.transition = "0s";
}
// Calculate whether the element should be dropped above or below target
function dragOver(event, item) {
    event.preventDefault();
    let dropTarget = item.getBoundingClientRect();
    if (event.clientY <= (dropTarget.top + (dropTarget.height / 2))) {
        dropPosition = "above";
    }
    if (event.clientY > (dropTarget.top + (dropTarget.height / 2))) {
        dropPosition = "below";
    }
}
// Drop the dragged item
function drop(event, item) {
    var _a;
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    if (dropPosition == "above") {
        list.insertBefore(document.getElementById(data), item);
    }
    else if (dropPosition == "below") {
        list.insertBefore(document.getElementById(data), item.nextElementSibling);
    }
    document.getElementById(data).classList.remove("todo__item--dragging");
    (_a = document.getElementById(data)) === null || _a === void 0 ? void 0 : _a.style.transition = "2.5s";
    event.dataTransfer.clearData();
}
//# sourceMappingURL=script.js.map
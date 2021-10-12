"use strict";
// 1.0 Theme switcher 
// 1.1 Theme switcher variables
// 1.2 Theme switcher
// 1.3 Change between sun and moon icon
// 1.4 Change between light and dark version of banner image
// 2.0 TODO app
// 2.1 Buttons, items and other variables that control the app
// 2.2 Update the variables
// 2.3 Add event listeners to new items
// 2.4 Toggle whether an item's completed or not
// 2.5 Close a completed item
// 2.6 Count the number of uncompleted items
// 2.7 Clear all completed items
// 2.8 Browse menu
// 2.9 Set an id for every item
// 2.10 Add new items
// 2.11 Show item's overflown text
// 2.11.1 Check if item's title is overflowing
// 2.11.2 Scroll the overflown content back and forth on click
// 2.12 Reorder items by dragging
// 2.12.1 Start dragging
// 2.12.2 Calculate whether the element should be dropped above or below target
// 2.12.3 Drop the dragged item
// _______________________________________________________________________________________________
// 1.0 Theme switcher
// 1.1 Theme switcher variables 
const checkbox = document.getElementById("checkbox");
const toggleBackground = document.querySelector(".toggle__background");
const banner = document.querySelector(".banner");
let rotation = 0;
let animationRunning = false;
checkbox.checked = false;
checkbox.addEventListener("click", switchTheme);
// 1.2 Theme switcher
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
// 1.3 Change between sun and moon icon
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
// 1.4 Change between light and dark version of banner image
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
// 2.0 TODO app
// 2.1 Buttons, items and other variables that control the app
let items = Array.from(document.querySelectorAll(".todo__item"));
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
let itemTitles = Array.from(document.querySelectorAll(".item__title"));
input.value = "";
// 2.2 Update the variables
function setVariables() {
    itemTitles = document.querySelectorAll(".item__title");
    items = document.querySelectorAll(".todo__item");
    itemsCompleted = document.querySelectorAll(".todo__item--completed");
    checkButtons = document.querySelectorAll(".item__button--check");
    closeButtons = document.querySelectorAll(".item__button--close");
}
// 2.3 Add event listeners to new items
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
    itemTitles.forEach(title => checkOverflow(title));
    items.forEach(item => item.addEventListener("dragleave", dragLeave));
}
setListeners();
// 2.4 Toggle whether an item's completed or not
function markAsCompleted() {
    this.parentElement.classList.toggle("todo__item--completed");
    setVariables();
    setCounter();
}
// 2.5 Close a completed item
function close() {
    this.parentElement.remove();
    setVariables();
    setCounter();
}
// 2.6 Count the number of uncompleted items
function setCounter() {
    let itemsLeft = items.length - itemsCompleted.length;
    counter.innerHTML = `${itemsLeft} items left`;
}
setCounter();
// 2.7 Clear all completed items
clearAllButton.addEventListener("click", () => {
    itemsCompleted.forEach(item => item.remove());
    setVariables();
    setCounter();
});
// 2.8 Browse menu
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
// 2.9 Set an id for every item
items.forEach(item => {
    item.setAttribute("id", idToken.toString());
    idToken++;
});
// 2.10 Add new items
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
    let newTextbox = document.createElement("div");
    let newTitle = document.createElement("p");
    let newText = document.createTextNode(userInput);
    newItem.classList.add("todo__item");
    newCompletedButton.classList.add("item__button");
    newCompletedButton.classList.add("item__button--check");
    newCloseButton.classList.add("item__button");
    newCloseButton.classList.add("item__button--close");
    newTextbox.classList.add("item__textbox");
    newTitle.classList.add("item__title");
    newItem.appendChild(newCompletedButton);
    newTitle.appendChild(newText);
    newTextbox.appendChild(newTitle);
    newItem.appendChild(newTextbox);
    newItem.appendChild(newCloseButton);
    newItem.setAttribute("draggable", "true");
    list.appendChild(newItem);
    newItem.setAttribute("id", idToken.toString());
    idToken++;
    input.value = "";
    setVariables();
    setCounter();
    setListeners();
}
// 2.11 Show item's overflown text
// 2.11.1 Check if item's title is overflowing
function checkOverflow(title) {
    let elementWidth = title.scrollWidth;
    let textboxWidth = title.parentElement.clientWidth;
    if ((elementWidth - textboxWidth) > 0) {
        title.addEventListener("click", scroll);
        title.style.cursor = "pointer";
    }
}
// 2.11.2 Scroll the overflown content back and forth on click
function scroll() {
    this.style.overflow = "visible";
    this.style.transition = "0s";
    let overflow = this.scrollWidth - this.parentElement.clientWidth;
    let translation = 0;
    const element = this;
    window.requestAnimationFrame(scrollLeft);
    function scrollLeft() {
        translation++;
        element.style.transform = `translateX(-${translation}px)`;
        if (translation < (overflow + 40))
            window.requestAnimationFrame(scrollLeft);
        else if (translation >= (overflow + 40))
            window.requestAnimationFrame(scrollRight);
    }
    function scrollRight() {
        translation--;
        element.style.transform = `translateX(-${translation}px)`;
        if (translation > 0)
            window.requestAnimationFrame(scrollRight);
        if (translation <= 0) {
            element.style.overflow = "hidden";
            element.style.transition = "2.5s";
        }
    }
}
// 2.12 Reorder items by dragging
let dropPosition;
// 2.12.1 Start dragging
function dragStart(event, item) {
    event.dataTransfer.setData("text/plain", item.getAttribute("id"));
    item.classList.add("todo__item--dragging");
    item.style.transition = "0s";
}
// 2.12.2 Calculate whether the element should be dropped above or below target
// Mark the place where the item is going to be dropped
function dragOver(event, item) {
    event.preventDefault();
    let dropTarget = item.getBoundingClientRect();
    if (event.clientY <= (dropTarget.top + (dropTarget.height / 2))) {
        dropPosition = "above";
        item.classList.add("todo__item--dropAbove");
        item.classList.remove("todo__item--dropBelow");
    }
    if (event.clientY > (dropTarget.top + (dropTarget.height / 2))) {
        dropPosition = "below";
        item.classList.add("todo__item--dropBelow");
        item.classList.remove("todo__item--dropAbove");
    }
}
function dragLeave() {
    this.classList.remove("todo__item--dropAbove");
    this.classList.remove("todo__item--dropBelow");
}
// 2.12.3 Drop the dragged item
function drop(event, item) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    if (dropPosition == "above") {
        list.insertBefore(document.getElementById(data), item);
    }
    else if (dropPosition == "below") {
        list.insertBefore(document.getElementById(data), item.nextElementSibling);
    }
    document.getElementById(data).classList.remove("todo__item--dragging");
    document.getElementById(data).style.transition = "2.5s";
    item.classList.remove("todo__item--dropAbove");
    item.classList.remove("todo__item--dropBelow");
    event.dataTransfer.clearData();
}
//# sourceMappingURL=script.js.map
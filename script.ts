// These variables only control theme switcher

    const checkbox:HTMLInputElement = document.getElementById("checkbox")!;
    const toggleBackground: HTMLElement = document.querySelector(".toggle__background")!;
    const banner:HTMLElement = document.querySelector(".banner")!;
    let rotation:number = 0;
    let animationRunning: boolean = false;
    checkbox.checked = false;

    checkbox.addEventListener("click", switchTheme);

// Theme switcher
    function switchTheme() {
        if(animationRunning) {
            return;
        }

        rotateToggleBackground();
        changeBanner();
        
        document.querySelector("body")?.classList.toggle("body--dark");
        document.querySelector("body")?.classList.toggle("body--light");

        document.querySelector("header")?.classList.toggle("header--dark");
        document.querySelector("header")?.classList.toggle("header--light");

        document.querySelector("main")?.classList.toggle("main--dark");
        document.querySelector("main")?.classList.toggle("main--light");

        document.querySelector("footer")?.classList.toggle("footer--dark");
        document.querySelector("footer")?.classList.toggle("footer--light");
    }

// Change between sun and moon icon
    function rotateToggleBackground() {
        animationRunning = true;
        rotation = rotation + 180;
        toggleBackground.style.transition = "2s";
        toggleBackground.style.transform = `rotate(${rotation}deg)`;
    }

    toggleBackground.addEventListener("transitionend", ()=> {
        if(rotation == 360) {
            rotation = 0;
            toggleBackground.style.transition = "0s";
            toggleBackground.style.transform = `rotate(${rotation}deg)`;
        }
        animationRunning = false;
    })

// Change between light and dark version of banner image
    function changeBanner() {
        banner.style.opacity = "0";
        
        banner.addEventListener("transitionend", ()=> {
            banner.style.opacity = "1";
            if(rotation/360 == 0.5) {
                banner.classList.add("banner--dark");
                banner.classList.remove("banner--light");
            }
            else if(rotation/360 == 0 || rotation/360 == 1) {
                banner.classList.remove("banner--dark");
                banner.classList.add("banner--light");
            }
        })
    }

// Buttons, items and other variables that control the app
    
    let items = document.querySelectorAll(".todo__item");
    let itemsCompleted = document.querySelectorAll(".todo__item--completed");
    let checkButtons = document.querySelectorAll(".item__button--check");
    let closeButtons = document.querySelectorAll(".item__button--close");
    const counter:HTMLElement = document.querySelector(".menu__counter")!;
    const clearAllButton:HTMLElement = document.querySelector(".menu__button--clear")!;
    const browseButtons = document.querySelector(".menu__browse")!.children;
    const showAllButton = document.getElementById("showAll")!;
    const showActiveButton = document.getElementById("showActive")!;
    const showCompletedButton = document.getElementById("showCompleted")!;
    const addNewButton = document.querySelector(".newItem__button--new")!;
    const input: HTMLInputElement = document.getElementById("input")!;
    const list = document.querySelector(".todo__list")!;
    let userInput: string = input.value;
    let idToken: number = 0;
    let itemTitles = document.querySelectorAll(".item__title");
    
    input.value = "";
    
    // Update the variables
    function setVariables() {
        itemTitles = document.querySelectorAll(".item__title");
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
        }))
    
        items.forEach(item => item.addEventListener("drop", event => {
            drop(event, item);        
        }));

        itemTitles.forEach(title => checkOverflow(title));
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
        let itemsLeft: number = items.length - itemsCompleted.length;
        counter.innerHTML = `${itemsLeft} items left`;
    }

    setCounter();

// Clear all completed items

clearAllButton.addEventListener("click", ()=> {
    itemsCompleted.forEach(item => item.remove());
    setVariables();
    setCounter();
});

// Browse menu

showAllButton.addEventListener("click", function (this:HTMLElement) {
    showAll();
    markActiveButton(this);
});

showActiveButton.addEventListener("click", function (this:HTMLElement) {
    showActive();
    markActiveButton(this);
});

showCompletedButton.addEventListener("click", function (this:HTMLElement) {
    showCompleted();
    markActiveButton(this);
});

function showAll() {
    items.forEach(item => item.style.display = "flex");
}

function showActive() {
    items.forEach(item => {
        if(item.classList.contains("todo__item--completed")) {
            item.style.display = "none";
        }
        else {
            item.style.display = "flex";
        }
    })
}

function showCompleted() {
    items.forEach(item => {
        if(item.classList.contains("todo__item--completed")) {
            item.style.display = "flex";
        }
        else {
            item.style.display = "none";
        }
    })
}

function markActiveButton(button:HTMLElement) {
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
    input.addEventListener("keydown", (event)=> {
        if(event.key === "Enter")
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
            console.log("Seriously dude, just stop dicking around.")
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
        newItem.setAttribute("draggable", true);
        list.appendChild(newItem);

        newItem.setAttribute("id", idToken.toString());
        idToken++

        input.value = "";
        setVariables();
        setCounter();
        setListeners();
    }

// Show item's overflown text

    // Check if item's title is overflowing
    function checkOverflow (title:HTMLElement) {
        let elementWidth = title.scrollWidth;
        let textboxWidth = title.parentElement!.clientWidth;

        if((elementWidth - textboxWidth) > 0) {
            title.addEventListener("click", scroll);
            title.style.cursor = "pointer";
        }
    }

    // Scroll the overflown content back and forth on click
    function scroll(this:HTMLElement) {
        this.style.overflow = "visible";
        this.style.transition = "0s";
        let overflow = this.scrollWidth - this.parentElement!.clientWidth;
        let translation = 0;
        const element = this;

        window.requestAnimationFrame(scrollLeft);

        function scrollLeft() {
            translation++;
            element.style.transform = `translateX(-${translation}px)`;

            if(translation < (overflow + 40))
                window.requestAnimationFrame(scrollLeft);
            else if(translation >= (overflow + 40))
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

// Reorder items by dragging

    let dropPosition: "above" | "below";

// Drag and drop functions
// Start dragging
    function dragStart(event, item: HTMLElement) {
        event.dataTransfer.setData("text/plain", item.getAttribute("id"));
        item.classList.add("todo__item--dragging");
        item.style.transition = "0s";
    }

// Calculate whether the element should be dropped above or below target
    function dragOver(event, item) {
        event.preventDefault();
        let dropTarget = item.getBoundingClientRect();

        if(event.clientY <= (dropTarget.top + (dropTarget.height/2))){
            dropPosition = "above";
            // item.classList.add("todo__item--dropAbove");
            // item.classList.remove("todo__item--dropBelow");
        }
        if(event.clientY > (dropTarget.top + (dropTarget.height/2))) {
            dropPosition = "below";
            // item.classList.add("todo__item--dropBelow");
            // item.classList.remove("todo__item--dropAbove");
        }
    }

    // items.forEach(item => item.addEventListener("drop", event => {
    //     drop(event, item);        
    // }));

    // items.forEach(item => item.addEventListener("dragleave", dragLeave));

    // function dragLeave(this: any) {
    //     this.classList.remove("todo__item--dropAbove");
    //     this.classList.remove("todo__item--dropBelow");
    // }

// Drop the dragged item
    function drop(event, item) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");

        if(dropPosition == "above") {
            list.insertBefore(document.getElementById(data)!, item);
        }
        else if(dropPosition == "below") {
            list.insertBefore(document.getElementById(data)!, item.nextElementSibling);
        }
        document.getElementById(data)!.classList.remove("todo__item--dragging");
        document.getElementById(data)!.style.transition = "2.5s";

        // item.classList.remove("todo__item--dropAbove");
        // item.classList.remove("todo__item--dropBelow");
        
        event.dataTransfer.clearData();
    }

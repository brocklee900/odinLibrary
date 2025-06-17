const myLibrary = Array();
const FINISHED = "Finished";
const NOTFINISHED = "Not Finished";

class Book {
    #id;
    #title;
    #author;
    #pageNum;
    #hasRead;
    constructor(title, author, pageNum, hasRead) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#pageNum = pageNum;
        this.#hasRead = hasRead;
    }
    get id() {
        return this.#id;
    }
    get title() {
        return this.#title;
    }
    get author() {
        return this.#author;
    }
    get pageNum() {
        return this.#pageNum;
    }
    get hasRead() {
        return this.#hasRead;
    }
    toggleRead() {
        this.#hasRead = !this.#hasRead;
    }
}


function addBookToLibrary(title, author, pageNum, hasRead) {
	myLibrary.push(new Book(title, author, pageNum, hasRead));
}

function clearLibraryDisplay(bookDisplay) {
	while(bookDisplay.lastElementChild) {
    	bookDisplay.removeChild(bookDisplay.lastElementChild)
    }
}

function clearLibrary(bookDisplay) {
	myLibrary.length = 0;
}

function removeBook(event) {
	let toRemove = event.target.parentElement.parentElement.dataset.id;
    myLibrary.forEach((currentBook) => {
        if (currentBook.id == toRemove) {
            toRemove == myLibrary.indexOf(currentBook);
            myLibrary.splice(toRemove, 1);
            refreshDisplay();
        }
    })
}

function toggleRead(event) {
	let toToggle = event.target.parentElement.parentElement.dataset.id;
    myLibrary.forEach((currentBook) => {
        if (currentBook.id == toToggle) {
            currentBook.toggleRead();
            refreshDisplay();
        }
    })
}

function refreshDisplay() {
	let bookDisplay = document.querySelector("#bookDisplay");
    
    clearLibraryDisplay(bookDisplay);
    
	myLibrary.forEach((element) => {
    	let book = document.createElement("div");
        let h1 = document.createElement("h1");
        h1.textContent = element.title;
        let h2 = document.createElement("h2");
        h2.textContent = element.author;
        let p = document.createElement("p");
        p.textContent = (element.hasRead) ? FINISHED : NOTFINISHED;
        let div = document.createElement("div");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", removeBook);
        let toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle Read";
        toggleButton.addEventListener("click", toggleRead);
        let pages = document.createElement("p");
        pages.textContent = element.pageNum;
        
        book.dataset.id = element.id;
        div.appendChild(removeButton);
        div.appendChild(toggleButton);
        div.appendChild(pages);
        book.appendChild(h1);
        book.appendChild(h2);
        book.appendChild(p);
		book.appendChild(div);
        book.classList.add("book");
        bookDisplay.appendChild(book);
    });
}

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
	bookDisplay = document.querySelector("#bookDisplay");
    clearLibrary();
    clearLibraryDisplay(bookDisplay);
})

let dialog = document.querySelector("#addBookDialog");
let addButton = document.querySelector("#addBook");
addButton.addEventListener("click", () => {
	dialog.showModal();
});

let form = document.querySelector("form");
let submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", () => {
	if (form.checkValidity()) {
    	addBookToLibrary(document.querySelector("#title").value,
        				document.querySelector("#author").value,
                        document.querySelector("#numPages").value,
                        document.querySelector("#hasRead").checked);
    	refreshDisplay();
    	dialog.close();
        form.reset();
    }
});

let exitButton = document.querySelector("#dialogClose");
exitButton.addEventListener("click", () => {
	dialog.close();
    form.reset();
});

const myLibrary = Array();

function Book(title, author, pageNum) {
	if (!new.target) {
    	throw Error("Use 'new' to declare new objects");
    }
    
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
}

function addBookToLibrary(title, author, pageNum) {
	myLibrary.push(new Book(title, author, pageNum));
}

function refreshDisplay() {
	let bookDisplay = document.querySelector("#bookDisplay");
    
    while(bookDisplay.lastElementChild) {
    	bookDisplay.removeChild(bookDisplay.lastElementChild)
    }
    
	myLibrary.forEach((element) => {
    	let book = document.createElement("div");
        let h1 = document.createElement("h1");
        h1.textContent = element.title;
        let h2 = document.createElement("h2");
        h2.textContent = element.author;
        let div = document.createElement("div");
        let button = document.createElement("button");
        button.textContent = "Remove";
        button.dataset.id = element.id;
        let p = document.createElement("p");
        p.textContent = element.pageNum;
        
        button.addEventListener("click", (event) => {
       		let toRemove = event.target.dataset.id;
            myLibrary.forEach( (currentBook) => {
            	if (currentBook.id == toRemove) {
					toRemove == myLibrary.indexOf(currentBook);
                    myLibrary.splice(toRemove, 1);
                    refreshDisplay();
				}
            })
        });
        
        div.appendChild(button);
        div.appendChild(p);
        book.appendChild(h1);
        book.appendChild(h2);
		book.appendChild(div);
        book.classList.add("book");
        bookDisplay.appendChild(book);
    });
}


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
                        document.querySelector("#numPages").value);
    	refreshDisplay();
        console.log(myLibrary);
    	dialog.close();
    }
});

let exitButton = document.querySelector("#dialogClose");
exitButton.addEventListener("click", () => {
	dialog.close();
});
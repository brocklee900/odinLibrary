const myLibrary = Array();

let bookDisplay = document.querySelector("#bookDisplay");
let refreshButton = document.querySelector("#refresh");
refreshButton.addEventListener("click", () => {
	while(bookDisplay.lastElementChild) {
    	bookDisplay.removeChild(bookDisplay.lastElementChild)
    }
    
	myLibrary.forEach((element) => {
    	let book = document.createElement("div");
        let h1 = document.createElement("h1");
        h1.textContent = element.title;
        let h2 = document.createElement("h2");
        h2.textContent = element.author;
        let p = document.createElement("p");
        p.textContent = element.pageNum;
        book.appendChild(h1);
        book.appendChild(h2);
        book.appendChild(p);
        book.classList.add("book");
        bookDisplay.appendChild(book);
    })
})

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

addBookToLibrary("The Book", "Bob", 300);
addBookToLibrary("Super Awesome Awesome Book", "Joe Mama", 999);
console.log(myLibrary);
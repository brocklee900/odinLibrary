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

addBookToLibrary("The Book", "Bob", 300);
console.log(myLibrary);
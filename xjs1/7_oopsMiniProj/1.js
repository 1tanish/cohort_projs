class Library {
  constructor() {
    this.books = [];
  }
  addbook(book) {
    this.books.push(...book);
  }
  listbooks(){
    this.books.forEach((book)=>{console.log(book.name);
    })
  }
  prices(){
    this.books.forEach((book)=>{console.log(`${book.name} : ${book.price}`);
    })}
    info(){
        this.books.forEach((book)=>{console.log(`${book.name} by ${book.author} : ${book.price}`);
        })
    }
}
class book{
    constructor(name,price,author,isbn){
    this.name=name
    this.price=price
    this.author=author
    this.isbn=isbn
}
}
hellibrary = new Library();
b1 = new book('it starts with us','120rs','colleen hover','123912')
b2 = new book('it ends with us','60rs','colleen hover','12323412')
b3 = new book('hello world','150rs','colleen hover','123123912')
b4 = new book('do epic shit','90rs','colleen hover','03044123912')
hellibrary.addbook([b1,b2,b3,b4])
hellibrary.listbooks()

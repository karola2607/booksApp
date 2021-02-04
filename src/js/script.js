{
  'use strict';

  const select = {
    templateOf:{
      bookCart: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    bookItem: {
      image: '.book__image',
    }
  }

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
    }
  }



function render (){
  for (let book of dataSource.books){
    // make a template for a book
    bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
    // generate HTML from template
    generatedHTML = bookTemplate(book);
    // create DOM element
    bookElement = utils.createDOMFromHTML(generatedHTML);
    // find a list of books
    const bookContainer = document.querySelector(select.containerOf.booksList);
    // add element to list
    bookContainer.appendChild(bookElement);
  }
}




function initActions(){
// create an empty array
const favoriteBooks = [];
  // find the list of books
  let booksList = document.querySelector(select.containerOf.booksList);
  console.log(booksList);
  //find all images in this list
  let booksImages = booksList.querySelectorAll(select.bookItem.image);
  console.log(booksImages);
    // make a loop to get image of one book
    for (let bookImage of booksImages){
      console.log(bookImage)
      // add eventListener for bookImage
      bookImage.addEventListener('dblclick', function(event){
        // delete preventDefault
        event.preventDefault();
        // add class 'favorite'
        bookImage.classList.add(classNames.bookCart.imageFavorite);
        // find 'data-id' of bookImage
        let id = bookImage.getAttribute('data-id');
        console.log(id)
        // add 'data-id' to an empty array
        favoriteBooks.push(id);
      })
      console.log(favoriteBooks)
    }
  }

render();
initActions();


}

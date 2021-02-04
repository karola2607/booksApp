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

const favoriteBooks = [];

  let booksList = document.querySelector(select.containerOf.booksList);
  console.log(booksList);
  let booksImages = booksList.querySelectorAll(select.bookItem.image);
  console.log(booksImages);

    for (let bookImage of booksImages){
      console.log(bookImage)
      bookImage.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookImage.classList.add(classNames.bookCart.imageFavorite);
        let id = bookImage.getAttribute('data-id');
        console.log(id)
        favoriteBooks.push(id);
      })
      console.log(favoriteBooks)
    }
  }

render();
initActions();


}

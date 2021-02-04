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

const favoriteBooks = [];


function initActions(){

  let bookImage = document.querySelectorAll(select.bookItem.image);
    console.log(bookImage);
  let booksList = document.querySelector(select.containerOf.booksList);
    console.log(booksList);

    for (let bookImage in booksList){
      bookImage = this;
      bookImage.addEventListener('dblclick', function(){
        event.preventDefault();
        bookImage.classList.add(classNames.bookCart.imageFavorite);
        favoriteBooks.push(bookImage['data-id']);
        console.log(favoriteBooks)
      });
    }
  }

render();
initActions();


}

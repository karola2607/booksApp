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
  };

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
      bookClass: 'book__image',
    }
  };



  function render (){
    for (let book of dataSource.books){
      // make a template for a book
      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
      // generate HTML from template
      const generatedHTML = bookTemplate(book);
      // create DOM element
      const bookElement = utils.createDOMFromHTML(generatedHTML);
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

    booksList.addEventListener('click', function(event){
        event.preventDefault();

        if (event.target.offsetParent.classList.contains(classNames.bookCart.bookClass)){

          let id = event.target.offsetParent.getAttribute('data-id');
          console.log(id);

          if (!favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(!classNames.bookCart.imageFavorite)){
            favoriteBooks.push(id);
            event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);
          }
          else if (favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(classNames.bookCart.imageFavorite)){
            const indexOfId = favoriteBooks.indexOf(id);
            favoriteBooks.splice(indexOfId, 1);
            event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
          }

          console.log(favoriteBooks);
        }
      });
    }




  render();
  initActions();


}

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
    },
    filters: {
      form: '.filters',
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

  const filters = [];


  function initActions(){

    const favoriteBooks = [];

    let booksList = document.querySelector(select.containerOf.booksList);
    console.log(booksList);

    const form = document.querySelector(select.filters.form);
    console.log(form);

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


    form.addEventListener('click', function(event){
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ){
        console.log(event.target.value);
        if (event.target.checked == true){
          filters.push(event.target.value);
        }
        else if (event.target.checked == false){
          const indexOfFilters = filters.indexOf(event.target.value);
          filters.splice(indexOfFilters, 1);
        }
        console.log(filters);
        filterBooks();
      }
    });
  }

  function filterBooks(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      for (const filter of filters){
        if (!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const id = book.id;
      console.log(id);
      const item = document.querySelector('.book__image[data-id="' + id + '"]');

      if (shouldBeHidden == true){
        item.classList.add('hidden');
      }
      else if (shouldBeHidden == false){
        item.classList.remove('hidden');
      }
    }
  }









  render();
  initActions();


}

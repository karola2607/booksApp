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


  class BooksList {
    constructor(data, element){
      const thisBooksList = this;
      thisBooksList.data = data;

      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.getElements(element);
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;

      for (let book of thisBooksList.data){

        let rating = book.rating;
        thisBooksList.ratingBgc = thisBooksList.determineRatingBgc(rating);
        thisBooksList.ratingWidth = rating * 10;

        // make a template for a book
        const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
        // generate HTML from template
        const generatedHTML = bookTemplate(book);
        console.log(generatedHTML);
        // create DOM element
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        console.log(thisBooksList.element);
        const bookContainer = document.querySelector(select.containerOf.booksList);
        // add element to list
        bookContainer.appendChild(thisBooksList.element);
      }
    }

    getElements(element){
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.wrapper = element;

      thisBooksList.dom.booksList = thisBooksList.document.querySelector(select.containerOf.booksList);
      console.log(thisBooksList.dom.booksList);
      thisBooksList.dom.form = thisBooksList.dom.wrapper.querySelector(select.filters.form);
    }



    initActions(){
      const thisBooksList = this;

      const favoriteBooks = [];

      thisBooksList.dom.booksList.addEventListener('click', function(event){
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


      thisBooksList.dom.form.addEventListener('click', function(event){

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ){
          console.log(event.target.value);
          if (event.target.checked == true){
            thisBooksList.filters.push(event.target.value);
          }
          else if (event.target.checked == false){
            const indexOfFilters = thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(indexOfFilters, 1);
          }
          console.log(thisBooksList.filters);
          thisBooksList.filterBooks();
        }
      });
    }



    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
        for (const filter of thisBooksList.filters){
          if (!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const id = book.id;
        const item = document.querySelector('.book__image[data-id="' + id + '"]');

        if (shouldBeHidden == true){
          item.classList.add('hidden');
        }
        else if (shouldBeHidden == false){
          item.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      const thisBooksList = this;

      if (rating < 6){
        thisBooksList.ratingBgC = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        thisBooksList.ratingBgC = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9){
        thisBooksList.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9){
        thisBooksList.ratingBgC = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  const app = {
    initProject: function(){
      new BooksList();
    }
  };
  app.initProject();
}

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
      let rating = book.rating;
      const ratingBgc = determineRatingBgc(rating);
      const ratingWidth = rating * 10;
      // make a template for a book
      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
      // generate HTML from template
      const generatedHTML = bookTemplate(book);
      console.log(generatedHTML)
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
      const item = document.querySelector('.book__image[data-id="' + id + '"]');

      if (shouldBeHidden == true){
        item.classList.add('hidden');
      }
      else if (shouldBeHidden == false){
        item.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){
    if (rating < 6){
    ratingBgC = "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
    } else if (rating > 6 && rating <= 8){
    ratingBgC = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)";
    } else if (rating > 8 && rating <= 9){
    ratingBgc = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
    } else if (rating > 9){
    ratingBgC = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }
  }









  render();
  initActions();


}

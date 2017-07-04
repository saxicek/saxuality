// inspired by https://codepen.io/nikhil/pen/qcyGF
$(document).ready(function(){
  // maximum number of results shown
  var MAX_ROWS = 15;
  var searchResult = $('.search-result');
  var inputBox = $('.search-input input');

  var performSearch = function() {
    var value = inputBox.val();
    var matched = posts.filter(function(post) { return post.title.toLowerCase().indexOf(value.toLowerCase()) !== -1; });

    searchResult.empty();
    if (matched.length > 0) {
      searchResult.addClass('search-results-found');
      matched.forEach(function(match, i) {
        if (i < MAX_ROWS) {
          searchResult.append('<li><a href="'+match.url+'">'+match.title+'</a></li>');
        } else if (i === MAX_ROWS) {
          searchResult.append('<li>...</li>')
        }
      });
    } else {
      searchResult.removeClass('search-results-found');
    }
  };

  inputBox.focusin(function() {
    searchResult.removeClass('search-inactive');
    searchResult.addClass('search-active');
    inputBox.removeClass('search-inactive');
    inputBox.addClass('search-active');
    performSearch();
  });

  inputBox.focusout(function() {
    // if focus out event is caused by the click on result link then disable
    // hiding of results
    if (searchResult.find('a:hover').length) {
      return;
    }
    searchResult.removeClass('search-active');
    searchResult.addClass('search-inactive');
    inputBox.removeClass('search-active');
    inputBox.addClass('search-inactive');
  });

  inputBox.keyup(function() {
    performSearch();
  });

});

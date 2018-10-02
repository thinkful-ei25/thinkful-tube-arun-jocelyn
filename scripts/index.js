'use strict';
/* global Store, Api, $ */



/**
 * @function decorateResponse
 * Uses Youtube API response to create an array of "decorated" video objects as 
 * defined at the top of the file.
 * @param   {object} response - should match Youtube API response shape
 * @returns {array}
 */
// TASK:
// 1. Map through the response object's `items` array
// 2. Return an array of objects, where each object contains the keys `id`, `title`, 
//    `thumbnail` which each hold the appropriate values from the API item object. You 
//    WILL have to dig into several nested properties!
//
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
const decorateResponse = function(response) {
  const decorated = response.items.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    };
  });
  return decorated;
};

/**
 * @function generateVideoItemHtml
 * Template function, creates an HTML string from a single decorated video object
 * @param   {object} video - decorated video object
 * @returns {string} HTML 
 */
// TASK:
// 1. Using the decorated object, return an HTML string containing all the expected
// TEST IT!
const generateVideoItemHtml = function(video) {
  return `
    <li>
      <img src="${video.thumbnail}" alt="${video.title}"/>
    </li>
  `;
};





/**
 * @function render
 * Responsible for scanning store and rendering the video list to DOM
 */
// TASK:
// 1. Map through `store.videos`, sending each `video` through `generateVideoItemHtml`
// 2. Add this array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
  const elements = Store.videos.map((video) => {
    return generateVideoItemHtml(video);
  });
  $('.results').html(elements);
};

/**
 * @function handleFormSubmit
 * Adds form "submit" event listener that 1) initiates API call, 2) modifies store,
 * and 3) invokes render
 */
// TASK:
// 2. Add an event listener to the form that will:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the 
//      `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!
const handleFormSubmit = function() {
  $('form').submit(function (event) {
    event.preventDefault();

    const searchTerm = $('#search-term').val();
    $('#search-term').val('');

    Api.fetchVideos(searchTerm, function (response) {
      const decorated = decorateResponse(response);
      Store.setVideos(decorated);
      render();
    });
  });
};

// When DOM is ready:
$(function () {
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
  handleFormSubmit();
});

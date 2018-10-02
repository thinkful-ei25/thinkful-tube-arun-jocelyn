'use strict';

/* global VideoList */

// When DOM is ready:
$(function () {
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
  VideoList.handleFormSubmit();
  VideoList.handleThumbnailClick();
  VideoList.handlePaginationClick();
});

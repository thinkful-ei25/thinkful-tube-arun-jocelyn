'use strict';

/* global Store, Api, $ */

// eslint-disable-next-line no-unused-vars
const VideoList = (function () {
  function generateListItem(video) {
    return `
      <li data-id = "${video.id}">
        <a class = "js-thumbnailLink" href="https://www.youtube.com/watch?v=${video.id}">
          <img src="${video.thumbnail}" alt="${video.title}"/>
        </a>
      </li>
    `;
  }

  function generateLightbox(video) {
    return `
      <iframe src="https://www.youtube.com/embed/${video.id}"
              frameborder="0"
              allow="autoplay;encrypted-media"
              allowfullscreen></iframe>
      ${generateChannelLink(video)}
    `;
  }

  function generateChannelLink(video) {
    return `
      <a class="channel-link"
        href="http://www.youtube.com/channel/${video.channelId}">
        ${video.channelName}
      </a>
    `;
  }

  function generatePaginationControls(nextPage, previousPage) {
    const nextControl = nextPage
      ? `<li class="pagination-controls">
          <a href="#" data-page-token="${nextPage}">&gt;</a>
         </li>`
      : '';
    const previousControl = previousPage
      ? `<li class="pagination-controls">
          <a href="#" data-page-token="${previousPage}">&lt;</a>
         </li>`
      : '';

    return `${previousControl}${nextControl}`;
  }

  function getVideoIdFromElement(element) {
    return $(element)
      .closest('li')
      .attr('data-id');
  }

  function handleThumbnailClick() {
    $('.results').on('click', '.js-thumbnailLink', function (event) {
      event.preventDefault();
      const videoId = getVideoIdFromElement(event.currentTarget);
      Store.setLightboxVideo(videoId);
      render();
    });
  }

  function handlePaginationClick() {
    $('.js-pagination-controls').on('click', 'a', (event) => {
      event.preventDefault();
      const pageToken = $(event.currentTarget).attr('data-page-token');
      
      Api.fetchVideoPage(Store.searchTerm, pageToken, (data) => {
        Store.setVideos(data.videos);
        Store.setPagination(data);
        render();
      });
    });
  }

  function handleFormSubmit() {
    $('form').submit(function (event) {
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      Store.setSearchTerm(searchTerm);
      Api.fetchVideos(Store.searchTerm, function (data) {
        Store.setVideos(data.videos);
        Store.setPagination(data);
        render();
      });
    });
  }

  function render() {
    const elements = Store.videos.map((video) => generateListItem(video));
    $('.results').html(elements);

    if (Store.lightBoxVideo) {
      $('.js-lightbox').html(generateLightbox(Store.lightBoxVideo));
    }

    $('.js-pagination-controls').html(
      generatePaginationControls(Store.nextPage, Store.previousPage)
    );
  }
  return {
    render,
    handleFormSubmit,
    handleThumbnailClick,
    handlePaginationClick
  };
})();

'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
const Api = (function () {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const API_KEY = 'AIzaSyBfSxL_aqBksA3Rp5xJNsTehokXiaE1HDQ';

  function fetchVideoPage(searchTerm, pageToken, callback) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
      pageToken
    };

    $.getJSON(BASE_URL, query, (response) => {
      callback(decorateResponse(response));
    });
  }

  function fetchVideos(searchTerm, callBack) {
    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm,
    };

    $.getJSON(BASE_URL, query, function (response) {
      callBack(decorateResponse(response));
    });
  }

  function decorateResponse(response) {
    const videos = response.items.map((item) => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
        channelId: item.snippet.channelId,
        channelName: item.snippet.channelTitle
      };
    });

    return {
      videos,
      nextPage: response.nextPageToken,
      previousPage: response.prevPageToken
    };
  }

  return {
    fetchVideos,
    fetchVideoPage
  };
})();

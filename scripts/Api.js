'use strict';
/* global $ */
// eslint-disable-next-line no-unused-vars
const Api = (function(){
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  const API_KEY = 'AIzaSyBfSxL_aqBksA3Rp5xJNsTehokXiaE1HDQ'; 
  function fetchVideos(searchTerm, callBack){
    const query = {
      part:'snippet',
      key: API_KEY,
      q: searchTerm,
    };
    $.getJSON(BASE_URL, query, callBack);
  }
  return {
    fetchVideos,
  };
}());
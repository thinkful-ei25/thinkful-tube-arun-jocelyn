'use strict';

// eslint-disable-next-line no-unused-vars
const Store = (function () {
  const videos = [];

  function setVideos(videos) {
    this.videos = videos;
  }

  function setLightboxVideo(id) {
    const video = this.videos.find((video) => video.id === id);
    this.lightBoxVideo = video;
  }

  function setPagination(obj) {
    this.nextPage = obj.nextPage;
    this.previousPage = obj.previousPage;
  }

  function setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
  }

  return {
    videos,
    setVideos,
    setLightboxVideo,
    setPagination,
    setSearchTerm
  };
})();

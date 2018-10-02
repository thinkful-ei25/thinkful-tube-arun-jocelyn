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

  return {
    videos,
    setVideos,
    setLightboxVideo
  };
})();

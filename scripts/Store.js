'use strict'; 
// eslint-disable-next-line no-unused-vars
const Store = (function(){
  const videos = [];
  function setVideos(videos){
    this.videos = videos;
  }
  return{
    videos,
    setVideos,
  };
}());

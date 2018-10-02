'use strict'; 
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

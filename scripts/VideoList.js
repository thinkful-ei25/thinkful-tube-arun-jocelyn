'use strict'; 
// eslint-disable-next-line no-unused-vars
const VideoList = (function(){
  function generateListItem(video){
    return `
    <li data-id = "${video.id}">
      <a class = "js-thumbnailLink" href="https://www.youtube.com/watch?v=${video.id}"><img src="${video.thumbnail}" alt="${video.title}"/></a>
    </li>
    `;
  }

  function generateLightbox(videoId){
    return `
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `
  }

  function getVideoIdFromElement(element){
    return $(element).closest('li').attr('data-id');
  }
  function handleThumbnailClick(){
    $('.results').on('click', '.js-thumbnailLink', function(event){
      event.preventDefault();
      const videoId = getVideoIdFromElement(event.currentTarget);
      Store.lightBoxVideoId = videoId;
      render();
    });

  }

  function handleFormSubmit(){
    $('form').submit(function(event){
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      Api.fetchVideos(searchTerm, function(videos){
        Store.setVideos(videos);
        render();
      });
    });
  }
  
  function render(){
    const elements = Store.videos.map(video => generateListItem(video));
    $('.results').html(elements);

    if (Store.lightBoxVideoId){
      $('.js-lightbox').html(generateLightbox(Store.lightBoxVideoId));
    }
  }
  return {
    render,
    handleFormSubmit,
    handleThumbnailClick,
  };
}());
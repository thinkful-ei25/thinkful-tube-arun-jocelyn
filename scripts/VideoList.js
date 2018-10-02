'use strict'; 
// eslint-disable-next-line no-unused-vars
const VideoList = (function(){
  function generateListItem(video){
    return `
    <li>
      <a href="https://www.youtube.com/watch?v=${video.id}"><img src="${video.thumbnail}" alt="${video.title}"/></a>
    </li>
    `;
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
  }
  return {
    render,
    handleFormSubmit,
  };
}());
var $grid = $('.masonry-layout').masonry({
  itemSelector: '.post',
  percentPosition:true,
  columnWidth: '.post'
});

$grid.imagesLoaded().progress(function(){
  $grid.masonry();
});

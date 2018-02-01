var width = $(window).width(), height = $(window).height();

function refresh() { 
  // https://stackoverflow.com/questions/17328742/mobile-chrome-fires-resize-event-on-scroll
  if($(window).width() != width && $(window).height() != height){
    location.reload();
  }
}
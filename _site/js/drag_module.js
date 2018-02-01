// target elements with the "draggable" class
var ZIndex = 0;

interact('.draggable').on('click', function (event) {
  event.target.style.zIndex = ZIndex++;
}, true /* useCapture */);

interact('.draggable').draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  restrict: {
    restriction: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  // enable autoScroll
  autoScroll: true,
  
  onstart: function (event) {
    event.target.style.zIndex = ZIndex++;
  },

  // call on every dragmove event
  onmove: dragMoveListener

});

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);

}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function weightedRandom(max, numDice) {
    var num = 0;
    for (var i = 0; i < numDice; i++) {
        num += Math.random() * (max/numDice);
    }    
    return num;
}

function getRandomArbitrary(min, max, bellFactor) {
  return weightedRandom(1, bellFactor) * (max - min) + min;
}

$(document).ready(function() {
  // Build the document with blocking elements for position
  // then update to let the user boss things around
  var space_el  = document.getElementById("eventListings");
  var space     = space_el.getBoundingClientRect();
  var space_w   = space.right  - space.left;
  var space_h   = space.bottom - space.top;
  
  var dragables = [];
  //dragables = Array.prototype.concat.apply(dragables, document.getElementsByClassName("module"));
  //dragables = Array.prototype.concat.apply(dragables, document.getElementsByClassName("member"));
  dragables = Array.prototype.concat.apply(dragables, document.getElementsByClassName("eventListing"));
  
  var highest = space.bottom;

  for (var i = 0; i < dragables.length; i++) { 
    var element = dragables[i].getBoundingClientRect();
    var element_w   = element.right  - element.left;
    var element_h   = element.bottom - element.top;
  
    dragables[i].style.position = 'absolute';
    dragables[i].style.left = getRandomArbitrary(space.left, Math.max(space.left, space_w - element_w) , 3)  +'px';
    dragables[i].style.top  = getRandomArbitrary(space.top,  Math.max(space.top,  space_h - element_h) , 1)  +'px';
    
    var newPos = dragables[i].getBoundingClientRect();
    if( newPos.top    < highest ) highest = newPos.top;
  }
  
  var lowest  = space.top;
  for (var i = 0; i < dragables.length; i++) { 
    var newPos = dragables[i].getBoundingClientRect();
    dragables[i].style.top = (newPos.top - highest)+space.top+"px";
    newPos = dragables[i].getBoundingClientRect();
    if( newPos.bottom > lowest  ) lowest  = newPos.bottom;
  }
  
  space_el.style.minHeight = (lowest - space.top)+"px";

});
